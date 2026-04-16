import Image from "next/image";

export default function LivePage() {

    const upcoming = [
        {
            poster: "/posters/O2-june-2026.jpeg",
            date: "Friday, 5th June 2026",
            venue: "O2 Academy",
            city: "Bristol",
            link: "https://www.fatsoma.com/e/2o97q2w0/the-underdog-2026-grand-final"
        },
    ];

    const previous = [
        {
            poster: "/posters/thunderbolt-nov-2025.jpg",
            date: "November 19th, 2025",
            venue: "The Thunderbolt",
            city: "Bristol",
        },
        {
            poster: "/posters/the-fleece-july-2025.jpg",
            date: "July 20th, 2025",
            venue: "The Fleece",
            city: "Bristol",
        },
        {
            poster: "/posters/thunderbolt-jan-2026.jpeg",
            date: "Saturday 24th Jan, 2026",
            venue: "The Thunderbolt",
            city: "Bristol",
        },
        {
            poster: "/posters/thekla-april-2026.jpeg",
            date: "Sunday 5th April, 2026",
            venue: "Thekla",
            city: "Bristol",
        },
    ];

    return (
        <div className="text-white max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-16">

            {/* Upcoming */}
            <section>
                <h2 className="text-xl font-bold mb-8">Upcoming Gigs</h2>

                {upcoming.length === 0 ? (
                    <p className="text-xs text-white/50 leading-loose">
                        No gigs announced. We are asleep.
                    </p>
                ) : (
                    <ul className="space-y-8">
                        {upcoming.map((gig, i) => (
                            <li key={i} className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-44 shrink-0">
                                    <div className="relative aspect-[3/4] overflow-hidden border-2 border-white/20">
                                        <Image
                                            src={gig.poster}
                                            alt={`${gig.venue} gig poster`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 176px"
                                            priority
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center gap-5">
                                    <p className="text-sm font-bold leading-loose">{gig.venue}</p>
                                    <p className="text-[10px] text-white/60 leading-loose">
                                        {gig.city}<br />{gig.date}
                                    </p>
                                    <a
                                        href={gig.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                                    >
                                        Get tickets
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Previous */}
            <section>
                <h2 className="text-xl font-bold mb-8">Previous Gigs</h2>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    {previous.map((gig, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="relative aspect-[3/4] overflow-hidden border-2 border-white/20">
                                <Image
                                    src={gig.poster}
                                    alt={`${gig.venue} gig poster`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 50vw, 320px"
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold leading-loose">{gig.venue}</p>
                                <p className="text-[10px] text-white/50 leading-loose">{gig.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
