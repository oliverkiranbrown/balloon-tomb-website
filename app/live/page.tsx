export default function LivePage() {
    const upcoming = [
        {
            date: "May 2nd, 2025",
            venue: "The Fleece",
            city: "Bristol",
        },
        {
            date: "May 19nd, 2025",
            venue: "The Ratrace",
            city: "Bristol",
        }
    ];

    const previous = [
        {
            poster: "/posters/thunderbolt-nov-2025.jpg",
            date: "November 19th, 2025",
            venue: "The Thunderbolt",
        },
        {
            poster: "/posters/the-fleece-july-2025.jpg",
            date: "July 20th, 2025",
            venue: "The Fleece",
        }
    ];
    
    return (
        <div className="p-6 text-black max-w-5xl mx-auto space-y-12">
            {/* UPCOMING GIGS */}
            <section>
                <h1 className="text-4xl font-bold mb-4">Upcoming Gigs</h1>

                {upcoming.length === 0 && (
                    <p className="text-gray-400">No gigs announced. We are asleep.</p>
                )}

                <ul className="space-y-3">
                    {upcoming.map((gig, index) => (
                        <li 
                            key={index} 
                            className="border-l-4 border-pink-500 pl-4 py-2 bg-black/40"
                        >
                            <p className="text-xl font-semibold">
                                {gig.venue} - {gig.city} - {gig.date}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
            
            {/* PREVIOUS GIGS */}
            <section>
                <h2 className="text-3x1 font-bold mb-4">
                    Previous Gigs
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {previous.map((gig, index) => (
                        <div 
                            key={index} 
                            className="flex-shrink-0 w-90 bg-black border border-white rounded-lg p-2"
                        >
                            <div className="w-full h-140 bg-black overflow-hidden rounded">
                                <img 
                                    src={gig.poster}
                                    alt={`Gig Poster ${index+1}`}
                                    className="w-full h-full object-cover"
                                />    
                            </div>    
                        </div>
                    ))}
                </div>
            </section>

            
        </div>
    );
}