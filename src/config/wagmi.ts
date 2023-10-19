import { configureChains, createConfig } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

const goerli ={
  id: 5,
  network: 'goerli',
  name: 'Goerli',
  nativeCurrency: { name: 'Goerli Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://eth-goerli.g.alchemy.com/v2'],
      webSocket: ['wss://eth-goerli.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://goerli.infura.io/v3/2fb9f2d009eb437f816a9690f82a7597'],
      webSocket: ['wss://goerli.infura.io/ws/v3'],
    },
    default: {
      http: ['https://goerli.infura.io/v3/2fb9f2d009eb437f816a9690f82a7597'],
    },
    public: {
      http: ['https://goerli.infura.io/v3/2fb9f2d009eb437f816a9690f82a7597'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
    default: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
  },
  testnet: true,
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
