"use client";

import { useEffect, useState, useRef } from "react";

interface TypingAnimationProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
}

export function TypingAnimation({
  text,
  speed = 30,
  onComplete,
  containerRef,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // ==================== TYPING EFFECT ====================
  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && text.length > 0) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  // ==================== AUTO-SCROLL WHILE TYPING ====================
  useEffect(() => {
    if (!containerRef?.current || !elementRef.current) return;

    const scrollToNewText = () => {
      const container = containerRef.current;
      if (!container) return;

      const messageElement = elementRef.current;
      if (!messageElement) return;

      const messageBottom = messageElement.getBoundingClientRect().bottom;
      const containerBottom = container.getBoundingClientRect().bottom;

      // If message goes below visible area, scroll down smoothly
      if (messageBottom > containerBottom - 20) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    scrollToNewText();
  }, [displayedText, containerRef]);

  return (
    <div ref={elementRef} className="tw-leading-relaxed tw-whitespace-pre-line">
      {displayedText}
      {!isComplete && (
        <span className="tw-inline-block tw-w-2 tw-h-5 tw-ml-1 tw-bg-current tw-animate-pulse" />
      )}
    </div>
  );
}
