import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofBaseAI Generator - Create Onchain Certificates on Base Network",
  description:
    "Generate verifiable AI-powered certificates and mint them as NFTs on Base Network",
  openGraph: {
    title:
      "ProofBaseAI Generator - Create Onchain Certificates on Base Network",
    description:
      "Generate verifiable AI-powered certificates and mint them as NFTs on Base Network",
    type: "website",
    url: "https://github.com/ProofBaseAI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/assets/logo/logo.png"
          type="image/x-icon"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
          integrity="sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="tw-flex tw-min-h-[100vh] tw-flex-col tw-bg-[#fcfcfc] tw-text-black dark:tw-bg-black dark:tw-text-white">
        {children}
      </body>
    </html>
  );
}
