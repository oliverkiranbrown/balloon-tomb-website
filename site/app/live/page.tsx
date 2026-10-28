import Image from "next/image";
import PageHeading from "@/components/page_heading";
import { formatDate, gigs, isUpcoming } from "@/app/lib/gigs";

// Split depends on today's date, so re-evaluate hourly instead of at build time.
export const revalidate = 3600;

export default function LivePage() {
    const upcoming = gigs.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
    const previous = gigs.filter((gig) => !isUpcoming(gig)).sort((a, b) => b.date.localeCompare(a.date));

    return (
        <div className="text-white max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-16">
            <PageHeading title="Live" />

            {/* Upcoming */}
            <section>
                <h2 className="text-xl font-bold mb-8">Upcoming Gigs</h2>

                {upcoming.length === 0 ? (
                    <p className="text-xs text-white/50 leading-loose">
                        Nothing planned as of yet...
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
                                        {gig.city}<br />{formatDate(gig)}
                                    </p>
                                    {gig.ticketUrl && (
                                        <a
                                            href={gig.ticketUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] text-pink-400 hover:text-pink-300 underline underline-offset-4 transition-colors duration-200"
                                        >
                                            Get tickets
                                        </a>
                                    )}
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
                                <p className="text-[10px] text-white/50 leading-loose">{formatDate(gig)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
