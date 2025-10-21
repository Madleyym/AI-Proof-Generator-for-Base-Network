import { Mode } from "@/types";

export const MODES: Record<string, Mode> = {
  "base-chat": {
    name: "General Assistant",
    description: "AI Chatbot about Base Network",
    placeholder: "Ask me anything about Base Network...",
    icon: "bi-robot",
    samples: [
      "What is Base Network and how does it work?",
      "How much are gas fees on Base compared to Ethereum?",
      "What are the best DeFi protocols on Base?",
      "How do I bridge assets to Base Network?",
      "Explain Base's security features",
    ],
  },
  achievement: {
    name: "Achievement",
    description: "Generate achievement certificates",
    placeholder: "Describe your achievement...",
    icon: "bi-trophy",
    samples: [
      "I completed 100 transactions on Base DEX",
      "I ranked top 10 in Base Trading Challenge",
      "I finished Base Developer Bootcamp",
      "I reached 1000 followers sharing Base content",
      "I created a viral Base Network tutorial",
    ],
  },
  contribution: {
    name: "Contribution",
    description: "Generate contribution certificates",
    placeholder: "Describe your contribution...",
    icon: "bi-person-check",
    samples: [
      "I contributed to 5 Base ecosystem projects",
      "I onboarded 50 users to Base Network",
      "I created Base educational content",
      "I provided liquidity on Base DEX",
      "I mentored developers building on Base",
    ],
  },
  onchain: {
    name: "Onchain",
    description: "Generate onchain activity proof",
    placeholder: "Describe your onchain activity...",
    icon: "bi-coin",
    samples: [
      "I completed 200 NFT mints on Base",
      "I made 50 smart contract interactions",
      "I provided liquidity for 6 months on Base DEX",
      "I completed 1000+ swaps on Base Network",
      "I participated in 10 DeFi protocols on Base",
    ],
  },
};
