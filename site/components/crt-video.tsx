"use client";

import Image from "next/image";
import { useState } from "react";

type CrtVideoProps = {
  videoId: string;
  title: string;
};

export default function CrtVideo({ videoId, title }: CrtVideoProps) {
  const [playing, setPlaying] = useState(false);

  // `group` only exists while the still is showing, so the hover
  // treatment switches itself off once the video is running.
  return (
    <div className={`relative w-full max-w-3xl ${playing ? "" : "group"}`}>
      {/* Pink neon bleeding out from behind the cabinet */}
      <div className="crt-glow" aria-hidden="true" />

      {/* Cabinet */}
      <div
        className="
          relative border-4 border-white/30 bg-black p-2.5 sm:p-4
          shadow-[6px_6px_0px_0px_white]
          transition-colors duration-300
          group-hover:border-pink-500
          group-hover:shadow-[6px_6px_0px_0px_theme(colors.pink.500)]
        "
      >
        {/* Screen */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={`Balloon Tomb — ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{ animation: "fadeSlideIn 0.45s ease-out both" }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 h-full w-full cursor-pointer"
              aria-label={`Play ${title}`}
            >
              <Image
                src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="crt-poster object-cover"
              />

              {/* Tube texture — sits over the still only, so playback stays clean */}
              <span className="crt-flicker" aria-hidden="true" />
              <span className="crt-sweep" aria-hidden="true" />
              <span className="crt-vignette" aria-hidden="true" />

              {/* Chunky arcade button */}
              <span className="absolute inset-0 flex items-center justify-center">
                <span
                  className="
                    crt-play flex h-16 w-16 items-center justify-center
                    border-[3px] border-pink-400 bg-black/70
                    font-['PressStart2P'] text-base text-pink-400
                    shadow-[5px_5px_0px_0px_theme(colors.pink.500)]
                    transition-all duration-150
                    group-hover:bg-pink-500 group-hover:text-black
                    sm:h-24 sm:w-24 sm:text-2xl
                  "
                >
                  ▶
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
