'use client'

import bs58 from 'bs58'

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
    };
  }
}

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Wallet } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Keypair } from '@solana/web3.js'
import { getTokenProfile, getTokenOrders, getPairInfo } from '../utils/dexscreener'
import { checkTwitterUsername } from '../utils/twitter'
import { getAIResponse } from '../utils/openai'
import { BundlerPreview } from './bundler-preview'
import { VolumeBotPreview } from './volume-bot-preview'
import { OnChainActionsPreview } from './onchain-actions-preview'
import { PreviewModal } from './preview-modal'

const WELCOME_MESSAGE = `Welcome to Astraeus AI Terminal!
Type !help for a list of available commands.`

const HELP_MESSAGE = `Available commands:
!token_profile [address] - Get token profile
!token_orders [chainId] [address] - Get token orders
!pair_info [chainId] [pairId] - Get pair information
!gen_wallet - Generate a new SOL wallet
!connect - Connect Phantom wallet
!twitter_check [username] - Check Twitter username history
!ai [message] - Chat with Astraeus AI
!bundler - Open Bundler preview
!volumebot - Open Volume Bot preview
!onchainactions - Open Onchain Actions preview
!help - Show this help message

For any other queries, just type your question and I'll assist you.`

export function FuturisticTerminal({ isOpen, onClose, onOpen, shouldSpeak, setShouldSpeak }) {
  const [output, setOutput] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showBundler, setShowBundler] = useState(false)
  const [showVolumeBot, setShowVolumeBot] = useState(false)
  const [showOnchainActions, setShowOnchainActions] = useState(false)
  const outputRef = useRef(null)
  const { toast } = useToast()

  const connectPhantomWallet = async () => {
    try {
      if (typeof window.solana !== 'undefined') {
        const phantom = window.solana;
        if (phantom.isPhantom) {
          const response = await phantom.connect();
          const publicKey = response.publicKey.toString();
          setIsWalletConnected(true);
          toast({
            title: 'Wallet Connected!',
            description: `Connected to: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
          });
          return true;
        } else {
          throw new Error('Phantom wallet is not installed');
        }
      } else {
        throw new Error('Solana object not found. Phantom wallet is not installed');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: 'Error Connecting Wallet',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
      return false;
    }
  };

  const handleSend = async (command) => {
    if (command.trim() === '') return

    setInput('')
    setOutput(prevOutput => [...prevOutput, `> ${command}`])
    setIsProcessing(true)

    try {
      const commandParts = command.split(' ')
      const commandName = commandParts[0]
      const args = commandParts.slice(1)

      let response = ''
      switch (commandName) {
        case '!help':
          response = HELP_MESSAGE
          break
        case '!token_profile':
          if (args.length === 1) {
            response = await getTokenProfile(args[0])
          } else {
            response = 'Invalid number of arguments for !token_profile. Usage: !token_profile [address]'
          }
          break
        case '!token_orders':
          if (args.length === 2) {
            response = await getTokenOrders(args[0], args[1])
          } else {
            response = 'Invalid number of arguments for !token_orders. Usage: !token_orders [chainId] [address]'
          }
          break
        case '!pair_info':
          if (args.length === 2) {
            response = await getPairInfo(args[0], args[1])
          } else {
            response = 'Invalid number of arguments for !pair_info. Usage: !pair_info [chainId] [pairId]'
          }
          break
        case '!twitter_check':
          if (args.length === 1) {
            response = await checkTwitterUsername(args[0]);
          } else {
            response = 'Invalid number of arguments for !twitter_check. Usage: !twitter_check [username]';
          }
          break;
        case '!gen_wallet':
          const keypair = Keypair.generate()
          const privateKey = bs58.encode(keypair.secretKey)
          response = `Generated Wallet:
Private Key: ${privateKey}
Public Key: ${keypair.publicKey.toString()}`
          break
        case '!connect':
          const connected = await connectPhantomWallet();
          response = connected ? 'Wallet connected successfully!' : 'Failed to connect wallet. Please try again.';
          break;
        case '!ai':
          if (args.length > 0) {
            const aiPrompt = args.join(' ');
            response = await getAIResponse(aiPrompt);
          } else {
            response = 'Please provide a message for the AI. Usage: !ai [your message]';
          }
          break;
        case '!bundler':
          if (isWalletConnected) {
            setShowBundler(true)
            response = 'Opening Bundler preview...'
          } else {
            response = 'Please connect your wallet to access the Bundler feature.'
          }
          break
        case '!volumebot':
          if (isWalletConnected) {
            setShowVolumeBot(true)
            response = 'Opening Volume Bot preview...'
          } else {
            response = 'Please connect your wallet to access the Volume Bot feature.'
          }
          break
        case '!onchainactions':
          if (isWalletConnected) {
            setShowOnchainActions(true)
            response = 'Opening Onchain Actions preview...'
          } else {
            response = 'Please connect your wallet to access the Onchain Actions feature.'
          }
          break
        default:
          response = `I'm not sure how to respond to "${command}". Try typing "!help" for a list of commands.`
      }

      setOutput(prevOutput => [...prevOutput, response])
    } catch (error) {
      console.error('Error processing command:', error)
      setOutput(prevOutput => [...prevOutput, `Error: ${error.message}`])
    } finally {
      setIsProcessing(false)
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight
      }
    }
  }


  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
              className="w-full max-w-4xl bg-black/60 backdrop-blur-sm border border-[#6100ff] rounded-lg shadow-lg overflow-hidden relative futuristic-border"
            >
              <div className="flex justify-between items-center p-4 border-b border-[#6100ff]/50 bg-gray-900/80">
                <h2 className="text-lg font-formular text-white">Astraeus AI Terminal</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={connectPhantomWallet}
                    disabled={isWalletConnected}
                    className="text-white border-[#6100ff] bg-[#6100ff]/20 hover:bg-[#6100ff]/30 glow-effect"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-[#6100ff]">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <div ref={outputRef} className="h-80 p-4 overflow-y-auto font-mono text-sm text-white/90 space-y-2 bg-gray-900/40">
                {output.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {typeof line === 'object' ? JSON.stringify(line, null, 2) : line}
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#6100ff] animate-pulse"
                  >
                    Processing...
                  </motion.div>
                )}
              </div>
              <div className="p-4 border-t border-[#6100ff]/50 flex items-center gap-2 bg-gray-900/80">
                <Input
                  type="text"
                  placeholder="Enter your command..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow bg-gray-800/60 border-[#6100ff] text-white relative z-10"
                  onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleSend(input)}
                  disabled={isProcessing}
                />
                <Button 
                  onClick={() => handleSend(input)} 
                  className="bg-[#6100ff] text-white hover:bg-[#6100ff]/80 relative z-10 glow-effect"
                  disabled={isProcessing}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <PreviewModal isOpen={showBundler} onClose={() => setShowBundler(false)}>
        <BundlerPreview isWalletConnected={isWalletConnected} />
      </PreviewModal>
      <PreviewModal isOpen={showVolumeBot} onClose={() => setShowVolumeBot(false)}>
        <VolumeBotPreview isWalletConnected={isWalletConnected} />
      </PreviewModal>
      <PreviewModal isOpen={showOnchainActions} onClose={() => setShowOnchainActions(false)}>
        <OnChainActionsPreview isWalletConnected={isWalletConnected} />
      </PreviewModal>
    </>
  )
}

