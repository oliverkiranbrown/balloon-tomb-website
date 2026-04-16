"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?▓▒░█★☆";

const songs = [
  { title: "Always Late",      slug: "always_late" },
  { title: "New Docs",         slug: "new_docs" },
  { title: "Haddock Dad",      slug: "haddock_dad" },
  { title: "Goblin Dynasty",   slug: "goblin_dynasty" },
  { title: "Citrus Propoganda", slug: "cirtus_propoganda" },
  { title: "Pretty Mean",      slug: "pretty_mean" },
  { title: "Punk Fellowship",  slug: "punk_fellowship" },
];

function SongItem({
  title,
  slug,
  index,
}: {
  title: string;
  slug: string;
  index: number;
}) {
  const upper = title.toUpperCase();
  const [display, setDisplay] = useState(upper);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = useCallback(() => {
    let step = 0;
    const tick = () => {
      setDisplay(
        upper
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < step) return upper[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      step += 0.55;
      if (step < upper.length + 1) {
        timerRef.current = setTimeout(tick, 32);
      } else {
        setDisplay(upper);
      }
    };
    tick();
  }, [upper]);

  const handleEnter = () => {
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    scramble();
  };

  const handleLeave = () => {
    setActive(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplay(upper);
  };

  return (
    <li
      className="opacity-0"
      style={{
        animation: `fadeSlideIn 0.35s ease-out ${index * 110}ms forwards`,
      }}
    >
      <Link
        href={`lyrics/${slug}`}
        className="flex items-center gap-3 group select-none"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
      >
        <span
          className="font-['PressStart2P'] text-xs text-pink-400 transition-opacity duration-75"
          style={{ opacity: active ? 1 : 0 }}
          aria-hidden
        >
          ▶
        </span>
        <span
          className="font-['PressStart2P'] text-xs leading-loose tracking-wide transition-colors duration-75"
          style={{ color: active ? "#ffffff" : "#f472b6" }}
        >
          {display}
        </span>
      </Link>
    </li>
  );
}

export default function LyricsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* CRT scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="relative z-0 flex flex-col items-center px-8 py-16 text-center">
        {/* Title block */}
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-5">
          ★ ★ ★
        </p>
        <h1 className="font-['PressStart2P'] text-base leading-loose text-pink-400 uppercase tracking-widest mb-5">
          Lyrics
        </h1>
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-10">
          ★ ★ ★
        </p>

        {/* Blinking prompt */}
        <p
          className="font-['PressStart2P'] text-[8px] text-white/30 tracking-widest mb-14"
          style={{ animation: "blink 1.1s step-end infinite" }}
        >
          SELECT A SONG
        </p>

        {/* Song list */}
        <ul className="flex flex-col gap-6 text-left">
          {songs.map((song, i) => (
            <SongItem key={song.slug} {...song} index={i} />
          ))}
        </ul>

        {/* Footer */}
        <p className="mt-20 font-['PressStart2P'] text-[7px] text-white/15 tracking-widest">
          {songs.length} SONGS IN THE VAULT
        </p>
      </div>
    </div>
  );
}
