"use client";

import { useState, memo } from "react";
import Image from "next/image";

// ============================================
// BUILD ON BASE SECTION
// ============================================
export const BuildOnBaseSection = memo(function BuildOnBaseSection() {
  return (
    <section
      className="tw-relative tw-flex tw-w-full tw-min-h-[100vh] max-lg:tw-min-h-[80vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden"
      id="features"
    >
      <div className="tw-w-full tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[900px] tw-gap-4 tw-p-4">
        <div className="purple-bg-grad reveal-up tw-absolute tw-right-[20%] tw-top-[20%] tw-h-[200px] tw-w-[200px]" />
        <h2 className="reveal-up tw-text-6xl max-lg:tw-text-4xl tw-text-center tw-leading-normal tw-uppercase">
          <span className="tw-font-semibold">Build on Base Network</span>
          <br />
          <span className="tw-font-serif">with Smart Contract Integration</span>
        </h2>
        <p className="reveal-up tw-mt-8 tw-max-w-[650px] tw-text-gray-900 dark:tw-text-gray-200 tw-text-center max-md:tw-text-sm">
          ProofBaseAI Generator is powered by Base Network, Ethereum&apos;s L2
          solution. Our smart contracts enable permanent, verifiable, and
          trustless certificate storage onchain for your achievements and
          contributions.
        </p>
        <div className="reveal-up tw-flex tw-mt-8">
          <a
            href="https://basescan.org"
            target="_blank"
            rel="noopener noreferrer"
            className="tw-shadow-md hover:tw-shadow-xl dark:tw-shadow-gray-800 tw-transition-all tw-duration-300 tw-border-[1px] tw-p-3 tw-px-4 tw-border-black dark:tw-border-white tw-rounded-md tw-flex tw-gap-2 tw-place-items-center hover:tw-bg-black hover:tw-text-white dark:hover:tw-bg-white dark:hover:tw-text-black"
          >
            {/* <i className="bi bi-box-arrow-up-right" /> */}
            <span>View Smart Contract</span>
          </a>
        </div>
      </div>
    </section>
  );
});

// ============================================
// WHY CHOOSE SECTION
// ============================================
const FEATURES_DATA = [
  {
    id: 1,
    image: "/assets/images/home/ai-powered.png",
    title: "AI-Powered Generation",
    description:
      "Our AI analyzes your achievements and automatically generates professional certificates with appropriate metadata, categories, and visual themes—all in seconds.",
  },
  {
    id: 2,
    image: "/assets/images/home/base-network.png",
    title: "Base Network NFTs",
    description:
      "Mint your certificates as NFTs on Base Network. Each certificate is permanently stored onchain, providing verifiable and immutable proof that can never be lost or altered.",
  },
  {
    id: 3,
    image: "/assets/images/home/json-export.png",
    title: "Clean JSON Export",
    description:
      "Every certificate includes structured JSON metadata perfect for Web3 integrations. Export and use your proof anywhere—from dApps to portfolio websites.",
  },
];

export const WhyChooseSection = memo(function WhyChooseSection() {
  return (
    <section
      className="tw-relative tw-flex tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden"
      id="how-it-works"
    >
      <div className="tw-mt-8 tw-flex tw-flex-col tw-w-full tw-h-full tw-place-items-center tw-gap-5">
        <div className="reveal-up tw-mt-5 tw-flex tw-flex-col tw-gap-3 tw-text-center">
          <h2 className="tw-text-6xl tw-font-medium max-md:tw-text-3xl tw-p-2">
            Why Choose ProofBaseAI Generator
          </h2>
        </div>
        <div className="tw-mt-6 tw-flex tw-flex-col tw-max-w-[1150px] max-lg:tw-max-w-full tw-h-full tw-p-4 max-lg:tw-place-content-center tw-gap-8">
          <div className="max-xl:tw-flex max-xl:tw-flex-col tw-place-items-center tw-grid tw-grid-cols-3 tw-gap-8 tw-place-content-center tw-auto-rows-auto">
            {FEATURES_DATA.map((feature) => (
              <div
                key={feature.id}
                className="reveal-up tw-w-[350px] tw-h-[540px] tw-flex max-md:tw-w-full"
              >
                <article className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02] hover:tw-shadow-xl">
                  <div className="tw-overflow-hidden tw-w-full tw-min-h-[180px] tw-h-[180px] tw-flex tw-items-center tw-justify-center">
                    <Image
                      src={feature.image}
                      width={350}
                      height={180}
                      alt={feature.title}
                      className="tw-w-full tw-h-auto tw-object-contain tw-transition-transform tw-duration-300 group-hover/card:tw-scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                    {feature.title}
                  </h3>
                  <p className="tw-text-base tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                    {feature.description}
                  </p>
                  <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto tw-text-blue-600 dark:tw-text-blue-400">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="reveal-up tw-w-full md:tw-h-[350px] max-md:tw-min-h-[350px] tw-flex">
            <article className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex max-md:tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02] hover:tw-shadow-xl">
              <div className="tw-text-6xl tw-overflow-hidden tw-rounded-xl tw-w-full tw-h-full max-md:tw-h-[180px] tw-flex tw-items-center tw-justify-center">
                <Image
                  src="/assets/images/home/certificate-types.png"
                  width={600}
                  height={350}
                  className="tw-w-auto tw-h-full tw-object-contain tw-transition-transform tw-duration-300 group-hover/card:tw-scale-110"
                  alt="Multiple Certificate Types"
                  loading="lazy"
                />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-4">
                <h3 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                  Multiple Certificate Types
                </h3>
                <p className="tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                  ProofBaseAI supports various certificate categories including
                  Onchain Activity, Achievements, Contributions, AI Work, and
                  custom types—all tailored to your specific needs.
                </p>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto tw-text-blue-600 dark:tw-text-blue-400">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
});

// ============================================
// CATEGORIES DATA
// ============================================
const CATEGORIES_DATA = [
  {
    id: 1,
    icon: "bi-coin",
    title: "Onchain Activity Proof",
    description:
      "Generate certificates for blockchain transactions, DeFi activities, NFT trades, or any onchain achievements on Base Network.",
  },
  {
    id: 2,
    icon: "bi-trophy-fill",
    title: "Achievement Certificates",
    description:
      "Create proof for personal milestones, learning achievements, challenge completions, or any accomplishment worth celebrating.",
  },
  {
    id: 3,
    icon: "bi-person-check-fill",
    title: "Contribution Proof",
    description:
      "Document your contributions to open-source projects, DAOs, communities, or collaborative efforts with verifiable certificates.",
  },
  {
    id: 4,
    icon: "bi-robot",
    title: "AI Work Certificates",
    description:
      "Prove AI-generated content, prompt engineering work, model training achievements, or any AI-related accomplishments.",
  },
  {
    id: 5,
    icon: "bi-palette-fill",
    title: "Custom Themes",
    description:
      "Choose from futuristic hologram, cyber aesthetic, minimal design, or create custom visual themes for your NFT certificates.",
  },
  {
    id: 6,
    icon: "bi-shield-fill-check",
    title: "Blockchain Verification",
    description:
      "Every certificate is verifiable through Base Network blockchain explorer. Permanent, immutable, and trustless proof.",
  },
];

// ============================================
// CERTIFICATE CATEGORIES SECTION
// ============================================
export const CategoriesSection = memo(function CategoriesSection() {
  return (
    <section className="tw-relative tw-mt-10 tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-place-items-center lg:tw-p-6">
      <div className="reveal-up tw-mt-[5%] tw-flex tw-h-full tw-w-full tw-place-content-center tw-gap-2 tw-p-4 max-lg:tw-max-w-full max-lg:tw-flex-col">
        <div className="tw-relative tw-flex tw-max-w-[30%] max-lg:tw-max-w-full tw-flex-col tw-place-items-start tw-gap-4 tw-p-2 max-lg:tw-place-items-center max-lg:tw-place-content-center max-lg:tw-w-full">
          <div className="tw-top-40 tw-flex tw-flex-col lg:tw-sticky tw-place-items-center tw-max-h-fit tw-max-w-[850px] max-lg:tw-max-h-fit max-lg:tw-max-w-[320px] tw-overflow-hidden">
            <h2 className="tw-text-5xl tw-font-serif tw-text-center tw-font-medium max-md:tw-text-3xl">
              Certificate Categories
            </h2>

            <a
              href="#generator"
              className="btn !tw-mt-8 !tw-bg-transparent !tw-text-black !tw-border-[1px] !tw-border-black dark:!tw-border-white dark:!tw-text-white hover:!tw-bg-black hover:!tw-text-white dark:hover:!tw-bg-white dark:hover:!tw-text-black tw-transition-all"
            >
              Generate Proof
            </a>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-10 tw-h-full tw-max-w-1/2 max-lg:tw-max-w-full tw-px-[10%] max-lg:tw-px-4 max-lg:tw-gap-3 max-lg:tw-w-full lg:tw-top-[20%] tw-place-items-center">
          {CATEGORIES_DATA.map((category) => (
            <article
              key={category.id}
              className="reveal-up tw-h-[240px] tw-w-[450px] max-md:tw-w-full"
            >
              <div className="tw-flex tw-w-full tw-h-full tw-gap-8 tw-rounded-xl hover:tw-shadow-lg dark:tw-shadow-[#171717] tw-duration-300 tw-transition-all tw-p-8 tw-group/card hover:tw-bg-gray-50 dark:hover:tw-bg-[#1a1a1a]">
                <div className="tw-text-4xl max-md:tw-text-2xl tw-text-blue-600 dark:tw-text-blue-400">
                  <i className={`bi ${category.icon}`} />
                </div>

                <div className="tw-flex tw-flex-col tw-gap-4">
                  <h3 className="tw-text-2xl max-md:tw-text-xl tw-font-semibold">
                    {category.title}
                  </h3>
                  <p className="tw-text-gray-800 dark:tw-text-gray-100 max-md:tw-text-sm">
                    {category.description}
                  </p>

                  <div className="tw-mt-auto tw-flex tw-gap-2 tw-text-blue-600 dark:tw-text-blue-400">
                    <span className="tw-font-medium">Learn more</span>
                    <i className="bi bi-arrow-up-right group-hover/card:tw--translate-y-1 group-hover/card:tw-translate-x-1 tw-duration-300 tw-transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

// ============================================
// KEY FEATURES DATA (UPDATED WITH NEW IMAGES)
// ============================================
const KEY_FEATURES_DATA = [
  {
    id: 1,
    image: "/assets/images/home/ai-powered-feature.png", 
    title: "AI-Powered Smart Generation",
    description:
      "AI analyzes your input and automatically generates professional certificates with metadata, categories, and visual themes.",
  },
  {
    id: 2,
    image: "/assets/images/home/base-network-feature.png",
    title: "Base Network Integration",
    description:
      "Mint your certificates as NFTs on Base Network. Low fees, fast transactions, and Ethereum-level security.",
  },
  {
    id: 3,
    image: "/assets/images/home/json-export-feature.png", 
    title: "JSON Export",
    description:
      "Export structured JSON metadata perfect for Web3 integrations, portfolio sites, or any dApp.",
  },
  {
    id: 4,
    image: "/assets/images/home/nft-gallery.png", 
    title: "NFT Gallery",
    description:
      "All your minted certificates are stored in your wallet. View, share, and manage your onchain proof collection anytime.",
  },
  {
    id: 5,
    image: "/assets/images/home/blockchain-verified.png", 
    title: "Blockchain Verified",
    description:
      "Every certificate is permanently stored onchain and verifiable through Base Network explorer. No centralized database needed.",
  },
  {
    id: 6,
    image: "/assets/images/home/custom-themes.png", 
    title: "Custom Visual Themes",
    description:
      "Choose from futuristic, holographic, cyber, or minimal themes. AI generates matching visual concepts for your NFT.",
  },
];

// ============================================
// KEY FEATURES SECTION
// ============================================
export const KeyFeaturesSection = memo(function KeyFeaturesSection() {
  return (
    <section className="tw-relative tw-flex tw-w-full tw-min-h-[110vh] max-md:tw-min-h-[80vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden">
      <div className="tw-w-full max-lg:tw-max-w-full tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[80%] tw-gap-4 tw-p-4">
        <h2 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-3xl tw-text-center tw-leading-normal">
          Key Features
        </h2>

        <div className="tw-mt-8 tw-relative tw-gap-10 tw-p-4 tw-grid tw-place-items-center tw-grid-cols-3 max-lg:tw-flex max-lg:tw-flex-col">
          {KEY_FEATURES_DATA.map((feature) => (
            <article
              key={feature.id}
              className="reveal-up tw-w-[350px] tw-border-[1px] tw-h-[400px] tw-rounded-lg tw-place-items-center tw-p-4 tw-bg-[#f2f3f4] max-md:tw-w-[320px] dark:tw-bg-[#141414] dark:tw-border-[#1f2123] tw-flex tw-flex-col tw-gap-3 tw-transition-all tw-duration-300 hover:tw-shadow-xl hover:tw-scale-105"
            >
              <div className="tw-w-full tw-h-[220px] tw-rounded-xl tw-overflow-hidden tw-flex tw-place-content-center tw-items-center tw-bg-white dark:tw-bg-black tw-relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={300}
                  height={220}
                  className="tw-w-full tw-h-full tw-object-cover tw-scale-[1.03] tw-transition-transform tw-duration-300 hover:tw-scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <h3 className="tw-text-2xl tw-font-semibold tw-text-center">
                {feature.title}
              </h3>
              <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-px-4 tw-text-center tw-text-sm">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

// ============================================
// FAQ DATA
// ============================================
const FAQ_DATA = [
  {
    id: 1,
    question: "What is ProofBaseAI Generator?",
    answer:
      "ProofBaseAI Generator is a tool that creates verifiable digital certificates using AI, which can be minted as NFTs on the Base Network. It analyzes your achievements and generates professional certificates with metadata, categories, and visual themes.",
  },
  {
    id: 2,
    question: "What is Base Network?",
    answer:
      "Base is Ethereum's Layer 2 (L2) blockchain solution built by Coinbase. It offers low transaction fees, fast confirmation times, and the security of Ethereum—making it perfect for minting NFT certificates affordably.",
  },
  {
    id: 3,
    question: "How do I mint a certificate?",
    answer:
      'Simply describe your achievement in the prompt, let the AI generate your certificate, review the JSON output, connect your wallet (MetaMask or Coinbase Wallet), and click "Mint to Base". Your certificate will be stored onchain forever.',
  },
  {
    id: 4,
    question: "How much does it cost?",
    answer:
      "Generating certificates costs only 0.000003 ETH (≈$0.01) per generation. Minting to Base Network requires gas fees which are typically very low on Base (usually less than $0.01).",
  },
];

// ============================================
// FAQ SECTION
// ============================================
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="tw-relative tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%]"
      id="faq"
    >
      <div className="purple-bg-grad max-md:tw-hidden reveal-up tw-absolute tw-bottom-14 tw-right-[20%] tw-h-[150px] tw-w-[150px] tw-rounded-full" />

      <h2 className="tw-text-4xl tw-font-medium max-md:tw-text-2xl">
        Frequently Asked Questions
      </h2>
      <div className="tw-mt-5 tw-flex tw-min-h-[300px] tw-w-full tw-max-w-[850px] tw-flex-col tw-gap-4">
        {FAQ_DATA.map((faq, index) => (
          <div key={faq.id}>
            <article className="faq tw-w-full">
              <h3
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-accordion tw-flex tw-w-full tw-select-none tw-text-xl max-md:tw-text-lg tw-cursor-pointer tw-p-4 tw-bg-inherit hover:tw-bg-gray-50 dark:hover:tw-bg-[#1a1a1a] tw-rounded-lg tw-transition-colors"
                role="button"
                aria-expanded={openIndex === index}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setOpenIndex(openIndex === index ? null : index);
                  }
                }}
              >
                <span className="tw-font-semibold">{faq.question}</span>
                <i
                  className={`bi bi-plus tw-text-xl tw-origin-center tw-duration-300 tw-transition-transform tw-ml-auto tw-font-semibold ${
                    openIndex === index ? "tw-rotate-45" : ""
                  }`}
                />
              </h3>
              <div
                className="content max-lg:tw-text-sm tw-text-gray-700 dark:tw-text-gray-300 tw-overflow-hidden tw-transition-all tw-duration-300"
                style={{
                  maxHeight: openIndex === index ? "240px" : "0",
                  padding: openIndex === index ? "20px 18px" : "0 18px",
                }}
              >
                {faq.answer}
              </div>
            </article>
            <hr className="tw-border-gray-200 dark:tw-border-gray-800" />
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION
// ============================================
export const CTASection = memo(function CTASection() {
  return (
    <section className="tw-relative tw-flex tw-p-2 tw-w-full tw-min-h-[60vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden">
      <div className="reveal-up tw-w-full tw-h-full tw-min-h-[450px] max-lg:tw-max-w-full tw-rounded-md lg:tw-py-[5%] tw-bg-gradient-to-br tw-from-[#f6f7fb] tw-to-[#e8eaf6] dark:tw-from-[#171717] dark:tw-to-[#1a1a1a] tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[80%] tw-gap-4 tw-p-4 tw-shadow-xl">
        <h2 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-3xl tw-text-center tw-leading-normal">
          Generate Your First Certificate Now
        </h2>
        <p className="tw-text-gray-600 dark:tw-text-gray-400 tw-text-center tw-max-w-xl">
          Join thousands of users creating verifiable onchain proof for their
          achievements on Base Network
        </p>

        <div className="tw-mt-8 tw-relative tw-flex max-lg:tw-flex-col tw-gap-5">
          <a
            href="#generator"
            className="btn reveal-up !tw-rounded-full !tw-p-4 !tw-px-6 tw-font-medium tw-flex tw-gap-2 tw-shadow-lg hover:tw-scale-105 tw-transition-transform"
          >
            <i className="bi bi-sparkles" />
            <span>Start Generating</span>
          </a>
        </div>
      </div>
    </section>
  );
});

// ============================================
// NEWSLETTER SECTION
// ============================================
export const NewsletterSection = memo(function NewsletterSection() {
  return (
    <section className="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%] max-md:tw-px-2">
      <div className="tw-flex tw-w-full tw-max-w-[80%] tw-place-content-center tw-place-items-center tw-justify-between tw-gap-3 tw-rounded-lg tw-bg-[#F6F7FB] dark:tw-bg-[#171717] tw-p-6 max-md:tw-max-w-full max-md:tw-flex-col tw-border tw-border-gray-200 dark:tw-border-gray-800">
        <div className="tw-flex tw-flex-col max-lg:tw-text-center tw-gap-1">
          <h3 className="tw-text-2xl tw-text-gray-800 dark:tw-text-gray-200 max-md:tw-text-xl tw-font-semibold">
            Join our newsletter
          </h3>
          <p className="tw-text-gray-700 dark:tw-text-gray-300">
            Get updates on new features and Web3 tips.
          </p>
        </div>

        <form className="tw-flex tw-h-[60px] tw-place-items-center tw-gap-2 tw-p-2">
          <input
            type="email"
            className="input tw-h-full tw-w-full !tw-border-gray-600 tw-p-3 tw-outline-none tw-bg-transparent tw-border tw-rounded-md focus:tw-border-blue-500 tw-transition-colors"
            placeholder="your@email.com"
            required
            aria-label="Email address"
          />
          <button
            type="submit"
            className="btn !tw-rounded-full !tw-border-[1px] !tw-text-black !tw-border-solid !tw-border-black dark:!tw-text-white dark:!tw-border-gray-300 !tw-bg-transparent tw-transition-all tw-duration-[0.3s] hover:!tw-bg-black hover:!tw-text-white dark:hover:!tw-bg-white dark:hover:!tw-text-black !tw-px-6"
          >
            Signup
          </button>
        </form>
      </div>
    </section>
  );
});

// ============================================
// FOOTER COMPONENT
// ============================================
export const Footer = memo(function Footer() {
  return (
    <footer className="tw-mt-auto tw-flex tw-flex-col tw-w-full tw-gap-4 tw-text-sm tw-pt-[5%] tw-pb-10 tw-px-[10%] tw-text-black dark:tw-text-white max-md:tw-flex-col tw-border-t dark:tw-border-gray-800">
      <div className="tw-flex max-md:tw-flex-col max-md:tw-gap-6 tw-gap-3 tw-w-full tw-place-content-around">
        <div className="tw-flex tw-h-full tw-w-[250px] tw-flex-col tw-place-items-center tw-gap-6 max-md:tw-w-full">
          <a
            href="#"
            className="tw-w-full tw-place-items-center tw-flex tw-flex-col tw-gap-4"
          >
            <div className="tw-w-[120px] tw-h-[120px] tw-flex tw-place-content-center tw-place-items-center">
              <Image
                src="/assets/logo/logo.png"
                alt="ProofBaseAI Generator"
                width={120}
                height={120}
                className="tw-w-full tw-h-full tw-object-contain dark:tw-invert"
              />
            </div>
            <div className="tw-w-full tw-text-center tw-text-2xl tw-font-bold tw-uppercase">
              ProofBaseAI
            </div>
          </a>
          <div className="tw-flex tw-gap-4 tw-text-lg">
            <a
              href="https://github.com/ProofBaseAI"
              aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:tw-scale-110 tw-transition-transform hover:tw-text-blue-500"
            >
              <i className="bi bi-github" />
            </a>
            <a
              href="https://twitter.com/ProofBaseAI"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:tw-scale-110 tw-transition-transform hover:tw-text-blue-500"
            >
              <i className="bi bi-twitter" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:tw-scale-110 tw-transition-transform hover:tw-text-blue-500"
            >
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>

        <div className="tw-flex max-md:tw-flex-col tw-flex-wrap tw-gap-6 tw-h-full tw-w-full tw-justify-around">
          <nav className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h4 className="tw-text-xl tw-font-semibold">Resources</h4>
            <div className="tw-flex tw-flex-col tw-gap-3">
              <a href="#" className="footer-link">
                Getting started
              </a>
              <a href="#docs" className="footer-link">
                Documentation
              </a>
              <a
                href="https://basescan.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Smart Contract
              </a>
              <a
                href="https://base.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Base Network Explorer
              </a>
            </div>
          </nav>

          <nav className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h4 className="tw-text-xl tw-font-semibold">Company</h4>
            <div className="tw-flex tw-flex-col tw-gap-3">
              <a href="#community" className="footer-link">
                Community
              </a>
              <a href="#faq" className="footer-link">
                FAQ
              </a>
              <a href="#" className="footer-link">
                Blog
              </a>
              <a
                href="https://twitter.com/ProofBaseAI"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Twitter
              </a>
              <a
                href="https://github.com/ProofBaseAI"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                Github
              </a>
            </div>
          </nav>

          <nav className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h4 className="tw-text-xl tw-font-semibold">Legal</h4>
            <div className="tw-flex tw-flex-col tw-gap-3">
              <a href="#" className="footer-link">
                Terms of service
              </a>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
              <a href="#" className="footer-link">
                Content Policy
              </a>
            </div>
          </nav>
        </div>
      </div>

      <hr className="tw-mt-8 tw-border-gray-200 dark:tw-border-gray-800" />
      <div className="tw-mt-2 tw-flex tw-gap-2 tw-flex-col tw-text-gray-700 dark:tw-text-gray-300 tw-place-items-center tw-text-[12px] tw-w-full tw-text-center tw-place-content-around">
        <span>
          Copyright &#169; 2025 ProofBaseAI Generator. All rights reserved.
        </span>
        <span>
          Powered by Base Network - All certificates are permanently stored
          onchain.
        </span>
      </div>
    </footer>
  );
});
