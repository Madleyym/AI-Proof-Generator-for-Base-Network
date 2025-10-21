"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import {
  BuildOnBaseSection,
  WhyChooseSection,
  CategoriesSection,
  KeyFeaturesSection,
  FAQSection,
  CTASection,
  NewsletterSection,
  Footer,
} from "@/components/Sections";

export default function Home() {
  useEffect(() => {
    console.log(
      "%cProofBaseAI Generator v2.0",
      "color: #6366f1; font-size: 20px; font-weight: bold;"
    );
    console.log(
      "%cPowered by Base Network | Built by @ProofBaseAI",
      "color: #666; font-size: 12px;"
    );
    console.log(
      "%cGitHub: https://github.com/ProofBaseAI",
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
