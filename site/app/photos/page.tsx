"use client";

import Image from "next/image";
import { useState } from "react";

interface Photo {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  span: 1 | 2;
  tapePosition: "left" | "center" | "right";
}

const photos: Photo[] = [
  {
    src: "/gallery/full-band-action-thunderbolt.jpg",
    alt: "Full band at The Thunderbolt, November 2025",
    caption: "Thunderbolt\nJan '26",
    rotate: -1.5,
    span: 2,
    tapePosition: "center",
  },
  {
    src: "/gallery/taylor-bass.jpg",
    alt: "Taylor on bass",
    caption: "Taylor\nThekla April '26",
    rotate: 1.5,
    span: 1,
    tapePosition: "center",
  },
  {
    src: "/gallery/oli-portrait.jpg",
    alt: "Oli",
    caption: "Oli",
    rotate: 2.5,
    span: 1,
    tapePosition: "right",
  },
  {
    src: "/gallery/marcus-portrait.jpg",
    alt: "Marcus",
    caption: "Marcus",
    rotate: -2,
    span: 1,
    tapePosition: "left",
  },
  {
    src: "/gallery/damian-portrait.jpg",
    alt: "Damian",
    caption: "Damian",
    rotate: -3,
    span: 1,
    tapePosition: "right",
  },
  {
    src: "/gallery/marcus-taylor-action-shot-thekla.jpg",
    alt: "Marcus and Taylor at Thekla, April 2026",
    caption: "Thekla\nApr '26",
    rotate: 2,
    span: 2,
    tapePosition: "left",
  },
  {
    src: "/gallery/taylor-portrait.jpg",
    alt: "Taylor",
    caption: "Taylor",
    rotate: -1.5,
    span: 1,
    tapePosition: "center",
  },
  {
    src: "/gallery/full-band-sandwich.jpg",
    alt: "Full band",
    caption: "pre-show\nritual",
    rotate: 3,
    span: 1,
    tapePosition: "left",
  },
  {
    src: "/gallery/thekla-full-band-far-away.jpg",
    alt: "Full band at Thekla, April 2026",
    caption: "Thekla\nApr '26",
    rotate: -2.5,
    span: 2,
    tapePosition: "right",
  },
  {
    src: "/gallery/marcus-action-shot-frontman.jpg",
    alt: "Marcus on stage at The Fleece",
    caption: "The Fleece\nJul '25",
    rotate: 1,
    span: 1,
    tapePosition: "center",
  },
];

function getTapeLeft(pos: Photo["tapePosition"]): string {
  if (pos === "left") return "12%";
  if (pos === "center") return "calc(50% - 28px)";
  return "calc(80% - 28px)";
}

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      style={{
        transform: hovered
          ? `rotate(${photo.rotate * 0.08}deg) translateY(-16px) scale(1.03)`
          : `rotate(${photo.rotate}deg)`,
        // ease-out-quart: smooth deceleration, no overshoot
        transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: hovered ? 20 : 1,
        animation: `photoEnter 0.6s ease-out ${index * 80}ms backwards`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setTimeout(() => setHovered(false), 800)}
    >
      {/* Tape strip */}
      <div
        className="absolute z-10"
        style={{
          top: -13,
          left: getTapeLeft(photo.tapePosition),
          width: 56,
          height: 22,
          background: "oklch(0.96 0.018 85 / 0.52)",
          transform: hovered ? "scaleX(0.88) rotate(-1deg)" : "scaleX(1) rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
      />

      {/* Polaroid frame */}
      <div
        className="relative"
        style={{
          background: "oklch(0.975 0.006 60)",
          padding: "8px 8px 52px",
          boxShadow: hovered
            ? "10px 16px 40px oklch(0 0 0 / 0.9)"
            : "3px 5px 16px oklch(0 0 0 / 0.6)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Scanline overlay on hover */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: "8px 8px 52px",
              background:
                "repeating-linear-gradient(transparent, transparent 3px, oklch(0 0 0 / 0.06) 3px, oklch(0 0 0 / 0.06) 4px)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        )}

        {/* Image container with fixed aspect ratio for <Image fill> */}
        <div className="relative w-full" style={{ aspectRatio: "3 / 2" }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            loading="lazy"
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* Caption */}
        <p
          className="absolute whitespace-pre-line"
          style={{
            bottom: 10,
            left: 10,
            fontFamily: "'PressStart2P', sans-serif",
            fontSize: "6px",
            lineHeight: 2,
            color: "oklch(0.22 0 0)",
            opacity: hovered ? 1 : 0.55,
            transition: "opacity 0.25s ease",
          }}
        >
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

export default function PhotosPage() {
  return (
    <>
      <style>{`
        @keyframes photoEnter {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0%, 88%, 100% {
            transform: none;
            color: oklch(0.97 0.005 60);
            text-shadow: none;
          }
          89% {
            transform: translateX(-3px);
            color: oklch(0.65 0.28 0);
            text-shadow: 3px 0 oklch(0.97 0.005 60);
          }
          90% {
            transform: translateX(3px);
            color: oklch(0.97 0.005 60);
            text-shadow: -3px 0 oklch(0.65 0.28 0);
          }
          91% {
            transform: none;
            text-shadow: none;
          }
        }
      `}</style>

      <div
        className="min-h-screen px-4 pb-24"
        style={{
          backgroundColor: "oklch(0.08 0.008 30)",
          backgroundImage:
            "radial-gradient(oklch(0.14 0.008 30) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          overflowX: "clip",
        }}
      >
        {/* Header */}
        <header className="pt-12 pb-16 text-center">
          <h1
            style={{
              fontFamily: "'PressStart2P', sans-serif",
              fontSize: "clamp(1.1rem, 3.5vw, 1.75rem)",
              color: "oklch(0.97 0.005 60)",
              letterSpacing: "0.15em",
              display: "inline-block",
              animation: "glitch 9s infinite",
            }}
          >
            PHOTOS
          </h1>
          <div
            className="flex items-center justify-center mt-5"
            style={{ gap: 14 }}
          >
            <span
              style={{
                height: 1,
                width: 48,
                display: "block",
                background: "oklch(0.65 0.28 0)",
              }}
            />
            <p
              style={{
                fontFamily: "'PressStart2P', sans-serif",
                fontSize: "7px",
                color: "oklch(0.65 0.28 0)",
                letterSpacing: "0.08em",
              }}
            >
              plz don't shout back
            </p>
            <span
              style={{
                height: 1,
                width: 48,
                display: "block",
                background: "oklch(0.65 0.28 0)",
              }}
            />
          </div>
        </header>

        {/* Photo grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
          style={{ gap: "72px 52px", gridAutoFlow: "dense" }}
        >
          {photos.map((photo, i) => (
            <div
              key={i}
              className={photo.span === 2 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <PhotoCard photo={photo} index={i} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-24"
          style={{
            fontFamily: "'PressStart2P', sans-serif",
            fontSize: "10px",
            color: "oklch(0.65 0.28 0)",
            letterSpacing: "0.4em",
          }}
        >
          ★ &nbsp; ★ &nbsp; ★
        </div>
      </div>
    </>
  );
}
