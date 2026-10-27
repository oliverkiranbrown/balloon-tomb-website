import type { Metadata } from "next";
import CrtVideo from "@/components/crt-video";

export const metadata: Metadata = {
  title: "Video — Balloon Tomb",
  description: "Watch Balloon Tomb music videos and live footage.",
};

const VIDEO = {
  id: "GgtR034ts0U",
  title: "Always Late",
};

export default function VideoPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* CRT scanlines across the whole page */}
      <div className="scanlines" aria-hidden="true" />

      <div className="relative flex flex-col items-center px-4 py-16 sm:px-6 sm:py-20">
        {/* Title block */}
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-5">
          ★ ★ ★
        </p>
        <h1 className="font-['PressStart2P'] text-base leading-loose text-pink-400 uppercase tracking-widest mb-5 text-center">
          Video
        </h1>
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-14">
          ★ ★ ★
        </p>

        <CrtVideo videoId={VIDEO.id} title={VIDEO.title} />

      </div>
    </div>
  );
}
