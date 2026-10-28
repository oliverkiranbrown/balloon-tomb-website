import Image from "next/image";

import PageHeading from "@/components/page_heading";

/* Rolls through the departure-board ticker beneath the tee photo. */
const tickerItems = ["Balloon Tomb", "Walking Fish Tee"];

const teeSpecs: { text: string; link?: { href: string; label: string } }[] = [
  { text: "Hand-printed by us!" },
  { text: "Recycled from charity shops" },
  { text: "Limitted runs" },
  { text: "Only at gigs:", link: { href: "/live", label: "Dates" } },
];

export default function MerchPage() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── THE TEE ── */}
      <section className="mx-auto w-full max-w-4xl">

        {/* Title card */}
        <div className="px-4 pt-10 sm:pt-14">
          <PageHeading title="Merch" />
        </div>

        {/* Front and centre */}
        <div
          className="
            relative
            aspect-[5/4] sm:aspect-[3/2]
            border-2 border-white/30
            shadow-[4px_4px_0px_0px_white]
            hover:-translate-y-1
            hover:border-pink-500
            hover:shadow-[4px_4px_0px_0px_theme(colors.pink.500)]
            transition-all duration-200
            overflow-hidden
          "
        >
          <Image
            src="/merch/walking-fish-tee.png"
            alt="Balloon Tomb walking fish tee, photographed against a train departures board"
            fill
            priority
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover object-center"
          />
        </div>

        {/* The small print */}
        <ul className="mt-6 grid grid-cols-1 gap-px border-y border-white/10 bg-white/10 sm:grid-cols-2">
          {teeSpecs.map((spec) => (
            <li
              key={spec.text}
              className="bg-black px-4 py-5 font-vt323 text-lg leading-relaxed text-white/80 sm:px-6 sm:text-xl"
            >
              {spec.text}{" "}
              {spec.link && (
                <a
                  href={spec.link.href}
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                >
                  {spec.link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

      </section>

      {/* ── OTHER STUFF ── */}
      <div className="mx-auto max-w-2xl px-4 pt-20 pb-8 sm:pb-12">
        <section>
          <h2 className="text-sm font-bold mb-6 text-white/50">Also.</h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-36 shrink-0 border-2 border-white/20 overflow-hidden">
              <div className="relative aspect-[9/16]">
                <Image
                  src="/merch/sticker-bottle.jpg"
                  alt="Balloon Tomb stickers"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 144px"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <p className="text-[10px] text-white/60 leading-loose">Stickers.</p>
              <p className="text-[10px] text-white/60 leading-loose">Temporary tattoos.</p>
              <p className="text-[10px] text-white/60 leading-loose">Limited edition shit!</p>
              <p className="text-[10px] leading-loose text-white/80">
                Come see us to grab some:{" "}
                <a
                  href="/live"
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                >
                  Dates
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
