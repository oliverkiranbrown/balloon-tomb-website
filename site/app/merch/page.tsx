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
              <img
                src="/merch/walking-fish-tee.png"
                alt="Balloon Tomb walking fish tee"
                className="w-full object-contain"
              />
            </div>

            <div className="flex flex-col justify-center gap-5">
              <p className="text-[10px] leading-loose text-white/80">
                Hand printed by our frontman.
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Recycled charity shop tees.
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Art by our mates.
              </p>
              <p className="text-[10px] leading-loose text-white/80">
                Only at gigs.{" "}
                <a
                  href="/live"
                  className="text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                >
                  Dates.
                </a>
              </p>
            </div>
          </div>

          <div className="border-2 border-white/20 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src="/merch/merch-drying.jpg"
                alt="Freshly printed tees drying"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ── OTHER STUFF ── */}
        <section>
          <h2 className="text-sm font-bold mb-6 text-white/50">Also.</h2>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="sm:w-36 shrink-0 border-2 border-white/20 overflow-hidden">
              <img
                src="/merch/sticker-bottle.jpg"
                alt="Balloon Tomb stickers"
                loading="lazy"
                className="w-full aspect-[9/16] object-cover object-center"
              />
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
