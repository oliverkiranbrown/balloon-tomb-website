'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/pixelact-ui/carousel";

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

            <section>
                <h1 className="text-4xl font-bold mb-4">
                    Previous Gigs
                </h1>
                <div className="flex justify-center ">
                    <Carousel className="max-w-md bg-black p-1">
                        <CarouselContent className="gap-4">
                            {previous.map((gig, index) => (
                            <CarouselItem key={index}> 
                                <div className="h-120 flex items-center justify-center">
                                    <span>
                                        <div className="w-80 h-full">
                                            <img 
                                                src={gig.poster}
                                                alt={`Gig Poster ${index+1}`}
                                                className="w-full h-full object-cover"
                                            />    
                                        </div> s
                                    </span>
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        
            
        </div>
        
    );
}