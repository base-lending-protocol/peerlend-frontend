import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 84532;

// const sepolia = {
//   chainId: 11155420,
//   name: 'Sepolia',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: import.meta.env.VITE_INFURA_RPC
// }
const basesepolia = {
  chainId: 84532,
  name: "Base Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia-explorer.base.org",
  rpcUrl: import.meta.env.VITE_INFURA_RPC,
};

const basemainnet = {
  chainId: 8453,
  name: "Base mainnet",
  currency: "ETH",
  explorerUrl: "https://basescan.org/",
  rpcUrl: import.meta.env.VITE_INFURA_RPC,
};

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://localhost:5173",
  icons: ["https://localhost:5173"],
};

export const configWeb3Modal = () =>
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [basemainnet, basesepolia],
    projectId: import.meta.env.VITE_PROJECT_ID,
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: import.meta.env.VITE_COINBASE_RPC, // used for the Coinbase SDK
    defaultChainId: 84532, // used for the Coinbase SDK
    enableAnalytics: false,
    themeVariables: {
      "--w3m-accent": "#E0BB83",
      "--wcm-accent-fill-color": "#2a2a2a",
      "--w3m-border-radius-master": "10",
    },
  });
