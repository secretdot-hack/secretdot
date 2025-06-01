import React, { useEffect, useState } from 'react';
import { ASSET_HUB_CONFIG } from '../utils/ether';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

interface WalletConnectProps {
  onConnect?: (account: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts: string[] = await window.ethereum.request({
            method: 'eth_accounts',
          });
          if (accounts.length > 0) {
            setAccount(accounts[0] ?? null);
            const chainIdHex: string = await window.ethereum.request({
              method: 'eth_chainId',
            });
            setChainId(parseInt(chainIdHex, 16));
          }
        } catch (err) {
          console.error('Error checking connection:', err);
          setError('Failed to check wallet connection');
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0] || null);
      if (accounts[0] && onConnect) onConnect(accounts[0]);
    };

    const handleChainChanged = (chainIdHex: string) => {
      setChainId(parseInt(chainIdHex, 16));
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [onConnect]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask not detected! Please install MetaMask to use this dApp.');
      return;
    }

    try {
      const accounts: string[] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0] ?? null);

      const chainIdHex: string = await window.ethereum.request({
        method: 'eth_chainId',
      });
      const currentChainId = parseInt(chainIdHex, 16);
      setChainId(currentChainId);

      if (currentChainId !== ASSET_HUB_CONFIG.chainId) {
        await switchNetwork();
      }

      if (onConnect) onConnect(accounts[0] ?? '');
    } catch (err) {
      console.error('Error connecting to wallet:', err);
      setError('Failed to connect wallet');
    }
  };

  const switchNetwork = async () => {
    try {
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${ASSET_HUB_CONFIG.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${ASSET_HUB_CONFIG.chainId.toString(16)}`,
                chainName: ASSET_HUB_CONFIG.name,
                rpcUrls: [ASSET_HUB_CONFIG.rpc],
                blockExplorerUrls: [ASSET_HUB_CONFIG.blockExplorer],
              },
            ],
          });
        } catch (addError) {
          setError('Failed to add network to wallet');
        }
      } else {
        setError('Failed to switch network');
      }
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (null);
};

export default WalletConnect;
