export interface Mode {
  name: string;
  description: string;
  placeholder: string;
  samples: string[];
  icon: string;
}

export interface Certificate {
  title: string;
  description: string;
  category: string;
  mode: string;
  theme: string;
  ai_signature: string;
  date_issued: string;
  wallet_address: string;
  image_prompt: string;
  metadata: {
    generator: string;
    blockchain: string;
    standard: string;
  };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
  txHash?: string;
}

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  category: string;
}
