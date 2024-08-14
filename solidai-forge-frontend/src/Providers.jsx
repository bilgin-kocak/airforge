import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const airdaoTestnet = {
  chainId: 22040,
  chainName: "AirDAO Testnet",
  rpcUrls: ["https://network.ambrosus-test.io"],
  nativeCurrency: {
    name: "AMB",
    symbol: "AMB",
    decimals: 18,
  },
  // blockExplorerUrls: ["https://etherscan.io/"],
};

const config = getDefaultConfig({
  appName: "AirForge",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, airdaoTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
