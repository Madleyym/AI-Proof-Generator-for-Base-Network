"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js";
import { useNotification } from "@/components/GlobalNotification";
import { TypingAnimation } from "@/components/TypingAnimation";
import { MODES } from "@/lib/modes";
import type { Certificate, ChatMessage } from "@/types";
import baseKnowledge from "@/lib/baseKnowledge.json";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// THINKING INDICATOR COMPONENT
// ============================================
function ThinkingIndicator() {
  return (
    <div className="tw-flex tw-items-center tw-gap-2 tw-py-3">
      <div className="tw-rounded-full tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-flex-shrink-0 tw-shadow-lg tw-shadow-blue-500/50">
        <i className="bi bi-robot tw-text-white tw-text-sm" />
      </div>
      <div className="tw-flex tw-items-center tw-gap-1">
        <span className="tw-text-sm tw-font-medium tw-text-gray-700 dark:tw-text-gray-300">
          Thinking
        </span>
        <div className="tw-flex tw-gap-1">
          <span
            className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-400 tw-animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-400 tw-animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-400 tw-animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// CHAT MESSAGE COMPONENT WITH TYPING
// ============================================
interface ChatMessageComponentProps {
  msg: ChatMessage;
  isFullscreen: boolean;
  showTyping?: boolean;
  containerRef?: React.RefObject<HTMLDivElement>;
}

function ChatMessageComponent({
  msg,
  isFullscreen,
  showTyping = false,
  containerRef,
}: ChatMessageComponentProps) {
  return (
    <div
      className={`tw-p-4 tw-rounded-xl tw-shadow-sm tw-transition-all tw-duration-300 ${
        isFullscreen ? "tw-max-w-[70%]" : "tw-max-w-[80%]"
      } ${
        msg.role === "user"
          ? "tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 tw-text-white tw-shadow-lg tw-shadow-blue-500/30"
          : "tw-bg-gray-100 dark:tw-bg-[#1f1f1f] tw-text-gray-900 dark:tw-text-gray-100 tw-border tw-border-gray-200 dark:tw-border-gray-700"
      }`}
    >
      {showTyping && msg.role === "assistant" ? (
        //   TYPING ANIMATION WITH AUTO-SCROLL
        <TypingAnimation
          text={msg.content}
          speed={25}
          containerRef={containerRef}
        />
      ) : (
        <p
          className={`tw-leading-relaxed tw-whitespace-pre-line ${
            isFullscreen ? "tw-text-base" : "tw-text-sm"
          }`}
        >
          {msg.content}
        </p>
      )}

      {msg.txHash && msg.role === "assistant" && (
        <div className="tw-mt-3 tw-pt-3 tw-border-t tw-border-gray-300 dark:tw-border-gray-600">
          <div className="tw-flex tw-items-center tw-gap-2">
            <i className="bi bi-check-circle tw-text-green-500 tw-animate-pulse" />
            <p className="tw-text-xs tw-text-gray-600 dark:tw-text-gray-400 tw-font-mono tw-font-semibold">
              TX: {msg.txHash.slice(0, 10)}...{msg.txHash.slice(-8)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN HERO SECTION
// ============================================
export default function HeroSection() {
  // ==================== REFS ====================
  const dashboardRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<Typed | null>(null);
  const typedElementRef = useRef<HTMLSpanElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const mobileSelectRef = useRef<HTMLDivElement>(null);

  // ==================== NOTIFICATION ====================
  const { notify } = useNotification();

  // ==================== STATE ====================
  const [currentMode, setCurrentMode] = useState("base-chat");
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMobileSelect, setShowMobileSelect] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [lastMessageIndex, setLastMessageIndex] = useState<number | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isTyping, setIsTyping] = useState(false); //   NEW: Track if typing

  // ==================== MEMOIZED ====================
  const currentModeData = useMemo(() => MODES[currentMode], [currentMode]);

  // ==================== WALLET CHECK ====================
  useEffect(() => {
    const checkWallet = () => {
      const connectBtn = document.getElementById("connect-wallet-header");
      const addressSpan = document.getElementById("wallet-address");

      if (connectBtn && connectBtn.textContent?.includes("CONNECT")) {
        setWalletConnected(false);
        setWalletAddress(null);
      } else {
        setWalletConnected(true);
        if (addressSpan) {
          setWalletAddress(addressSpan.textContent);
        }
      }
    };

    checkWallet();
    const observer = new MutationObserver(checkWallet);
    observer.observe(document.body, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, []);

  // ==================== GSAP ANIMATIONS ====================
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.set(".reveal-up", { opacity: 0, y: "100%" });

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
    });

    return () => ctx.revert();
  }, []);

  // ==================== TYPED.JS ====================
  useEffect(() => {
    if (typedElementRef.current && currentModeData.samples) {
      typedRef.current?.destroy();
      typedRef.current = new Typed(typedElementRef.current, {
        strings: currentModeData.samples,
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
  }, [currentModeData.samples]);

  // ==================== AUTO-SCROLL & JUMP BUTTON ====================
  useEffect(() => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;

    const handleScroll = () => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      setIsAutoScroll(isNearBottom);
      setShowScrollButton(!isNearBottom);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ==================== SMOOTH SCROLL TO BOTTOM ====================
  const scrollToBottom = useCallback(() => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    setIsAutoScroll(true);
    setShowScrollButton(false);
  }, []);

  // ==================== AUTO-SCROLL ON NEW MESSAGE ====================
  useEffect(() => {
    if (!chatContainerRef.current || !isAutoScroll) return;

    const timer = setTimeout(() => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [chatMessages, isThinking, isAutoScroll]);

  // ==================== CLICK OUTSIDE ====================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileSelectRef.current &&
        !mobileSelectRef.current.contains(event.target as Node)
      ) {
        setShowMobileSelect(false);
      }
    };

    if (showMobileSelect) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSelect]);

  // ==================== ESC KEY ====================
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showVideo) setShowVideo(false);
        if (isFullscreen) setIsFullscreen(false);
        if (showMobileSelect) setShowMobileSelect(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showVideo, isFullscreen, showMobileSelect]);

  // ==================== HELPERS ====================
  const generateBaseKnowledgeResponse = useCallback(
    (question: string): string => {
      try {
        const lowerQ = question.toLowerCase().trim();

        if (!lowerQ) {
          return "Please ask a question about Base Network.";
        }

        for (const entry of baseKnowledge.knowledge) {
          if (
            entry.keywords.some((keyword) =>
              lowerQ.includes(keyword.toLowerCase())
            )
          ) {
            return entry.response;
          }
        }

        return baseKnowledge.fallbackResponse;
      } catch (error) {
        console.error("Error generating response:", error);
        return "Sorry, I encountered an error. Please try again.";
      }
    },
    []
  );

  const simulateTransaction = useCallback(async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const txHash = `0x${Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("")}`;
        resolve(txHash);
      }, 1000 + Math.random() * 1000);
    });
  }, []);

  const handleGenerate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const trimmedPrompt = prompt.trim();
      if (!trimmedPrompt) {
        notify("Please enter a prompt", "error", 3000);
        return;
      }

      if (!walletConnected) {
        if (currentMode === "base-chat") {
          const userMessage: ChatMessage = {
            role: "user",
            content: trimmedPrompt,
            timestamp: Date.now(),
          };
          setChatMessages((prev) => [...prev, userMessage]);
          setPrompt("");

          setIsThinking(true);
          await new Promise((resolve) => setTimeout(resolve, 800));
          setIsThinking(false);

          const aiResponse: ChatMessage = {
            role: "assistant",
            content:
              "To continue, please connect your wallet using the CONNECT button in the header. This helps us verify your identity.",
            timestamp: Date.now(),
          };

          setChatMessages((prev) => [...prev, aiResponse]);
          setLastMessageIndex(null);
          notify("Please connect your wallet first", "warning", 3000);
          return;
        } else {
          notify("Please connect your wallet first", "error", 3000);
          return;
        }
      }

      if (trimmedPrompt.length > 500) {
        notify("Prompt too long (max 500 characters)", "error", 3000);
        return;
      }

      setIsGenerating(true);
      setIsAutoScroll(true);

      try {
        if (currentMode === "base-chat") {
          const userMessage: ChatMessage = {
            role: "user",
            content: trimmedPrompt,
            timestamp: Date.now(),
          };
          setChatMessages((prev) => [...prev, userMessage]);
          setPrompt("");

          setIsThinking(true);
          await new Promise((resolve) => setTimeout(resolve, 1200));

          const [response, txHash] = await Promise.all([
            Promise.resolve(generateBaseKnowledgeResponse(trimmedPrompt)),
            simulateTransaction(),
          ]);

          setIsThinking(false);

          const aiResponse: ChatMessage = {
            role: "assistant",
            content: response,
            timestamp: Date.now(),
            txHash: txHash,
          };

          setChatMessages((prev) => {
            const updated = [...prev, aiResponse];
            setLastMessageIndex(updated.length - 1);
            return updated;
          });

          //   START TYPING ANIMATION
          setIsTyping(true);
        } else {
          setIsThinking(true);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          setIsThinking(false);

          const newCertificate: Certificate = {
            title: `Certificate of ${currentModeData.name}`,
            description: `Awarded for: ${trimmedPrompt}`,
            category: currentModeData.name,
            mode: currentModeData.name,
            theme: "Futuristic Hologram",
            ai_signature: "Generated by ProofBaseAI Generator",
            date_issued: new Date().toISOString().split("T")[0],
            wallet_address: walletAddress || "0x0000...0000",
            image_prompt: `Futuristic certificate with holographic Base logo for: ${trimmedPrompt}`,
            metadata: {
              generator: "ProofBaseAI Generator v2.0",
              blockchain: "Base Network",
              standard: "ERC-721",
            },
          };

          setCertificate(newCertificate);
          notify("Certificate ready to mint!", "success", 2500);
        }
      } catch (error) {
        console.error("Generation error:", error);
        notify("Failed to generate. Please try again.", "error", 3000);
      } finally {
        setIsGenerating(false);
        setIsThinking(false);
        setPrompt("");
        //   TYPING DONE
        setIsTyping(false);
      }
    },
    [
      prompt,
      currentMode,
      currentModeData,
      generateBaseKnowledgeResponse,
      simulateTransaction,
      walletConnected,
      walletAddress,
      notify,
    ]
  );

  const copyJSON = useCallback(async () => {
    if (!certificate) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(certificate, null, 2));
      notify("Copied to clipboard!", "success", 2000);
    } catch (error) {
      console.error("Copy failed:", error);
      notify("Failed to copy", "error", 2000);
    }
  }, [certificate, notify]);

  const downloadJSON = useCallback(() => {
    if (!certificate) return;

    try {
      const blob = new Blob([JSON.stringify(certificate, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate.category
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify("Certificate downloaded!", "success", 2000);
    } catch (error) {
      console.error("Download failed:", error);
      notify("Download failed", "error", 2000);
    }
  }, [certificate, notify]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
    setIsAutoScroll(true);
  }, []);

  const handleModeChange = useCallback((mode: string) => {
    setCurrentMode(mode);
    setCertificate(null);
    setShowMobileSelect(false);
  }, []);

  // ==================== JSX ====================
  return (
    <section
      id="hero-section"
      className="hero-section tw-relative tw-mt-20 tw-flex tw-min-h-[100vh] tw-w-full tw-max-w-[100vw] tw-flex-col tw-overflow-hidden max-lg:tw-mt-[100px]"
    >
      {/* VIDEO MODAL */}
      {showVideo && (
        <div
          className="tw-fixed tw-bg-[#000000af] dark:tw-bg-[#80808085] tw-top-0 tw-left-0 tw-z-50 tw-p-2 tw-w-full tw-h-full tw-flex tw-place-content-center tw-place-items-center"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <div
            className="tw-max-w-[80vw] max-lg:tw-max-w-full max-lg:tw-w-full tw-p-6 tw-rounded-xl max-lg:tw-px-2 tw-w-full tw-gap-2 tw-shadow-2xl tw-h-[90vh] max-lg:tw-h-auto max-lg:tw-min-h-[400px] tw-bg-white dark:tw-bg-[#16171A] tw-max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tw-w-full tw-flex tw-mb-4">
              <h2
                id="video-modal-title"
                className="tw-text-xl tw-font-semibold tw-flex-1"
              >
                Demo Video
              </h2>
              <button
                onClick={() => setShowVideo(false)}
                className="tw-ml-auto tw-text-2xl hover:tw-text-red-500 tw-transition-colors tw-p-2"
                aria-label="Close video"
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

      {/* FULLSCREEN MODAL */}
      {isFullscreen && (
        <div
          className="tw-fixed tw-inset-0 tw-z-50 tw-bg-white dark:tw-bg-black tw-flex tw-flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fullscreen-modal-title"
        >
          <div className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-b dark:tw-border-gray-800 tw-bg-white dark:tw-bg-[#17181b] tw-shadow-sm">
            <div className="tw-flex tw-items-center tw-gap-3">
              <Image
                src="/assets/logo/logo.png"
                alt="ProofBaseAI"
                width={40}
                height={40}
                className="dark:tw-invert"
              />
              <h2
                id="fullscreen-modal-title"
                className="tw-text-xl tw-font-semibold"
              >
                {currentModeData.name}
              </h2>
            </div>
            <button
              onClick={toggleFullscreen}
              className="tw-text-2xl hover:tw-text-red-500 tw-transition-colors tw-p-2"
              aria-label="Close fullscreen"
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <div className="tw-flex-1 tw-overflow-hidden tw-flex">
            <DashboardContent
              currentMode={currentMode}
              setCurrentMode={handleModeChange}
              setCertificate={setCertificate}
              setChatMessages={setChatMessages}
              chatMessages={chatMessages}
              certificate={certificate}
              typedElementRef={typedElementRef}
              chatContainerRef={chatContainerRef}
              handleGenerate={handleGenerate}
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              isThinking={isThinking}
              copyJSON={copyJSON}
              downloadJSON={downloadJSON}
              isFullscreen={true}
              showMobileSelect={showMobileSelect}
              setShowMobileSelect={setShowMobileSelect}
              mobileSelectRef={mobileSelectRef}
              walletConnected={walletConnected}
              toggleFullscreen={toggleFullscreen}
              lastMessageIndex={lastMessageIndex}
              showScrollButton={showScrollButton}
              scrollToBottom={scrollToBottom}
              isTyping={isTyping}
            />
          </div>
        </div>
      )}

      {/* HERO CONTENT */}
      <div className="hero-bg-gradient tw-relative tw-flex tw-h-full tw-min-h-[100vh] tw-w-full tw-flex-col tw-place-content-center tw-gap-6 tw-p-[5%] max-xl:tw-place-items-center max-lg:tw-p-4">
        <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-1/2 tw-top-[10%] tw-h-[120px] tw-w-[120px]" />

        <div className="tw-flex tw-flex-col tw-min-h-[60vh] tw-place-content-center tw-items-center">
          <h1 className="reveal-up tw-text-center tw-text-7xl tw-font-semibold tw-uppercase tw-leading-[90px] max-lg:tw-text-4xl max-md:tw-leading-snug">
            <span>Proof Base AI Generator</span>
            <br />
            <span className="tw-font-thin tw-font-serif">for Base Network</span>
          </h1>

          <p className="reveal-up tw-mt-8 tw-max-w-[450px] tw-text-lg max-lg:tw-text-base tw-p-2 tw-text-center tw-text-gray-800 dark:tw-text-white max-lg:tw-max-w-full">
            Create verifiable AI-powered certificates and mint them as NFTs on
            Base. Transform achievements into permanent onchain proof.
          </p>

          <div className="reveal-up tw-mt-10 max-md:tw-flex-col tw-flex tw-place-items-center tw-gap-4">
            <button
              onClick={() => setShowVideo(true)}
              className="btn !tw-w-[170px] max-lg:!tw-w-[160px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-flex tw-gap-2 tw-group !tw-bg-transparent !tw-text-black dark:!tw-text-white tw-transition-all tw-duration-[0.3s] tw-border-[1px] tw-border-black dark:tw-border-white hover:tw-bg-black hover:tw-text-white dark:hover:tw-bg-white dark:hover:tw-text-black hover:tw-shadow-lg"
              aria-label="Watch demo video"
            >
              <div className="tw-relative tw-flex tw-place-items-center tw-place-content-center tw-w-6 tw-h-6">
                <div className="tw-absolute tw-inset-0 tw-top-0 tw-left-0 tw-scale-0 tw-duration-300 group-hover:tw-scale-100 tw-border-2 tw-border-gray-600 dark:tw-border-gray-200 tw-rounded-full tw-w-full tw-h-full" />
                <span className="bi bi-play-circle-fill" />
              </div>
              <span>Watch demo</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="btn tw-group max-lg:!tw-w-[160px] tw-flex tw-gap-2 tw-shadow-lg !tw-w-[170px] !tw-rounded-xl !tw-py-4 max-lg:!tw-py-2 tw-transition-all tw-duration-[0.3s] hover:tw-scale-105 hover:tw-shadow-xl"
              aria-label="Launch application"
            >
              <span>Launch App</span>
            </button>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div
          className="reveal-up tw-relative tw-mt-8 tw-flex tw-w-full tw-place-content-center tw-place-items-center"
          id="dashboard-container"
        >
          <div className="purple-bg-grad reveal-up tw-absolute tw-left-1/2 tw--translate-x-1/2 tw-top-[5%] tw-h-[200px] tw-w-[200px]" />

          <div
            ref={dashboardRef}
            id="dashboard"
            className="tw-relative tw-max-w-[80%] tw-bg-white dark:tw-bg-black tw-border-[1px] dark:tw-border-[#36393c] lg:tw-w-[1024px] lg:tw-h-[650px] tw-flex tw-shadow-2xl max-lg:tw-h-[600px] max-lg:tw-w-full tw-overflow-hidden tw-min-w-[320px] md:tw-w-full tw-min-h-[450px] tw-rounded-xl tw-bg-transparent max-md:tw-max-w-full max-md:tw-h-[550px]"
          >
            <div className="animated-border tw-w-full tw-h-full tw-p-[2px]">
              <div className="tw-w-full tw-h-full tw-rounded-xl tw-overflow-hidden tw-flex tw-relative">
                <DashboardContent
                  currentMode={currentMode}
                  setCurrentMode={handleModeChange}
                  setCertificate={setCertificate}
                  setChatMessages={setChatMessages}
                  chatMessages={chatMessages}
                  certificate={certificate}
                  typedElementRef={typedElementRef}
                  chatContainerRef={chatContainerRef}
                  handleGenerate={handleGenerate}
                  prompt={prompt}
                  setPrompt={setPrompt}
                  isGenerating={isGenerating}
                  isThinking={isThinking}
                  copyJSON={copyJSON}
                  downloadJSON={downloadJSON}
                  isFullscreen={false}
                  showMobileSelect={showMobileSelect}
                  setShowMobileSelect={setShowMobileSelect}
                  mobileSelectRef={mobileSelectRef}
                  walletConnected={walletConnected}
                  toggleFullscreen={toggleFullscreen}
                  lastMessageIndex={lastMessageIndex}
                  showScrollButton={showScrollButton}
                  scrollToBottom={scrollToBottom}
                  isTyping={isTyping}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================
// DASHBOARD CONTENT
// ============================
function DashboardContent({
  currentMode,
  setCurrentMode,
  setCertificate,
  setChatMessages,
  chatMessages,
  certificate,
  typedElementRef,
  chatContainerRef,
  handleGenerate,
  prompt,
  setPrompt,
  isGenerating,
  isThinking,
  copyJSON,
  downloadJSON,
  isFullscreen,
  showMobileSelect,
  setShowMobileSelect,
  mobileSelectRef,
  walletConnected,
  toggleFullscreen,
  lastMessageIndex,
  showScrollButton,
  scrollToBottom,
  isTyping,
}: {
  currentMode: string;
  setCurrentMode: (mode: string) => void;
  setCertificate: (cert: Certificate | null) => void;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  chatMessages: ChatMessage[];
  certificate: Certificate | null;
  typedElementRef: React.RefObject<HTMLSpanElement>;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  handleGenerate: (e: React.FormEvent) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  isThinking: boolean;
  copyJSON: () => void;
  downloadJSON: () => void;
  isFullscreen: boolean;
  showMobileSelect: boolean;
  setShowMobileSelect: (show: boolean) => void;
  mobileSelectRef: React.RefObject<HTMLDivElement>;
  walletConnected: boolean;
  toggleFullscreen: () => void;
  lastMessageIndex: number | null;
  showScrollButton: boolean;
  scrollToBottom: () => void;
  isTyping: boolean;
}) {
  return (
    <>
      {/* SIDEBAR */}
      <div className="tw-min-w-[250px] max-lg:tw-hidden tw-p-4 tw-gap-2 tw-flex tw-flex-col tw-bg-gray-100 dark:tw-bg-[#171717] tw-h-full tw-border-r dark:tw-border-gray-800">
        <div className="tw-flex tw-mt-2 tw-gap-2 tw-flex-col">
          <button
            onClick={() => setCurrentMode("base-chat")}
            className={`tw-flex tw-rounded-lg tw-gap-3 tw-p-3 tw-items-center tw-text-left tw-transition-all tw-duration-200 ${
              currentMode === "base-chat"
                ? "tw-bg-blue-100 dark:tw-bg-blue-900/30 tw-shadow-md tw-scale-[1.02]"
                : "hover:tw-bg-gray-200 dark:hover:tw-bg-[#2d2d2ddb] hover:tw-shadow-sm"
            }`}
            aria-label="Switch to General Assistant mode"
            aria-pressed={currentMode === "base-chat"}
          >
            <i className="bi bi-robot tw-text-xl" />
            <span className="tw-font-medium">General Assistant</span>
          </button>

          <div className="tw-my-2 tw-border-t tw-border-gray-300 dark:tw-border-gray-700" />
          <div className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1">
            <span className="tw-text-xs tw-text-gray-500 dark:tw-text-gray-400 tw-italic">
              Coming Soon
            </span>
          </div>

          {Object.entries(MODES)
            .filter(([key]) => key !== "base-chat")
            .map(([key, mode]: [string, any]) => (
              <button
                key={key}
                onClick={() => setCurrentMode(key)}
                className={`tw-flex tw-rounded-lg tw-gap-3 tw-p-3 tw-items-center tw-text-left tw-transition-all tw-duration-200 ${
                  currentMode === key
                    ? "tw-bg-blue-100 dark:tw-bg-blue-900/30 tw-shadow-md tw-scale-[1.02]"
                    : "hover:tw-bg-gray-200 dark:hover:tw-bg-[#2d2d2ddb] hover:tw-shadow-sm"
                }`}
                aria-label={`Switch to ${mode.name} mode`}
                aria-pressed={currentMode === key}
              >
                <i className={`bi ${mode.icon} tw-text-xl`} />
                <span className="tw-font-medium">{mode.name}</span>
              </button>
            ))}
        </div>

        {!isFullscreen && !walletConnected && (
          <div className="tw-mt-auto tw-w-full tw-p-3 tw-bg-yellow-50 dark:tw-bg-yellow-900/20 tw-rounded-lg tw-text-center tw-border tw-border-yellow-200 dark:tw-border-yellow-800">
            <i className="bi bi-exclamation-triangle tw-text-yellow-600 dark:tw-text-yellow-400 tw-text-sm" />
            <p className="tw-text-xs tw-text-yellow-700 dark:tw-text-yellow-300 tw-mt-1 tw-font-medium">
              Connect Wallet
            </p>
            <p className="tw-text-xs tw-text-gray-600 dark:tw-text-gray-400 tw-mt-1">
              to unlock all features
            </p>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div
        className="tw-flex tw-w-full tw-bg-white dark:tw-bg-black tw-h-full tw-flex-col tw-overflow-hidden tw-relative"
        id="pixa-playground"
      >
        {/* ✨ FULLSCREEN BUTTON */}
        {!isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="tw-absolute tw-top-[-8px] tw-right-[-12px] tw-z-50 tw-p-3 tw-rounded-full tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 hover:tw-from-blue-600 hover:tw-to-blue-700 tw-text-white tw-shadow-xl tw-transition-all tw-duration-200 hover:tw-scale-110 active:tw-scale-95 tw-group tw-border-2 tw-border-blue-400 dark:tw-border-blue-500"
            title="Launch fullscreen"
            aria-label="Launch fullscreen mode"
          >
            <svg
              className="tw-w-6 tw-h-6 tw-transition-transform tw-duration-200 group-hover:tw-rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>

            <div className="tw-absolute tw-inset-0 tw-rounded-full tw-bg-white tw-opacity-0 group-hover:tw-opacity-20 tw-transition-opacity tw-duration-300" />
          </button>
        )}

        <div className="tw-relative tw-w-full tw-flex tw-flex-col tw-h-full tw-overflow-hidden">
          {/* CHAT/CONTENT AREA */}
          <div
            ref={chatContainerRef}
            className={`tw-flex-1 tw-overflow-y-auto scrollbar tw-flex tw-flex-col tw-relative ${
              isFullscreen
                ? "tw-px-8 tw-py-6"
                : "tw-px-4 tw-py-4 max-lg:tw-px-2"
            }`}
          >
            {/* ✨ JUMP TO LATEST BUTTON */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="tw-fixed tw-bottom-24 tw-right-6 max-lg:tw-bottom-20 max-lg:tw-right-4 tw-z-40 tw-p-3 tw-rounded-full tw-bg-gradient-to-br tw-from-blue-500 tw-to-blue-600 hover:tw-from-blue-600 hover:tw-to-blue-700 tw-text-white tw-shadow-xl tw-transition-all tw-duration-200 hover:tw-scale-110 active:tw-scale-95 tw-group tw-border-2 tw-border-blue-400 dark:tw-border-blue-500 tw-animate-bounce"
                title="Jump to latest messages"
                aria-label="Scroll to latest messages"
              >
                <svg
                  className="tw-w-5 tw-h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>

                <div className="tw-absolute tw-inset-0 tw-rounded-full tw-bg-white tw-opacity-0 group-hover:tw-opacity-20 tw-transition-opacity tw-duration-300" />
              </button>
            )}

            {currentMode === "base-chat" && chatMessages.length === 0 && (
              <div className="tw-w-full tw-flex tw-text-center tw-flex-col tw-place-content-center tw-place-items-center tw-min-h-[250px]">
                <div className="tw-mb-4">
                  <i className="bi bi-robot tw-text-5xl max-md:tw-text-4xl tw-text-blue-500 tw-animate-pulse" />
                </div>
                <h2
                  className={`tw-opacity-90 tw-font-semibold tw-mb-3 ${
                    isFullscreen
                      ? "tw-text-5xl"
                      : "tw-text-3xl max-md:tw-text-xl"
                  }`}
                >
                  Ask About Base Network
                </h2>
                <p className="tw-text-gray-600 dark:tw-text-gray-400 tw-mb-4 tw-max-w-md tw-text-sm max-md:tw-text-xs">
                  I&apos;m here to help you learn about Base Network, gas fees,
                  DeFi protocols, and more!
                </p>
                <div className="tw-inline tw-px-2">
                  <span
                    ref={typedElementRef}
                    className={`tw-text-blue-600 dark:tw-text-blue-400 tw-font-medium ${
                      isFullscreen
                        ? "tw-text-lg"
                        : "tw-text-base max-md:tw-text-sm"
                    }`}
                  />
                </div>
              </div>
            )}

            {currentMode === "base-chat" && chatMessages.length > 0 && (
              <div
                className={`tw-flex tw-flex-col tw-gap-4 tw-w-full ${
                  isFullscreen ? "tw-max-w-4xl tw-mx-auto" : ""
                }`}
              >
                {chatMessages.map((msg: ChatMessage, idx: number) => (
                  <div
                    key={idx}
                    className={`tw-flex tw-gap-3 tw-animate-in tw-fade-in tw-slide-in-from-bottom-2 tw-duration-300 ${
                      msg.role === "user"
                        ? "tw-justify-end"
                        : "tw-justify-start"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className={`tw-rounded-full tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 ${
                          isFullscreen ? "tw-w-10 tw-h-10" : "tw-w-8 tw-h-8"
                        } tw-shadow-lg tw-shadow-blue-500/50`}
                      >
                        <i className="bi bi-robot tw-text-white tw-text-sm" />
                      </div>
                    )}

                    {/* ✨ CHAT MESSAGE WITH AUTO-SCROLL TYPING */}
                    <ChatMessageComponent
                      msg={msg}
                      isFullscreen={isFullscreen}
                      showTyping={
                        idx === lastMessageIndex && msg.role === "assistant"
                      }
                      containerRef={chatContainerRef}
                    />

                    {msg.role === "user" && (
                      <div
                        className={`tw-rounded-full tw-bg-gray-500 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0 ${
                          isFullscreen ? "tw-w-10 tw-h-10" : "tw-w-8 tw-h-8"
                        }`}
                      >
                        <i className="bi bi-person-fill tw-text-white tw-text-sm" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Thinking Indicator */}
                {isThinking && (
                  <div className="tw-animate-in tw-fade-in tw-slide-in-from-bottom-2 tw-duration-300">
                    <ThinkingIndicator />
                  </div>
                )}
              </div>
            )}

            {currentMode !== "base-chat" && !certificate && (
              <div className="tw-w-full tw-flex tw-text-center tw-flex-col tw-place-content-center tw-place-items-center tw-min-h-[250px]">
                <div className="tw-mb-4">
                  <i
                    className={`bi ${MODES[currentMode].icon} tw-text-5xl max-md:tw-text-4xl tw-text-purple-500 tw-animate-pulse`}
                  />
                </div>
                <h2
                  className={`tw-opacity-90 tw-font-semibold tw-mb-3 ${
                    isFullscreen
                      ? "tw-text-5xl"
                      : "tw-text-3xl max-md:tw-text-xl"
                  }`}
                >
                  Generate Your Certificate
                </h2>
                {isFullscreen && (
                  <p className="tw-text-lg tw-text-gray-600 dark:tw-text-gray-400 tw-max-w-2xl tw-mx-auto tw-mb-6">
                    Describe your {MODES[currentMode].name.toLowerCase()} to
                    generate a professional certificate
                  </p>
                )}
                <div className="tw-inline tw-px-2">
                  <span
                    ref={typedElementRef}
                    className={`tw-text-purple-600 dark:tw-text-purple-400 tw-font-medium ${
                      isFullscreen
                        ? "tw-text-lg"
                        : "tw-text-base max-md:tw-text-sm"
                    }`}
                  />
                </div>
              </div>
            )}

            {currentMode !== "base-chat" && certificate && (
              <div
                className={`tw-w-full tw-p-6 tw-bg-gradient-to-br tw-from-[#f6f7fb] tw-to-[#e8eaf6] dark:tw-from-[#141414] dark:tw-to-[#1a1a1a] tw-rounded-xl tw-border-2 tw-border-green-200 dark:tw-border-green-900 tw-shadow-xl ${
                  isFullscreen ? "tw-max-w-4xl tw-mx-auto" : ""
                }`}
              >
                <div className="tw-flex tw-items-center tw-gap-3 tw-mb-4">
                  <div className="tw-p-3 tw-rounded-full tw-bg-green-100 dark:tw-bg-green-900/30 tw-shadow-lg tw-shadow-green-500/30">
                    <i className="bi bi-check-circle-fill tw-text-green-500 tw-text-3xl tw-animate-bounce" />
                  </div>
                  <div>
                    <h3 className="tw-text-2xl tw-font-bold tw-text-gray-900 dark:tw-text-white">
                      Certificate Generated!
                    </h3>
                    <p className="tw-text-sm tw-text-gray-600 dark:tw-text-gray-400">
                      Ready to mint on Base Network
                    </p>
                  </div>
                </div>

                <pre
                  className={`tw-mt-4 tw-p-4 tw-bg-black tw-text-green-400 tw-rounded-lg tw-overflow-x-auto tw-text-sm tw-font-mono tw-border tw-border-green-500/20 tw-shadow-inner ${
                    isFullscreen ? "tw-max-h-[400px]" : "tw-max-h-[250px]"
                  }`}
                >
                  {JSON.stringify(certificate, null, 2)}
                </pre>

                <div className="tw-mt-6 tw-flex tw-gap-3 tw-flex-wrap">
                  <button
                    className="btn !tw-bg-[#0052FF] !tw-text-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-all tw-shadow-lg disabled:tw-opacity-50 disabled:tw-cursor-not-allowed"
                    disabled={!walletConnected}
                    title={
                      !walletConnected
                        ? "Connect wallet first"
                        : "Mint to Base Network"
                    }
                  >
                    <i className="bi bi-coin" />
                    <span>Mint to Base</span>
                  </button>
                  <button
                    onClick={copyJSON}
                    className="btn !tw-bg-transparent !tw-border-[1px] !tw-border-black dark:!tw-border-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-all"
                  >
                    <i className="bi bi-clipboard" />
                    <span>Copy JSON</span>
                  </button>
                  <button
                    onClick={downloadJSON}
                    className="btn !tw-bg-transparent !tw-border-[1px] !tw-border-black dark:!tw-border-white tw-flex tw-gap-2 hover:tw-scale-105 tw-transition-all"
                  >
                    <i className="bi bi-download" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PROMPT FORM */}
          <div className="tw-flex-shrink-0 tw-border-t dark:tw-border-gray-800 tw-bg-white dark:tw-bg-black">
            <form
              onSubmit={handleGenerate}
              className={`tw-w-full tw-bg-[#f3f4f6] dark:tw-bg-[#171717] tw-p-3 tw-border tw-border-gray-200 dark:tw-border-gray-800 tw-rounded-t-lg ${
                isFullscreen ? "tw-max-w-4xl tw-mx-auto tw-shadow-lg" : ""
              }`}
            >
              <div className="tw-flex tw-gap-3 tw-place-items-center tw-justify-between tw-w-full tw-text-xs tw-text-gray-500 dark:tw-text-gray-400 tw-px-2 tw-pb-3 tw-border-b tw-border-gray-200 dark:tw-border-gray-700 tw-mb-3">
                <div className="tw-flex tw-gap-2 tw-place-items-center tw-flex-wrap">
                  <Image
                    src="/assets/images/base.png"
                    alt="Base Network"
                    width={14}
                    height={14}
                    className="tw-flex-shrink-0"
                  />
                  <span className="tw-text-gray-700 dark:tw-text-gray-300 tw-font-semibold tw-whitespace-nowrap">
                    {currentMode === "base-chat"
                      ? "0.000001 ETH/msg"
                      : "0.000003 ETH"}
                  </span>
                  {currentMode !== "base-chat" && (
                    <span className="tw-text-gray-400">≈ $0.01</span>
                  )}
                </div>

                {/* Mobile Mode Selector */}
                <div className="tw-relative lg:tw-hidden" ref={mobileSelectRef}>
                  <button
                    type="button"
                    onClick={() => setShowMobileSelect(!showMobileSelect)}
                    className="tw-flex tw-gap-2 tw-place-items-center tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-border tw-border-blue-200 dark:tw-border-blue-800 tw-transition-all hover:tw-shadow-md"
                  >
                    <div className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-500 tw-animate-pulse tw-flex-shrink-0" />
                    <span className="tw-text-xs tw-font-medium">
                      {MODES[currentMode].name}
                    </span>
                    <i
                      className={`bi bi-chevron-down tw-text-xs tw-transition-transform tw-duration-200 ${
                        showMobileSelect ? "tw-rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showMobileSelect && (
                    <div className="tw-absolute tw-bottom-full tw-right-0 tw-mb-2 tw-bg-white dark:tw-bg-[#17181B] tw-rounded-lg tw-shadow-xl tw-border dark:tw-border-gray-700 tw-py-2 tw-min-w-[200px] tw-z-50 tw-animate-in tw-fade-in tw-slide-in-from-bottom-2 tw-duration-200">
                      {Object.entries(MODES).map(
                        ([key, mode]: [string, any]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setCurrentMode(key)}
                            className={`tw-w-full tw-text-left tw-px-4 tw-py-3 tw-flex tw-gap-3 tw-items-center tw-transition-colors ${
                              currentMode === key
                                ? "tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-text-blue-600 dark:tw-text-blue-400"
                                : "hover:tw-bg-gray-100 dark:hover:tw-bg-gray-800"
                            }`}
                          >
                            <i className={`bi ${mode.icon}`} />
                            <span className="tw-text-sm tw-font-medium">
                              {mode.name}
                            </span>
                            {currentMode === key && (
                              <i className="bi bi-check2 tw-ml-auto tw-text-blue-500" />
                            )}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Desktop Mode Indicator */}
                <div className="max-lg:tw-hidden tw-flex tw-gap-2 tw-place-items-center tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-blue-50 dark:tw-bg-blue-900/20 tw-border tw-border-blue-200 dark:tw-border-blue-800">
                  <div className="tw-w-1.5 tw-h-1.5 tw-rounded-full tw-bg-blue-500 tw-animate-pulse tw-flex-shrink-0" />
                  <span className="tw-text-xs tw-font-medium">
                    {MODES[currentMode].name}
                  </span>
                </div>
              </div>

              <div className="tw-flex tw-w-full tw-gap-2 tw-place-items-center tw-bg-white dark:tw-bg-black tw-rounded-lg tw-p-1 tw-border tw-border-gray-300 dark:tw-border-gray-700 focus-within:tw-border-blue-500 focus-within:tw-ring-2 focus-within:tw-ring-blue-500/20 tw-transition-all">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={MODES[currentMode].placeholder}
                  className="tw-p-3 !tw-outline-none tw-bg-transparent tw-border-none tw-w-full tw-placeholder-gray-500 dark:tw-placeholder-gray-400 tw-text-base max-md:tw-text-sm"
                  //   DISABLE INPUT WHEN TYPING
                  disabled={isGenerating || isThinking || isTyping}
                  required
                  maxLength={500}
                  aria-label="Enter your prompt"
                />

                {/*   DISABLE SEND BUTTON WHEN TYPING */}
                <button
                  type="submit"
                  disabled={
                    isGenerating || isThinking || !prompt.trim() || isTyping
                  }
                  className="btn !tw-bg-[#6366f1] !tw-p-3 !tw-px-4 !tw-text-white !tw-rounded-lg tw-flex tw-gap-2 tw-place-items-center tw-transition-all tw-duration-300 hover:tw-scale-105 hover:tw-shadow-lg tw-flex-shrink-0 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:hover:tw-scale-100"
                  title={
                    isTyping
                      ? "Waiting for AI to finish typing..."
                      : isGenerating || isThinking
                      ? "Processing..."
                      : "Send"
                  }
                  aria-label={
                    isTyping
                      ? "Waiting for AI response"
                      : isGenerating || isThinking
                      ? "Processing"
                      : "Send message"
                  }
                >
                  <i
                    className={`bi ${
                      isGenerating || isThinking || isTyping
                        ? "bi-hourglass-split tw-animate-spin"
                        : "bi-arrow-up"
                    } tw-text-lg`}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
