interface MarkdownContentProps {
  markdown: string;
}

function isStageDirection(line: string): boolean {
  return /^\(.*\)$/.test(line);
}

function isVerseMarker(line: string): boolean {
  return /^[Xx]?\d+$/.test(line);
}

export default function MarkdownContent({ markdown }: MarkdownContentProps) {
  const blocks = markdown
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="relative">
      {/* CRT scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="relative z-0 mx-auto max-w-xl px-6 py-12 text-center">
        {blocks.map((block, i) => {
          // Song title (h1 or h2)
          if (/^#{1,2} /.test(block)) {
            const text = block.replace(/^#{1,2} /, "");
            return (
              <div key={i} className="mb-16">
                <div className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mb-5">
                  ★ ★ ★
                </div>
                <h1 className="font-['PressStart2P'] text-base leading-loose text-pink-400 uppercase tracking-widest">
                  {text}
                </h1>
                <div className="font-['PressStart2P'] text-[9px] tracking-[0.5em] text-pink-400/50 mt-5">
                  ★ ★ ★
                </div>
              </div>
            );
          }

          const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

          return (
            <div key={i} className="mb-10">
              {lines.map((line, j) => {
                if (isVerseMarker(line)) {
                  return (
                    <div
                      key={j}
                      className="font-['PressStart2P'] text-[7px] text-white/20 tracking-[0.4em] uppercase mt-10 mb-4"
                    >
                      — {line} —
                    </div>
                  );
                }
                if (isStageDirection(line)) {
                  return (
                    <div
                      key={j}
                      className="font-vt323 text-2xl text-white/35 italic leading-tight"
                    >
                      {line}
                    </div>
                  );
                }
                return (
                  <div
                    key={j}
                    className="font-vt323 text-4xl text-white leading-snug"
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
