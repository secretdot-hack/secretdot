import { Contract } from 'ethers';
import { getProvider } from './ethers';
import StorageABI from '../abis/SecretDot.json';

export const CONTRACT_ADDRESS = '0x084eA2BCED4CCE446a16eBAc343B958079118f39';

export const CONTRACT_ABI = StorageABI;

export const getContract = () => {
  const provider = getProvider();
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getSignedContract = async (signer) => {
  return new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};