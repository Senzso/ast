'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, BarChart2, Zap, ArrowRight } from 'lucide-react'
import { FuturisticTerminal } from '@/components/futuristic-terminal'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [shouldSpeak, setShouldSpeak] = useState(false);
  const featuresRef = useRef<HTMLElement>(null)
  const docsRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openTerminal = () => {
    setIsTerminalOpen(true);
    setShouldSpeak(true);
  };

  return (
    <div className="min-h-screen text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Astraeus Logo"
            width={200}
            height={48}
            className="h-12 w-auto p-2"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-8"
          >
            <Button
              variant="ghost"
              className="text-white hover:text-primary uppercase text-sm"
              onClick={() => scrollToSection(featuresRef)}
            >
              FEATURES
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:text-primary uppercase text-sm"
              onClick={() => scrollToSection(docsRef)}
            >
              DOCS
            </Button>
            <Button
              className="bg-primary text-white hover:bg-primary/80 uppercase text-sm px-6"
              onClick={openTerminal}
            >
              Launch App
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="relative">
        <HeroSection openTerminal={openTerminal} />
        <div className="pt-32">
          <div className="container mx-auto px-4 py-32 space-y-32 max-w-6xl">
            <section ref={featuresRef}>
              <Features />
            </section>
            <AdvancedFeatures />
            <TerminalDemo />
            <section ref={docsRef}>
              <Documentation />
            </section>
          </div>
          <CTA openTerminal={openTerminal} />
        </div>
      </main>
      <FuturisticTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onOpen={() => setShouldSpeak(true)}
        shouldSpeak={shouldSpeak}
        setShouldSpeak={setShouldSpeak}
      />
    </div>
  )
}

function HeroSection({ openTerminal }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="fixed inset-0 w-full h-full z-[-1]">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source
            src="https://videos.ctfassets.net/qqk6u6a33mqj/4lcGTeQNYGCElWZUwITLRG/7bdd395d72fbaf05e340bce3a65c842a/ill_home.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[650px] space-y-8 pt-32"
        >
          <h1 className="text-6xl font-bold tracking-tight leading-none text-white">
            Advanced blockchain operations<br />with AI-powered analysis
          </h1>
          <div className="flex items-center gap-4">
            <Badge
              variant="secondary"
              className="px-4 py-1 bg-white/10 text-white"
            >
              <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2" />
              AI Powered
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-1 bg-white/10 text-white"
            >
              <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2" />
              Multi-Chain
            </Badge>
          </div>
          <Button
            className="bg-primary text-white hover:bg-primary/80 px-8 py-4 text-lg rounded-full"
            onClick={openTerminal}
          >
            Launch Terminal
          </Button>
        </motion.div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <Image
            src="/ai.png"
            alt="AI Illustration"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}


function Features() {
  const features = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallet Operations",
      description: "Generate wallets, bundle transactions, and manage operations across chains"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Market Analysis",
      description: "Real-time market data and AI-driven trend analysis"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Suite",
      description: "Advanced contract analysis and risk assessment tools"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Assistant",
      description: "AI-powered blockchain analysis and decision support"
    }
  ]

  return (
    <section className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold text-white">Features</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Comprehensive tools for blockchain operations and analysis
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="bg-gray-900/60 backdrop-blur-md border-gray-800 hover:border-primary transition-colors"
            >
              <div className="p-6 space-y-4">
                <div className="p-3 w-fit rounded-lg bg-primary/20 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="text-base text-white/70">{feature.description}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function AdvancedFeatures() {
  const features = [
    {
      title: "Multi-Chain Support",
      description: "Seamlessly operate across multiple blockchain networks",
      items: [
        "Cross-chain analytics and insights",
        "Unified dashboard for all supported chains",
        "Automated cross-chain operations"
      ]
    },
    {
      title: "AI-Driven Market Analysis",
      description: "Stay ahead with cutting-edge AI analysis of market trends",
      items: [
        "Predictive analytics for token performance",
        "Sentiment analysis across news and social platforms",
        "Automated trading strategy suggestions"
      ]
    },
    {
      title: "Advanced Security Measures",
      description: "Protect your assets with state-of-the-art security features",
      items: [
        "Multi-signature wallet support",
        "Real-time transaction monitoring",
        "Automated auditing of smart contracts"
      ]
    },
    {
      title: "Decentralized Finance (DeFi) Tools",
      description: "Maximize your DeFi strategies with intelligent tools",
      items: [
        "Yield farming optimizers",
        "Liquidity pool analysis",
        "Impermanent loss calculators"
      ]
    }
  ]

  return (
    <section className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold text-white">Advanced Capabilities</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Unlock the full potential of AI-driven blockchain management
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="bg-gray-900/60 backdrop-blur-md border-gray-800 hover:border-primary transition-colors"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
                <p className="text-lg text-white/70">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-base text-white/70">
                      <ArrowRight className="w-4 h-4 mt-1 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TerminalDemo() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-gray-900/60 backdrop-blur-md text-white border border-gray-800">
            <div className="border-b border-gray-800 p-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">$</span>
                <span className="typing-animation">astraeus analyze-contract 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</span>
              </div>
              <div className="text-white/70 pl-6">
                {'>'} Analyzing smart contract...<br />
                {'>'} Checking ownership patterns...<br />
                {'>'} Scanning for known vulnerabilities...<br />
                {'>'} Analyzing token distribution...
              </div>
              <div className="space-y-2 pl-6">
                <div className="text-yellow-400">
                  ⚠ Warning: Centralized ownership detected
                </div>
                <div className="text-red-400">
                  ⚠ High Risk: Potential rug pull indicators found
                </div>
                <div className="text-white/70">
                  {'>'} Generating detailed report...
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function Documentation() {
  const sections = [
    {
      title: "Blockchain Tools",
      items: [
        "Contract analysis",
        "Rug pull detection",
        "Volume tracking",
        "Transaction bundling"
      ]
    },
    {
      title: "AI Integration",
      items: [
        "Market trend analysis",
        "Risk assessment",
        "Trading strategy suggestions"
      ]
    },
    {
      title: "Security",
      items: [
        "Wallet generation",
        "Transaction signing",
        "Contract verification",
        "Risk assessment"
      ]
    },
    {
      title: "DeFi Tools",
      items: [
        "Yield farming optimization",
        "Liquidity pool analysis",
        "Impermanent loss calculation"
      ]
    }
  ]

  return (
    <section className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold text-white">Documentation</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Comprehensive guides and API documentation
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="bg-gray-900/60 backdrop-blur-md border-gray-800 hover:border-primary transition-colors p-6"
            >
              <h3 className="text-xl text-white mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-white/70 hover:text-primary cursor-pointer group">
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    <span className="text-base">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CTA({ openTerminal }) {
  return (
    <section className="space-y-8 text-center py-32 relative z-10 container mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-white">Ready to Revolutionize Your Blockchain Experience?</h2>
        <p className="text-2xl text-white/80 max-w-2xl mx-auto mt-4">
          Join the future of AI-powered blockchain analysis and automation.
        </p>
        <div className="mt-8">
          <Button 
            className="bg-primary text-white hover:bg-primary/80 px-8 py-4 text-xl rounded-full"
            onClick={openTerminal}
          >
            Launch Terminal
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

