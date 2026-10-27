import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Streaming — Balloon Tomb",
  description:
    "Listen to Balloon Tomb on Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, Tidal, Qobuz and YouTube.",
};

type Platform = {
  name: string;
  href: string;
  free?: boolean;
};

const platforms: Platform[] = [
  { name: "Spotify", href: "https://open.spotify.com/artist/1xTjODtfZg9q1z1jKZAEmh", free: true },
  { name: "Apple Music", href: "https://music.apple.com/gb/artist/balloon-tomb/1892446996" },
  { name: "YouTube Music", href: "https://music.youtube.com/channel/UCJBi4-7gBJXc2iVENSPu4oA", free: true },
  { name: "Amazon Music", href: "https://music.amazon.co.uk/artists/B0GWS1LW43", free: true },
  { name: "Deezer", href: "https://www.deezer.com/artist/384667951", free: true },
  { name: "Tidal", href: "https://tidal.com/artist/77708402" },
  { name: "Qobuz", href: "https://www.qobuz.com/gb-en/label/balloon-tomb/download-streaming-albums/10224632" },
  { name: "YouTube", href: "https://www.youtube.com/@BalloonTomb", free: true },
];

export default function StreamingPage() {
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

      <div className="relative z-0 flex flex-col items-center px-6 py-16 sm:py-20">
        {/* Title block */}
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-5">
          ★ ★ ★
        </p>
        <h1 className="font-['PressStart2P'] text-base leading-loose text-pink-400 uppercase tracking-widest mb-5 text-center">
          Streaming
        </h1>
        <p className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-16">
          ★ ★ ★
        </p>

        {/* Platform buttons */}
        <ul className="w-full max-w-md flex flex-col gap-5">
          {platforms.map((platform, i) => (
            <li
              key={platform.name}
              className="opacity-0"
              style={{
                animation: `fadeSlideIn 0.35s ease-out ${i * 80}ms forwards`,
              }}
            >
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center justify-between gap-3 p-4
                  border-2 border-white/25
                  hover:border-pink-500
                  hover:-translate-y-0.5
                  hover:shadow-[4px_4px_0px_0px_theme(colors.pink.500)]
                  focus-visible:outline-2 focus-visible:outline-pink-500
                  transition-all duration-200
                "
              >
                <span className="font-['PressStart2P'] text-[10px] tracking-wide text-white group-hover:text-pink-400 transition-colors duration-200">
                  {platform.name}
                </span>

                <span className="flex items-center gap-3 shrink-0">
                  {platform.free && (
                    <span className="font-['PressStart2P'] text-[7px] tracking-widest text-black bg-pink-400 px-2 py-1">
                      FREE
                    </span>
                  )}
                  <span
                    className="font-['PressStart2P'] text-[8px] text-pink-400 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    ▶
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
