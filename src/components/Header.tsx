"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("color-mode") === "dark" ||
      (!localStorage.getItem("color-mode") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("tw-dark");
    }

    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setNavDropdownOpen(false);
      }
    };

    if (navDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDropdownOpen]);

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

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

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

  // Desktop: Hover handlers
  const handleMouseEnter = () => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setNavDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setNavDropdownOpen(false);
    }, 200);
  };

  // Mobile: Click handler
  const handleMobileClick = () => {
    if (!isMobile) return;
    setNavDropdownOpen(!navDropdownOpen);
  };

  const handleMenuItemClick = () => {
    setNavDropdownOpen(false);
  };

  const menuItems = [
    {
      icon: "bi-book-fill",
      title: "Documentation",
      description: "Complete guide to create and mint certificates",
      href: "#docs",
    },
    {
      icon: "bi-file-code-fill",
      title: "Smart Contract",
      description: "View our verified smart contract on Base",
      href: "#smart-contract",
    },
    {
      icon: "bi-question-circle-fill",
      title: "FAQ",
      description: "Common questions and answers",
      href: "#faq",
    },
    {
      icon: "bi-github",
      title: "GitHub",
      description: "Open source code and contributions",
      href: "https://github.com/ProofBaseAI",
      external: true,
    },
    {
      icon: "bi-people-fill",
      title: "Community",
      description: "Join our Discord and Telegram",
      href: "#community",
    },
    {
      icon: "bi-shield-check",
      title: "Base Explorer",
      description: "Verify certificates on Base Network",
      href: "https://basescan.org",
      external: true,
    },
  ];

  return (
    <header className="lg:tw-px-4 tw-max-w-[100vw] max-lg:tw-top-0 tw-fixed tw-top-4 lg:tw-left-1/2 lg:tw--translate-x-1/2 tw-z-20 tw-flex tw-h-[60px] tw-w-full tw-text-gray-700 tw-bg-white dark:tw-text-gray-200 dark:tw-bg-[#17181b] tw-px-[3%] tw-rounded-md lg:tw-max-w-5xl tw-shadow-md dark:tw-shadow-gray-700 lg:tw-justify-between lg:!tw-backdrop-blur-lg lg:tw-opacity-[0.99]">
      {/* Logo */}
      <a className="tw-flex tw-p-[4px] tw-gap-2 tw-place-items-center" href="#">
        <div className="tw-h-[50px] tw-w-[50px]">
          <Image
            src="/assets/logo/logo.png"
            alt="ProofBaseAI Generator"
            width={50}
            height={50}
            className="tw-object-contain tw-h-full tw-w-full dark:tw-invert"
          />
        </div>
      </a>

      {/* Navigation */}
      <div
        className={`collapsible-header animated-collapse ${
          isOpen
            ? "max-lg:!tw-opacity-100 max-lg:tw-visible"
            : "max-lg:tw-opacity-0 max-lg:tw-invisible"
        }`}
        style={{
          height: isOpen ? "calc(100vh - 60px)" : "",
          maxHeight: isOpen ? "100vh" : "",
        }}
      >
        <nav className="tw-relative tw-flex tw-h-full max-lg:tw-h-max tw-w-max tw-gap-5 tw-text-base max-lg:tw-mt-[30px] max-lg:tw-flex-col max-lg:tw-gap-5 tw-place-items-center max-lg:tw-w-full max-lg:tw-px-6">
          <a
            className="header-links max-lg:tw-w-full max-lg:tw-text-center max-lg:tw-py-2"
            href="#features"
          >
            Features
          </a>
          <a
            className="header-links max-lg:tw-w-full max-lg:tw-text-center max-lg:tw-py-2"
            href="#how-it-works"
          >
            How it Works
          </a>

          {/* Dropdown Resources */}
          <div
            ref={dropdownRef}
            className="tw-relative tw-flex tw-flex-col tw-place-items-center max-lg:tw-w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={handleMobileClick}
              className="max-lg:tw-w-full tw-flex header-links tw-gap-1 tw-place-items-center tw-cursor-pointer max-lg:tw-justify-between max-lg:tw-py-2"
              id="nav-dropdown-toggle-0"
            >
              <span>Resources</span>
              {/* Chevron only on mobile */}
              <i
                className={`lg:tw-hidden tw-text-sm bi bi-chevron-down tw-transition-transform tw-duration-200 ${
                  navDropdownOpen ? "tw-rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {navDropdownOpen && (
              <nav
                id="nav-dropdown-list-0"
                className={`
                  tw-bg-white dark:tw-bg-[#17181B] tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-z-50
                  lg:tw-fixed lg:tw-top-[80px] lg:tw-left-1/2 lg:tw--translate-x-1/2 lg:tw-w-[800px] lg:tw-p-4
                  max-lg:tw-relative max-lg:tw-w-full max-lg:tw-mt-2 max-lg:tw-p-2
                `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="lg:tw-grid lg:tw-grid-cols-2 lg:tw-gap-2 max-lg:tw-flex max-lg:tw-flex-col max-lg:tw-gap-1 tw-w-full">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      className={`
                        header-links tw-flex tw-text-left tw-gap-3 tw-rounded-lg tw-transition-colors
                        lg:!tw-p-4 lg:hover:tw-bg-gray-50 lg:dark:hover:tw-bg-[#1f1f1f]
                        max-lg:!tw-p-3 max-lg:active:tw-bg-gray-100 max-lg:dark:active:tw-bg-gray-800
                      `}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener" : undefined}
                      onClick={handleMenuItemClick}
                    >
                      <div className="tw-font-semibold lg:tw-text-3xl max-lg:tw-text-xl tw-text-blue-500 dark:tw-text-blue-400 tw-flex-shrink-0">
                        <i className={`bi ${item.icon}`} />
                      </div>
                      <div className="tw-flex tw-flex-col tw-gap-1">
                        <div className="lg:tw-text-lg max-lg:tw-text-base tw-text-black dark:tw-text-white tw-font-medium">
                          {item.title}
                        </div>
                        <p className="lg:tw-text-sm max-lg:tw-text-xs tw-text-gray-600 dark:tw-text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="lg:tw-ml-auto tw-flex tw-place-items-center tw-gap-[20px] tw-text-base max-lg:tw-w-full max-lg:tw-flex-col max-lg:tw-place-content-center max-lg:tw-mt-auto max-lg:tw-pt-6 max-lg:tw-pb-8 max-lg:tw-border-t max-lg:dark:tw-border-gray-800">
          <button
            onClick={toggleTheme}
            className="header-links tw-text-gray-600 dark:tw-text-gray-300 tw-p-2 tw-rounded-lg max-lg:active:tw-bg-gray-100 max-lg:dark:active:tw-bg-gray-800"
            title="Toggle theme"
            id="theme-toggle"
          >
            <i className={`bi ${isDark ? "bi-moon" : "bi-sun"} tw-text-xl`} />
          </button>

          {walletConnected ? (
            <div
              id="wallet-status"
              className="tw-flex tw-gap-2 tw-place-items-center tw-px-3 tw-py-2 tw-rounded-md tw-bg-gray-100 dark:tw-bg-[#171717]"
            >
              <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-green-500" />
              <span id="wallet-address" className="tw-text-sm tw-font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                id="disconnect-wallet"
                className="tw-text-xs tw-underline tw-text-gray-600 dark:tw-text-gray-400 lg:hover:tw-text-red-500 max-lg:active:tw-text-red-500"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              id="connect-wallet-header"
              className="btn tw-flex tw-gap-2 tw-px-4 tw-py-2 max-lg:tw-w-full max-lg:tw-justify-center lg:hover:tw-translate-x-2 tw-transition-transform tw-duration-300"
            >
              <i className="bi bi-wallet2" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Toggle (2-line hamburger) */}
      <button
        className="tw-absolute tw-right-3 tw-top-3 tw-z-50 tw-flex tw-flex-col tw-gap-1.5 tw-w-8 tw-h-8 tw-justify-center tw-items-center lg:tw-hidden tw-p-1"
        onClick={() => setIsOpen(!isOpen)}
        id="collapse-btn"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          // Close icon (X)
          <div className="tw-relative tw-w-6 tw-h-6">
            <span className="tw-absolute tw-top-1/2 tw-left-0 tw-w-full tw-h-0.5 tw-bg-gray-700 dark:tw-bg-gray-300 tw-rotate-45 tw-transform tw--translate-y-1/2 tw-transition-transform tw-duration-300" />
            <span className="tw-absolute tw-top-1/2 tw-left-0 tw-w-full tw-h-0.5 tw-bg-gray-700 dark:tw-bg-gray-300 tw--rotate-45 tw-transform tw--translate-y-1/2 tw-transition-transform tw-duration-300" />
          </div>
        ) : (
          // 2-line hamburger
          <>
            <span className="tw-block tw-w-6 tw-h-0.5 tw-bg-gray-700 dark:tw-bg-gray-300 tw-transition-transform tw-duration-200" />
            <span className="tw-block tw-w-6 tw-h-0.5 tw-bg-gray-700 dark:tw-bg-gray-300 tw-transition-transform tw-duration-200" />
          </>
        )}
      </button>
    </header>
  );
}
