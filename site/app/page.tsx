"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [glitching, setGlitching] = useState(false);
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const ambientRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const activeRef = useRef(false);

  const triggerGlitch = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    setGlitching(true);
    clearTimeout(resetRef.current);
    resetRef.current = setTimeout(() => {
      setGlitching(false);
      activeRef.current = false;
    }, 440);
  }, []);

  // Auto-glitch once on mount
  useEffect(() => {
    const t = setTimeout(triggerGlitch, 800);
    return () => {
      clearTimeout(t);
      clearTimeout(resetRef.current);
    };
  }, [triggerGlitch]);

  // Ambient recurring glitch — keeps the page alive on mobile where hover is absent.
  // Fires every 4–9s, randomised so it never feels mechanical.
  const scheduleAmbient = useCallback(() => {
    const delay = 4000 + Math.random() * 5000;
    ambientRef.current = setTimeout(() => {
      triggerGlitch();
      scheduleAmbient();
    }, delay);
  }, [triggerGlitch]);

  useEffect(() => {
    scheduleAmbient();
    return () => clearTimeout(ambientRef.current);
  }, [scheduleAmbient]);

  // Mobile tap: let the glitch play before navigating
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      triggerGlitch();
      setTimeout(() => router.push("/manifesto"), 320);
    },
    [triggerGlitch, router]
  );

  return (
    <div className="landing-root">
      {/* CRT scanline overlay */}
      <div className="scanlines" aria-hidden="true" />

      {/* Corner scan markers */}
      <span className="scan-mark scan-mark-tl" aria-hidden="true" />
      <span className="scan-mark scan-mark-br" aria-hidden="true" />

      {/* Logo — floats + glitches */}
      <a
        href="/manifesto"
        className="logo-float-wrap"
        onMouseEnter={triggerGlitch}
        onTouchStart={handleTouchStart}
        aria-label="Balloon Tomb — enter"
      >
        <div className={`glitch-wrap${glitching ? " glitching" : ""}`}>
          {/* Base layer */}
          <img
            src="/logos/fish.png"
            alt="Balloon Tomb"
            className="logo-img"
            draggable={false}
            width={900}
            height={900}
          />
          {/* Pink channel slice */}
          <img
            //src="/logos/balloon-tomb-dark.jpg"
            src="/logos/fish.png"
            alt=""
            aria-hidden="true"
            className="glitch-layer layer-a"
            draggable={false}
            width={900}
            height={900}
          />
          {/* Bright white slice */}
          <img
            //src="/logos/balloon-tomb-dark.jpg"
            src="/logos/fish.png"
            alt=""
            aria-hidden="true"
            className="glitch-layer layer-b"
            draggable={false}
            width={900}
            height={900}
          />
        </div>
      </a>
    </div>
  );
}
