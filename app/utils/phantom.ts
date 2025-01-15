export const connectPhantom = async () => {
  try {
    // Check if Phantom is installed
    const { solana } = window as any;
    
    if (!solana?.isPhantom) {
      throw new Error('Phantom wallet is not installed. Please install it from https://phantom.app/');
    }

    // Connect to Phantom
    const response = await solana.connect();
    const publicKey = response.publicKey.toString();
    
    return {
      success: true,
      address: publicKey,
      message: `Connected to Phantom wallet: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Failed to connect to Phantom wallet'
    };
  }
};

