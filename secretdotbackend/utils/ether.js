import { JsonRpcProvider, BrowserProvider } from 'ethers';

export const ASSET_HUB_CONFIG = {
  name: 'moonbase-alphanet',
  rpc: 'rpc.testnet.moonbeam.network', 
  chainId: 1287, 
  blockExplorer: 'moonbase.moonscan.io',
};

export const getProvider = () => {
  return new JsonRpcProvider(ASSET_HUB_CONFIG.rpc, {
    chainId: ASSET_HUB_CONFIG.chainId,
    name: ASSET_HUB_CONFIG.name,
  });
};

// Helper to get a signer from a provider
export const getSigner = async (provider) => {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const ethersProvider = new BrowserProvider(window.ethereum);
    return ethersProvider.getSigner();
  }
  throw new Error('No Ethereum browser provider detected');
};