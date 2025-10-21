"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js";
import "bootstrap-icons/font/bootstrap-icons.css";

gsap.registerPlugin(ScrollTrigger);

// =============================================
// TYPES & CONSTANTS
// =============================================
interface Mode {
  name: string;
  description: string;
  placeholder: string;
  samples: string[];
}

interface Certificate {
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

const MODES: Record<string, Mode> = {
  "base-chat": {
    name: "General Assistant",
    description: "General AI assistant for Base Network",
    placeholder: "Describe your achievement or ask anything...",
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
    description: "Chat about onchain activities",
    placeholder: "Ask about onchain activity...",
    samples: [
      "What were my transactions last month?",
      "I completed 200 NFT mints on Base",
      "Show my DeFi positions on Base",
      "I made 50 smart contract interactions",
      "Track my swap history on Base DEX",
    ],
  },
};

// =============================================
// HEADER COMPONENT
// =============================================
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("color-mode") === "dark" ||
      (!localStorage.getItem("color-mode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("tw-dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("tw-dark");
    localStorage.setItem("color-mode", !isDark ? "dark" : "light");
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask or another Web3 wallet");
        window.open("https://metamask.io/download/", "_blank");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      alert("Failed to connect wallet");
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress("");
  };

  return (
    <header className="lg:tw-px-4 tw-max-w-[100vw] max-lg:tw-top-0 tw-fixed tw-top-4 lg:tw-left-1/2 lg:tw--translate-x-1/2 tw-z-20 tw-flex tw-h-[60px] tw-w-full tw-text-gray-700 tw-bg-white dark:tw-text-gray-200 dark:tw-bg-[#17181b] tw-px-[3%] tw-rounded-md lg:tw-max-w-5xl tw-shadow-md dark:tw-shadow-gray-700 lg:tw-justify-around lg:!tw-backdrop-blur-lg lg:tw-opacity-[0.99]">
      <a className="tw-flex tw-p-[4px] tw-gap-2 tw-place-items-center" href="#">
        <div className="tw-h-[50px] tw-w-[50px]">
          <Image
            src="/assets/logo/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="tw-object-contain tw-h-full tw-w-full dark:tw-invert"
          />
        </div>
      </a>

      <div
        className={`collapsible-header animated-collapse ${
          isOpen ? "max-lg:!tw-opacity-100 tw-min-h-[90vh]" : ""
        }`}
        style={{ height: isOpen ? "90vh" : "" }}
      >
        <nav className="tw-relative tw-flex tw-h-full max-lg:tw-h-max tw-w-max tw-gap-5 tw-text-base max-lg:tw-mt-[30px] max-lg:tw-flex-col max-lg:tw-gap-5 lg:tw-mx-auto tw-place-items-center">
          <a className="header-links" href="#features">
            Features
          </a>
          <a className="header-links" href="#how-it-works">
            How it Works
          </a>

          <div className="tw-relative tw-flex tw-flex-col tw-place-items-center">
            <div
              onMouseEnter={() => setNavDropdownOpen(true)}
              onMouseLeave={() => setNavDropdownOpen(false)}
              className="max-lg:tw-max-w-fit tw-flex header-links tw-gap-1 tw-place-items-center"
            >
              <span>Resources</span>
              <i className="tw-text-sm bi bi-chevron-down" />
            </div>

            {navDropdownOpen && (
              <nav
                onMouseEnter={() => setNavDropdownOpen(true)}
                onMouseLeave={() => setNavDropdownOpen(false)}
                className="lg:tw-fixed tw-flex lg:tw-top-[80px] lg:tw-left-1/2 lg:tw--translate-x-1/2 tw-w-[90%] tw-rounded-lg lg:tw-h-[450px] tw-overflow-hidden tw-bg-white dark:tw-bg-[#17181B] tw-shadow-lg tw-p-4 tw-z-50"
              >
                <div className="tw-grid max-xl:tw-flex max-xl:tw-flex-col tw-justify-around tw-grid-cols-2 tw-w-full">
                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="#docs"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-book-fill" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        Documentation
                      </div>
                      <p>Complete guide to create and mint certificates</p>
                    </div>
                  </a>

                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="#smart-contract"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-file-code-fill" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        Smart Contract
                      </div>
                      <p>View our verified smart contract on Base</p>
                    </div>
                  </a>

                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="#faq"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-question-circle-fill" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        FAQ
                      </div>
                      <p>Common questions and answers</p>
                    </div>
                  </a>

                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="https://github.com/Nanadaime-oss"
                    target="_blank"
                    rel="noopener"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-github" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        GitHub
                      </div>
                      <p>Open source code and contributions</p>
                    </div>
                  </a>

                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="#community"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-people-fill" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        Community
                      </div>
                      <p>Join our Discord and Telegram</p>
                    </div>
                  </a>

                  <a
                    className="header-links tw-flex tw-text-left tw-gap-4 !tw-p-4"
                    href="https://basescan.org"
                    target="_blank"
                    rel="noopener"
                  >
                    <div className="tw-font-semibold tw-text-3xl">
                      <i className="bi bi-shield-check" />
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-2">
                      <div className="tw-text-lg tw-text-black dark:tw-text-white tw-font-medium">
                        Base Explorer
                      </div>
                      <p>Verify certificates on Base Network</p>
                    </div>
                  </a>
                </div>
              </nav>
            )}
          </div>
        </nav>

        <div className="lg:tw-mx-4 tw-flex tw-place-items-center tw-gap-[20px] tw-text-base max-md:tw-w-full max-md:tw-flex-col max-md:tw-place-content-center">
          <button
            onClick={toggleTheme}
            className="header-links tw-text-gray-600 dark:tw-text-gray-300"
            title="toggle-theme"
          >
            <i className={`bi ${isDark ? "bi-moon" : "bi-sun"}`} />
          </button>

          {walletConnected ? (
            <div className="tw-flex tw-gap-2 tw-place-items-center tw-px-3 tw-py-2 tw-rounded-md tw-bg-gray-100 dark:tw-bg-[#171717]">
              <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-500" />
              <span className="tw-text-sm tw-font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="tw-text-xs tw-underline tw-text-gray-600 dark:tw-text-gray-400 hover:tw-text-red-500"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="btn tw-flex tw-gap-2 tw-px-3 tw-py-2 tw-transition-transform tw-duration-[0.3s] hover:tw-translate-x-2"
            >
              <i className="bi bi-wallet2" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>

      <button
        className={`bi ${
          isOpen ? "bi-x max-lg:tw-fixed" : "bi-list"
        } tw-absolute tw-right-3 tw-top-3 tw-z-50 tw-text-3xl tw-text-gray-500 lg:tw-hidden`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="menu"
      />
    </header>
  );
}

// =============================================
// HERO SECTION
// =============================================
function HeroSection() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [currentMode, setCurrentMode] = useState("base-chat");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const typedRef = useRef<Typed | null>(null);
  const typedElementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.to(dashboardRef.current, {
        scale: 1,
        translateY: 0,
        rotateX: "0deg",
        scrollTrigger: {
          trigger: "#hero-section",
          start: window.innerWidth > 1024 ? "top 95%" : "top 70%",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }

    gsap.to(".reveal-up", { opacity: 0, y: "100%" });

    const sections = gsap.utils.toArray("section");
    sections.forEach((sec: any) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sec,
            start: "10% 80%",
            end: "20% 90%",
          },
        })
        .to(sec.querySelectorAll(".reveal-up"), {
          opacity: 1,
          duration: 0.8,
          y: "0%",
          stagger: 0.2,
        });
    });
  }, []);

  useEffect(() => {
    if (typedElementRef.current) {
      typedRef.current = new Typed(typedElementRef.current, {
        strings: MODES[currentMode].samples,
        typeSpeed: 50,
        smartBackspace: true,
        loop: true,
        backDelay: 2000,
        backSpeed: 30,
      });
    }

    return () => {
      typedRef.current?.destroy();
    };
  }, [currentMode]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newCertificate: Certificate = {
      title: "Certificate of Achievement",
      description: `Awarded for: ${prompt}`,
      category: determineCertificateCategory(prompt, currentMode),
      mode: MODES[currentMode].name,
      theme: "Futuristic Hologram",
      ai_signature: "Generated by AI Proof Generator",
      date_issued: new Date().toISOString().split("T")[0],
      wallet_address: "0x0000...0000",
      image_prompt: `Futuristic certificate with holographic Base logo for: ${prompt}`,
      metadata: {
        generator: "AI Proof Generator v2.0",
        blockchain: "Base Network",
        standard: "ERC-721",
      },
    };

    setCertificate(newCertificate);
    setIsGenerating(false);
    setPrompt("");
  };

  const determineCertificateCategory = (
    prompt: string,
    mode: string
  ): string => {
    if (mode === "achievement") return "Achievement";
    if (mode === "contribution") return "Contribution";
    if (mode === "onchain") return "Onchain Activity";

    const lower = prompt.toLowerCase();
    if (lower.includes("transaction") || lower.includes("swap"))
      return "Onchain Activity";
    if (lower.includes("contribut") || lower.includes("dao"))
      return "Contribution";
    if (lower.includes("ai") || lower.includes("model")) return "AI Work";
    return "Achievement";
  };

  const copyJSON = () => {
    if (!certificate) return;
    navigator.clipboard.writeText(JSON.stringify(certificate, null, 2));
    alert("Copied to clipboard!");
  };

  const downloadJSON = () => {
    if (!certificate) return;
    const blob = new Blob([JSON.stringify(certificate, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aiproof-certificate-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="hero-section"
      className="hero-section tw-relative tw-mt-20 tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-overflow-hidden max-lg:tw-mt-[100px]"
    >
      {/* Video Modal */}
      {showVideo && (
        <div className="tw-fixed tw-bg-[#000000af] dark:tw-bg-[#80808085] tw-top-0 tw-left-1/2 tw--translate-x-1/2 tw-z-20 tw-p-2 tw-w-full tw-h-full tw-flex tw-place-content-center tw-place-items-center">
          <div className="tw-max-w-[80vw] max-lg:tw-max-w-full max-lg:tw-w-full tw-p-6 tw-rounded-xl max-lg:tw-px-2 tw-w-full tw-gap-2 tw-shadow-md tw-h-[90vh] max-lg:tw-h-auto max-lg:tw-min-h-[400px] tw-bg-white dark:tw-bg-[#16171A] tw-max-h-full">
            <div className="tw-w-full tw-flex">
              <button
                onClick={() => setShowVideo(false)}
                className="tw-ml-auto tw-text-xl"
              >
                <i className="bi bi-x-circle-fill" />
              </button>
            </div>
            <div className="tw-flex tw-w-full tw-rounded-xl tw-px-[5%] max-md:tw-px-2 tw-min-h-[300px] tw-max-h-[90%] tw-h-full">
              <div className="tw-relative tw-bg-black tw-min-w-full tw-min-h-full tw-overflow-clip tw-rounded-md">
                <iframe
                  className="tw-absolute tw-top-[50%] tw--translate-y-[50%] tw-left-[50%] tw--translate-x-[50%] tw-w-full tw-h-full"
                  src="https://www.youtube.com/embed/6j4fPVkA3EA?si=llcTrXPRM-MRXDZB&controls=0&rel=0&showinfo=0&autoplay=1&loop=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hero-bg-gradient tw-relative tw-flex tw-h-full tw-min-h-[100vh] tw-w-full tw-flex-col tw-place-content-center tw-gap-6 tw-p-[5%] max-xl:tw-place-items-center max-lg:tw-p-4">
        <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-1/2 tw-top-[10%] tw-h-[120px] tw-w-[120px]" />

        <div className="tw-flex tw-flex-col tw-min-h-[60vh] tw-place-content-center tw-items-center">
          <h2 className="reveal-up tw-text-center tw-text-7xl tw-font-semibold tw-uppercase tw-leading-[90px] max-lg:tw-text-4xl max-md:tw-leading-snug">
            <span>AI Proof Generator</span>
            <br />
            <span className="tw-font-thin tw-font-serif">for Base Network</span>
          </h2>

          <div className="reveal-up tw-mt-8 tw-max-w-[450px] tw-text-lg max-lg:tw-text-base tw-p-2 tw-text-center tw-text-gray-800 dark:tw-text-white max-lg:tw-max-w-full">
            Create verifiable AI-powered certificates and mint them as NFTs on
            Base. Transform achievements into permanent onchain proof.
          </div>

          <div className="reveal-up tw-mt-10 max-md:tw-flex-col tw-flex tw-place-items-center tw-gap-4">
            <button
              onClick={() => setShowVideo(true)}
              className="btn !tw-w-[170px] max-lg:!tw-w-[160px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-flex tw-gap-2 tw-group !tw-bg-transparent !tw-text-black dark:!tw-text-white tw-transition-colors tw-duration-[0.3s] tw-border-[1px] tw-border-black dark:tw-border-white"
            >
              <div className="tw-relative tw-flex tw-place-items-center tw-place-content-center tw-w-6 tw-h-6">
                <div className="tw-absolute tw-inset-0 tw-top-0 tw-left-0 tw-scale-0 tw-duration-300 group-hover:tw-scale-100 tw-border-2 tw-border-gray-600 dark:tw-border-gray-200 tw-rounded-full tw-w-full tw-h-full" />
                <span className="bi bi-play-circle-fill" />
              </div>
              <span>Watch demo</span>
            </button>

            <a
              href="#generator"
              className="btn tw-group max-lg:!tw-w-[160px] tw-flex tw-gap-2 tw-shadow-lg !tw-w-[170px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.03]"
            >
              <span>Get started</span>
              <i className="bi bi-arrow-right group-hover:tw-translate-x-1 tw-duration-300" />
            </a>
          </div>
        </div>

        {/* Dashboard/Generator */}
        <div
          className="reveal-up tw-relative tw-mt-8 tw-flex tw-w-full tw-place-content-center tw-place-items-center"
          id="dashboard-container"
        >
          <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-x-1/2 tw-top-[5%] tw-h-[200px] tw-w-[200px]" />

          <div
            ref={dashboardRef}
            id="dashboard"
            className="tw-relative tw-max-w-[80%] tw-bg-white dark:tw-bg-black tw-border-[1px] dark:tw-border-[#36393c] lg:tw-w-[1024px] lg:tw-h-[650px] tw-flex tw-shadow-xl max-lg:tw-h-[450px] max-lg:tw-w-full tw-overflow-hidden tw-min-w-[320px] md:tw-w-full tw-min-h-[450px] tw-rounded-xl tw-bg-transparent max-md:tw-max-w-full"
          >
            <div className="animated-border tw-w-full tw-h-full tw-p-[2px]">
              <div className="tw-w-full tw-h-full tw-rounded-xl tw-overflow-hidden tw-flex">
                {/* Sidebar */}
                <div className="tw-min-w-[250px] max-lg:tw-hidden tw-p-4 tw-gap-2 tw-flex tw-flex-col tw-bg-gray-100 dark:tw-bg-[#171717] tw-h-full">
                  <div className="tw-flex tw-mt-2 tw-gap-2 tw-flex-col">
                    {Object.entries(MODES).map(([key, mode]) => (
                      <button
                        key={key}
                        onClick={() => setCurrentMode(key)}
                        className={`tw-flex tw-rounded-sm tw-gap-2 tw-p-2 tw-items-center tw-text-left dark:hover:tw-bg-[#2d2d2ddb] hover:tw-bg-gray-200 tw-transition-colors ${
                          currentMode === key
                            ? "tw-bg-blue-100 dark:tw-bg-blue-900/30"
                            : ""
                        }`}
                      >
                        <i
                          className={`bi ${
                            key === "base-chat"
                              ? "bi-robot"
                              : key === "achievement"
                              ? "bi-trophy"
                              : key === "contribution"
                              ? "bi-person-check"
                              : "bi-coin"
                          }`}
                        />
                        <span>{mode.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="tw-mt-auto tw-w-full tw-flex tw-px-6 tw-place-content-center">
                    <button className="btn !tw-w-full !tw-bg-transparent tw-duration-[0.3s] hover:!tw-bg-black hover:!tw-text-white dark:hover:!tw-bg-white dark:hover:!tw-text-black !tw-border-[1px] !tw-border-black !tw-text-black dark:!tw-border-white dark:!tw-text-white tw-flex tw-gap-2">
                      <i className="bi bi-wallet2" />
                      <span>Connect Wallet</span>
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div
                  className="tw-flex tw-w-full tw-p-4 tw-bg-white dark:tw-bg-black tw-h-full tw-flex-col"
                  id="pixa-playground"
                >
                  <div className="tw-relative tw-w-full tw-flex tw-place-content-center tw-h-full">
                    <div className="prompt-container tw-overflow-y-auto tw-px-[5%] max-lg:tw-px-2 scrollbar max-lg:tw-max-h-[80%] tw-max-h-[550px] max-lg:tw-mt-12 tw-w-full tw-h-full tw-z-10 tw-flex tw-flex-col">
                      {!certificate ? (
                        <div className="tw-w-full tw-flex tw-text-center tw-flex-col tw-place-content-center">
                          <h2 className="tw-text-4xl max-md:tw-text-2xl max-md:tw-mt-3 tw-opacity-80 tw-font-semibold">
                            Try Sample Prompts
                          </h2>
                          <div className="tw-inline tw-mt-6 max-md:tw-mt-3 tw-px-2">
                            <span
                              ref={typedElementRef}
                              className="tw-text-lg max-md:tw-text-base"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          id="certificate-preview"
                          className="tw-w-full tw-p-6 tw-bg-[#f6f7fb] dark:tw-bg-[#141414] tw-rounded-xl tw-mt-6 tw-border tw-border-gray-200 dark:tw-border-gray-700"
                        >
                          <h3 className="tw-text-2xl tw-font-semibold tw-flex tw-gap-2 tw-place-items-center">
                            <i className="bi bi-check-circle-fill tw-text-green-500" />
                            Generated Certificate
                          </h3>
                          <pre
                            id="certificate-json"
                            className="tw-mt-4 tw-p-4 tw-bg-black tw-text-green-400 tw-rounded-md tw-overflow-x-auto tw-text-sm tw-font-mono tw-max-h-[300px]"
                          >
                            {JSON.stringify(certificate, null, 2)}
                          </pre>
                          <div className="tw-mt-4 tw-flex tw-gap-3 tw-flex-wrap">
                            <button
                              id="mint-to-base"
                              className="btn !tw-bg-[#0052FF] !tw-text-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-transform"
                            >
                              <i className="bi bi-coin" />
                              Mint to Base
                            </button>
                            <button
                              id="copy-json"
                              onClick={copyJSON}
                              className="btn !tw-bg-transparent !tw-border-[1px] !tw-border-black dark:!tw-border-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-transform"
                            >
                              <i className="bi bi-clipboard" />
                              Copy JSON
                            </button>
                            <button
                              id="download-json"
                              onClick={downloadJSON}
                              className="btn !tw-bg-transparent !tw-border-[1px] !tw-border-black dark:!tw-border-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-transform"
                            >
                              <i className="bi bi-download" />
                              Download
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prompt Form */}
                  <form
                    onSubmit={handleGenerate}
                    className="tw-place-content-center tw-mt-auto tw-w-full tw-rounded-md tw-bg-[#f3f4f6] dark:tw-bg-[#171717] tw-p-3"
                  >
                    <div className="tw-flex tw-gap-3 tw-place-items-center tw-justify-between tw-w-full tw-text-xs tw-text-gray-500 dark:tw-text-gray-400 tw-px-2 tw-pb-3 tw-border-b tw-border-gray-200 dark:tw-border-gray-700 tw-mb-3">
                      <div className="tw-flex tw-gap-2 tw-place-items-center tw-flex-wrap">
                        <Image
                          src="/assets/images/base.png"
                          alt="Base"
                          width={14}
                          height={14}
                          className="tw-flex-shrink-0"
                        />
                        <span className="tw-text-gray-700 dark:tw-text-gray-300 tw-font-semibold tw-whitespace-nowrap">
                          0.000003 ETH
                        </span>
                        <span className="tw-text-gray-400">$0.01</span>
                      </div>

                      <div className="tw-flex tw-gap-2 tw-place-items-center tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-border tw-border-blue-200 dark:tw-border-blue-800">
                        <div className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-500 tw-animate-pulse tw-flex-shrink-0" />
                      </div>
                    </div>

                    <div className="tw-flex tw-w-full tw-gap-2 tw-place-items-center">
                      <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={MODES[currentMode].placeholder}
                        className="tw-p-3 !tw-outline-none tw-bg-transparent tw-border-none tw-w-full tw-placeholder-gray-500 dark:tw-placeholder-opacity-60 dark:tw-placeholder-gray-400 tw-text-base max-md:tw-text-sm"
                        disabled={isGenerating}
                        required
                      />

                      <button
                        type="submit"
                        disabled={isGenerating}
                        className="btn !tw-bg-[#6366f1] !tw-p-3 !tw-px-4 !tw-text-white !tw-rounded-lg tw-flex tw-gap-2 tw-place-items-center tw-transition-all tw-duration-300 hover:tw-scale-105 tw-flex-shrink-0"
                        title="Send"
                      >
                        <i
                          className={`bi ${
                            isGenerating
                              ? "bi-hourglass-split tw-animate-spin"
                              : "bi-arrow-up"
                          }`}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// BUILD ON BASE SECTION
// =============================================
function BuildOnBaseSection() {
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
          AI Proof Generator is powered by Base Network, Ethereum's L2 solution.
          Our smart contracts enable permanent, verifiable, and trustless
          certificate storage onchain for your achievements and contributions.
        </p>
        <div className="reveal-up tw-flex tw-mt-8">
          <a
            href="https://basescan.org"
            target="_blank"
            rel="noopener"
            className="tw-shadow-md hover:tw-shadow-xl dark:tw-shadow-gray-800 tw-transition-all tw-duration-300 tw-border-[1px] tw-p-3 tw-px-4 tw-border-black dark:tw-border-white tw-rounded-md tw-flex tw-gap-2 tw-place-items-center"
          >
            <i className="bi bi-box-arrow-up-right" />
            View Smart Contract
          </a>
        </div>
      </div>
    </section>
  );
}

// =============================================
// WHY CHOOSE SECTION
// =============================================
function WhyChooseSection() {
  return (
    <section
      className="tw-relative tw-flex tw-max-w-[100vw] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden"
      id="how-it-works"
    >
      <div className="tw-mt-8 tw-flex tw-flex-col tw-w-full tw-h-full tw-place-items-center tw-gap-5">
        <div className="reveal-up tw-mt-5 tw-flex tw-flex-col tw-gap-3 tw-text-center">
          <h2 className="tw-text-6xl tw-font-medium max-md:tw-text-3xl tw-p-2">
            Why Choose AI Proof Generator
          </h2>
        </div>
        <div className="tw-mt-6 tw-flex tw-flex-col tw-max-w-[1150px] max-lg:tw-max-w-full tw-h-full tw-p-4 max-lg:tw-place-content-center tw-gap-8">
          <div className="max-xl:tw-flex max-xl:tw-flex-col tw-place-items-center tw-grid tw-grid-cols-3 tw-gap-8 tw-place-content-center tw-auto-rows-auto">
            <div className="reveal-up tw-w-[350px] tw-h-[540px] tw-flex max-md:tw-w-full">
              <a
                href="#"
                className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02]"
              >
                <div className="tw-overflow-hidden tw-w-full tw-min-h-[180px] tw-h-[180px]">
                  <Image
                    src="/assets/images/home/api.png"
                    width={350}
                    height={180}
                    alt="AI-Powered"
                    className="tw-w-full tw-object-contain tw-h-auto"
                  />
                </div>
                <h2 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                  AI-Powered Generation
                </h2>
                <p className="tw-text-base tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                  Our AI analyzes your achievements and automatically generates
                  professional certificates with appropriate metadata,
                  categories, and visual themes—all in seconds.
                </p>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                </div>
              </a>
            </div>

            <div className="reveal-up tw-w-[350px] tw-h-[540px] tw-flex max-md:tw-w-full">
              <a
                href="#"
                className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02]"
              >
                <div className="tw-w-full tw-min-h-[180px] tw-h-[180px] tw-overflow-hidden">
                  <Image
                    src="/assets/images/home/api.png"
                    width={350}
                    height={180}
                    alt="Base Network"
                    className="tw-w-full tw-h-auto tw-object-contain"
                  />
                </div>
                <h2 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                  Base Network NFTs
                </h2>
                <p className="tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                  Mint your certificates as NFTs on Base Network. Each
                  certificate is permanently stored onchain, providing
                  verifiable and immutable proof that can never be lost or
                  altered.
                </p>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                </div>
              </a>
            </div>

            <div className="reveal-up tw-w-[350px] tw-h-[540px] tw-flex max-md:tw-w-full">
              <a
                href="#"
                className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02]"
              >
                <div className="tw-w-full tw-flex tw-place-contet-center tw-min-h-[180px] tw-h-[180px] tw-rounded-xl tw-overflow-hidden">
                  <Image
                    src="/assets/images/home/integrations1.png"
                    width={350}
                    height={180}
                    className="tw-w-full tw-h-auto tw-object-contain"
                    alt="JSON Export"
                  />
                </div>
                <h2 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                  Clean JSON Export
                </h2>
                <p className="tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                  Every certificate includes structured JSON metadata perfect
                  for Web3 integrations. Export and use your proof anywhere—from
                  dApps to portfolio websites.
                </p>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                </div>
              </a>
            </div>
          </div>

          <div className="reveal-up tw-w-full md:tw-h-[350px] max-md:tw-min-h-[350px] tw-flex">
            <a
              href="#"
              className="tw-relative tw-p-10 tw-transition-all tw-duration-300 tw-group/card tw-gap-5 tw-flex max-md:tw-flex-col tw-w-full tw-h-full tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-rounded-3xl hover:tw-scale-[1.02]"
            >
              <div className="tw-text-6xl tw-overflow-hidden tw-rounded-xl tw-w-full tw-h-full max-md:tw-h-[180px]">
                <Image
                  src="/assets/images/home/ai-models.png"
                  width={600}
                  height={350}
                  className="tw-w-full tw-object-contain tw-h-full"
                  alt="Multiple Categories"
                />
              </div>
              <div className="tw-flex tw-flex-col tw-gap-4">
                <h2 className="tw-text-3xl max-md:tw-text-2xl tw-font-medium">
                  Multiple Certificate Types
                </h2>
                <p className="tw-leading-normal tw-text-gray-800 dark:tw-text-gray-200">
                  AI Proof supports various certificate categories including
                  Onchain Activity, Achievements, Contributions, AI Work, and
                  custom types—all tailored to your specific needs.
                </p>
                <div className="tw-flex tw-items-center tw-gap-2 tw-mt-auto">
                  <span>Learn more</span>
                  <i className="bi bi-arrow-right tw-transform tw-transition-transform tw-duration-300 group-hover/card:tw-translate-x-2" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================
// CERTIFICATE CATEGORIES SECTION
// =============================================
function CategoriesSection() {
  const categories = [
    {
      icon: "bi-coin",
      title: "Onchain Activity Proof",
      description:
        "Generate certificates for blockchain transactions, DeFi activities, NFT trades, or any onchain achievements on Base Network.",
    },
    {
      icon: "bi-trophy-fill",
      title: "Achievement Certificates",
      description:
        "Create proof for personal milestones, learning achievements, challenge completions, or any accomplishment worth celebrating.",
    },
    {
      icon: "bi-person-check-fill",
      title: "Contribution Proof",
      description:
        "Document your contributions to open-source projects, DAOs, communities, or collaborative efforts with verifiable certificates.",
    },
    {
      icon: "bi-robot",
      title: "AI Work Certificates",
      description:
        "Prove AI-generated content, prompt engineering work, model training achievements, or any AI-related accomplishments.",
    },
    {
      icon: "bi-palette-fill",
      title: "Custom Themes",
      description:
        "Choose from futuristic hologram, cyber aesthetic, minimal design, or create custom visual themes for your NFT certificates.",
    },
    {
      icon: "bi-shield-fill-check",
      title: "Blockchain Verification",
      description:
        "Every certificate is verifiable through Base Network blockchain explorer. Permanent, immutable, and trustless proof.",
    },
  ];

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
              className="btn !tw-mt-8 !tw-bg-transparent !tw-text-black !tw-border-[1px] !tw-border-black dark:!tw-border-white dark:!tw-text-white"
            >
              Generate Proof
            </a>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-10 tw-h-full tw-max-w-1/2 max-lg:tw-max-w-full tw-px-[10%] max-lg:tw-px-4 max-lg:tw-gap-3 max-lg:tw-w-full lg:tw-top-[20%] tw-place-items-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="reveal-up tw-h-[240px] tw-w-[450px] max-md:tw-w-full"
            >
              <a
                href="#"
                className="tw-flex tw-w-full tw-h-full tw-gap-8 tw-rounded-xl hover:tw-shadow-lg dark:tw-shadow-[#171717] tw-duration-300 tw-transition-all tw-p-8 tw-group/card"
              >
                <div className="tw-text-4xl max-md:tw-text-2xl">
                  <i className={`bi ${category.icon}`} />
                </div>

                <div className="tw-flex tw-flex-col tw-gap-4">
                  <h3 className="tw-text-2xl max-md:tw-text-xl">
                    {category.title}
                  </h3>
                  <p className="tw-text-gray-800 dark:tw-text-gray-100 max-md:tw-text-sm">
                    {category.description}
                  </p>

                  <div className="tw-mt-auto tw-flex tw-gap-2 tw-underline tw-underline-offset-4">
                    <span>Learn more</span>
                    <i className="bi bi-arrow-up-right group-hover/card:tw--translate-y-1 group-hover/card:tw-translate-x-1 tw-duration-300 tw-transition-transform" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// KEY FEATURES SECTION
// =============================================
function KeyFeaturesSection() {
  const features = [
    {
      image: "/assets/images/home/prompts2.png",
      title: "AI-Powered Smart Generation",
      description:
        "AI analyzes your input and automatically generates professional certificates with metadata, categories, and visual themes.",
    },
    {
      image: "/assets/images/home/search.png",
      title: "Base Network Integration",
      description:
        "Mint your certificates as NFTs on Base Network. Low fees, fast transactions, and Ethereum-level security.",
    },
    {
      image: "/assets/images/home/image.png",
      title: "JSON Export",
      description:
        "Export structured JSON metadata perfect for Web3 integrations, portfolio sites, or any dApp.",
    },
    {
      image: "/assets/images/home/history.png",
      title: "NFT Gallery",
      description:
        "All your minted certificates are stored in your wallet. View, share, and manage your onchain proof collection anytime.",
    },
    {
      image: "/assets/images/home/import.png",
      title: "Blockchain Verified",
      description:
        "Every certificate is permanently stored onchain and verifiable through Base Network explorer. No centralized database needed.",
    },
    {
      image: "/assets/images/home/multilingual.png",
      title: "Custom Visual Themes",
      description:
        "Choose from futuristic, holographic, cyber, or minimal themes. AI generates matching visual concepts for your NFT.",
    },
  ];

  return (
    <section className="tw-relative tw-flex tw-w-full tw-min-h-[110vh] max-md:tw-min-h-[80vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden">
      <div className="tw-w-full max-lg:tw-max-w-full tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[80%] tw-gap-4 tw-p-4">
        <h3 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-3xl tw-text-center tw-leading-normal">
          Key Features
        </h3>

        <div className="tw-mt-8 tw-relative tw-gap-10 tw-p-4 tw-grid tw-place-items-center tw-grid-cols-3 max-lg:tw-flex max-lg:tw-flex-col">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal-up tw-w-[350px] tw-border-[1px] tw-h-[400px] tw-rounded-md tw-place-items-center tw-p-4 tw-bg-[#f2f3f4] max-md:tw-w-[320px] dark:tw-bg-[#141414] dark:tw-border-[#1f2123] tw-flex tw-flex-col tw-gap-3"
            >
              <div className="tw-w-full tw-h-[250px] tw-p-4 tw-rounded-xl tw-backdrop-blur-2xl tw-overflow-hidden tw-flex tw-place-content-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={250}
                  height={250}
                  className="tw-w-auto tw-h-full tw-object-contain"
                />
              </div>
              <h3 className="tw-text-2xl">{feature.title}</h3>
              <p className="tw-text-gray-700 dark:tw-text-gray-300 tw-px-4 tw-text-center tw-text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================
// FAQ SECTION
// =============================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is AI Proof Generator?",
      answer:
        "AI Proof Generator is a tool that creates verifiable digital certificates using AI, which can be minted as NFTs on the Base Network. It analyzes your achievements and generates professional certificates with metadata, categories, and visual themes.",
    },
    {
      question: "What is Base Network?",
      answer:
        "Base is Ethereum's Layer 2 (L2) blockchain solution built by Coinbase. It offers low transaction fees, fast confirmation times, and the security of Ethereum—making it perfect for minting NFT certificates affordably.",
    },
    {
      question: "How do I mint a certificate?",
      answer:
        'Simply describe your achievement in the prompt, let the AI generate your certificate, review the JSON output, connect your wallet (MetaMask or Coinbase Wallet), and click "Mint to Base". Your certificate will be stored onchain forever.',
    },
    {
      question: "How much does it cost?",
      answer:
        "Generating certificates costs only 0.000003 ETH (≈$0.01) per generation. Minting to Base Network requires gas fees which are typically very low on Base (usually less than $0.01).",
    },
  ];

  return (
    <section
      className="tw-relative tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%]"
      id="faq"
    >
      <div className="purple-bg-grad max-md:tw-hidden reveal-up tw-absolute tw-bottom-14 tw-right-[20%] tw-h-[150px] tw-w-[150px] tw-rounded-full" />

      <h3 className="tw-text-4xl tw-font-medium max-md:tw-text-2xl">FAQ</h3>
      <div className="tw-mt-5 tw-flex tw-min-h-[300px] tw-w-full tw-max-w-[850px] tw-flex-col tw-gap-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <div className="faq tw-w-full">
              <h4
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-accordion tw-flex tw-w-full tw-select-none tw-text-xl max-md:tw-text-lg tw-cursor-pointer tw-p-4 tw-bg-inherit"
              >
                <span>{faq.question}</span>
                <i
                  className={`bi bi-plus tw-text-xl tw-origin-center tw-duration-300 tw-transition-transform tw-ml-auto tw-font-semibold ${
                    openIndex === index ? "tw-rotate-45" : ""
                  }`}
                />
              </h4>
              <div
                className="content max-lg:tw-text-sm tw-text-gray-700 dark:tw-text-gray-300"
                style={{
                  maxHeight: openIndex === index ? "240px" : "0",
                  padding: openIndex === index ? "20px 18px" : "0 18px",
                }}
              >
                {faq.answer}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
}

// =============================================
// CTA SECTION
// =============================================
function CTASection() {
  return (
    <section className="tw-relative tw-flex tw-p-2 tw-w-full tw-min-h-[60vh] tw-flex-col tw-place-content-center tw-place-items-center tw-overflow-hidden">
      <div className="reveal-up tw-w-full tw-h-full tw-min-h-[450px] max-lg:tw-max-w-full tw-rounded-md lg:tw-py-[5%] tw-bg-[#f6f7fb] dark:tw-bg-[#171717] tw-place-content-center tw-items-center tw-flex tw-flex-col tw-max-w-[80%] tw-gap-4 tw-p-4">
        <h3 className="reveal-up tw-text-5xl tw-font-medium max-md:tw-text-3xl tw-text-center tw-leading-normal">
          Generate Your First Certificate Now
        </h3>

        <div className="tw-mt-8 tw-relative tw-flex max-lg:tw-flex-col tw-gap-5">
          <a
            href="#generator"
            className="btn reveal-up !tw-rounded-full !tw-p-4 tw-font-medium tw-flex tw-gap-2"
          >
            <i className="bi bi-sparkles" />
            Start Generating
          </a>
        </div>
      </div>
    </section>
  );
}

// =============================================
// NEWSLETTER SECTION
// =============================================
function NewsletterSection() {
  return (
    <section className="tw-flex tw-w-full tw-flex-col tw-place-content-center tw-place-items-center tw-gap-[10%] tw-p-[5%] tw-px-[10%] max-md:tw-px-2">
      <div className="tw-flex tw-w-full tw-max-w-[80%] tw-place-content-center tw-place-items-center tw-justify-between tw-gap-3 tw-rounded-lg tw-bg-[#F6F7FB] dark:tw-bg-[#171717] tw-p-6 max-md:tw-max-w-full max-md:tw-flex-col">
        <div className="tw-flex tw-flex-col max-lg:tw-text-center tw-gap-1">
          <h2 className="tw-text-2xl tw-text-gray-800 dark:tw-text-gray-200 max-md:tw-text-xl">
            Join our newsletter
          </h2>
          <div className="tw-text-gray-700 dark:tw-text-gray-300">
            Get updates on new features and Web3 tips.
          </div>
        </div>

        <div className="tw-flex tw-h-[60px] tw-place-items-center tw-gap-2 tw-overflow-hidden tw-p-2">
          <input
            type="email"
            className="input tw-h-full tw-w-full !tw-border-gray-600 tw-p-2 tw-outline-none tw-bg-transparent tw-border tw-rounded-md"
            placeholder="email"
          />
          <a
            className="btn !tw-rounded-full !tw-border-[1px] !tw-text-black !tw-border-solid !tw-border-black dark:!tw-text-white dark:!tw-border-gray-300 !tw-bg-transparent tw-transition-colors tw-duration-[0.3s]"
            href="#"
          >
            Signup
          </a>
        </div>
      </div>
    </section>
  );
}

// =============================================
// FOOTER COMPONENT
// =============================================
function Footer() {
  return (
    <footer className="tw-mt-auto tw-flex tw-flex-col tw-w-full tw-gap-4 tw-text-sm tw-pt-[5%] tw-pb-10 tw-px-[10%] tw-text-black dark:tw-text-white max-md:tw-flex-col">
      <div className="tw-flex max-md:tw-flex-col max-md:tw-gap-6 tw-gap-3 tw-w-full tw-place-content-around">
        <div className="tw-flex tw-h-full tw-w-[250px] tw-flex-col tw-place-items-center tw-gap-6 max-md:tw-w-full">
          <a
            href="#"
            className="tw-w-full tw-place-items-center tw-flex tw-flex-col tw-gap-4"
          >
            <div className="tw-w-[120px] tw-h-[120px] tw-flex tw-place-content-center tw-place-items-center">
              <Image
                src="/assets/logo/logo.png"
                alt="logo"
                width={120}
                height={120}
                className="tw-w-full tw-h-full tw-object-contain dark:tw-invert"
              />
            </div>
            <div className="tw-w-full tw-text-center tw-text-2xl tw-font-bold tw-uppercase">
              AI PROOF
            </div>
          </a>
          <div className="tw-flex tw-gap-4 tw-text-lg">
            <a
              href="https://github.com/Nanadaime-oss"
              aria-label="Github"
              target="_blank"
              rel="noopener"
              className="hover:tw-scale-110 tw-transition-transform"
            >
              <i className="bi bi-github" />
            </a>
            <a
              href="https://twitter.com/aiproof"
              aria-label="Twitter"
              target="_blank"
              rel="noopener"
              className="hover:tw-scale-110 tw-transition-transform"
            >
              <i className="bi bi-twitter" />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="Linkedin"
              target="_blank"
              rel="noopener"
              className="hover:tw-scale-110 tw-transition-transform"
            >
              <i className="bi bi-linkedin" />
            </a>
          </div>
        </div>

        <div className="tw-flex max-md:tw-flex-col tw-flex-wrap tw-gap-6 tw-h-full tw-w-full tw-justify-around">
          <div className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h2 className="tw-text-xl tw-font-semibold">Resources</h2>
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
                rel="noopener"
                className="footer-link"
              >
                Smart Contract
              </a>
              <a
                href="https://base.org"
                target="_blank"
                rel="noopener"
                className="footer-link"
              >
                Base Network
              </a>
            </div>
          </div>

          <div className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h2 className="tw-text-xl tw-font-semibold">Company</h2>
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
                href="https://twitter.com/aiproof"
                target="_blank"
                rel="noopener"
                className="footer-link"
              >
                Twitter
              </a>
              <a
                href="https://github.com/Nanadaime-oss"
                target="_blank"
                rel="noopener"
                className="footer-link"
              >
                Github
              </a>
            </div>
          </div>

          <div className="tw-flex tw-h-full tw-w-[200px] tw-flex-col tw-gap-4">
            <h2 className="tw-text-xl tw-font-semibold">Legal</h2>
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
          </div>
        </div>
      </div>

      <hr className="tw-mt-8" />
      <div className="tw-mt-2 tw-flex tw-gap-2 tw-flex-col tw-text-gray-700 dark:tw-text-gray-300 tw-place-items-center tw-text-[12px] tw-w-full tw-text-center tw-place-content-around">
        <span>
          Copyright &#169; 2025 AI Proof Generator. All rights reserved.
        </span>
        <span>
          Powered by Base Network - All certificates are permanently stored
          onchain.
        </span>
      </div>
    </footer>
  );
}

// =============================================
// MAIN PAGE COMPONENT
// =============================================
export default function Home() {
  useEffect(() => {
    console.log(
      "%c🚀 AI Proof Generator v2.0",
      "color: #6366f1; font-size: 20px; font-weight: bold;"
    );
    console.log(
      "%cPowered by Base Network | Built by Nanadaime-oss",
      "color: #666; font-size: 12px;"
    );
    console.log(
      "%cGitHub: https://github.com/Nanadaime-oss",
      "color: #999; font-size: 10px;"
    );
  }, []);

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BuildOnBaseSection />
        <WhyChooseSection />
        <CategoriesSection />
        <KeyFeaturesSection />
        <FAQSection />
        <CTASection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
