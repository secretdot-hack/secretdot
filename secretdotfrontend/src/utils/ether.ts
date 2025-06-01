import { JsonRpcProvider, BrowserProvider, Signer } from "ethers";

// Configuración de la red
export const ASSET_HUB_CONFIG = {
  name: "Westend Asset Hub",
  rpc: "https://westend-asset-hub-eth-rpc.polkadot.io", // RPC del testnet
  chainId: 420420421,
  blockExplorer: "https://westend-asset-hub.subscan.io/",
};

// Función para obtener un proveedor JSON-RPC
export const getProvider = (): JsonRpcProvider => {
  return new JsonRpcProvider(ASSET_HUB_CONFIG.rpc, {
    chainId: ASSET_HUB_CONFIG.chainId,
    name: ASSET_HUB_CONFIG.name,
  });
};

// Función para obtener un signer desde el navegador
export const getSigner = async (provider?: JsonRpcProvider): Promise<Signer> => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    const browserProvider = new BrowserProvider((window as any).ethereum);
    return browserProvider.getSigner();
  }
  throw new Error("No Ethereum browser provider detected");
};
