import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = "6036ef8f00ca882753a4d728036495b3";

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [injected(), walletConnect({ projectId })],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
