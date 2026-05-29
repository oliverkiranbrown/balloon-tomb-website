import Image from "next/image";

export default function MerchPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">

        {/* ── TEES ── */}
        <section className="mb-20">
          <h2 className="text-xl font-bold mb-10">Tees</h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10">
            <div
              className="
                w-full lg:w-[55%] shrink-0
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
                alt="Balloon Tomb walking fish tee"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center gap-5">
              <p className="text-[10px] leading-loose text-white/80">
                Hand-printed by us!
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Recycled from charity shops
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Limitted runs
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Only at gigs: {" "}
                <a
                  href="/live"
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                >
                  Dates
                </a>
              </p>
            </div>
          </div>

          <div className="border-2 border-white/20 overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/merch/merch-drying.jpg"
                alt="Freshly printed tees drying"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 672px"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* ── OTHER STUFF ── */}
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
