import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/pixelact-ui/dialog";

const members = [
  { name: "Damian", role: "plays guitar", gif: "/wanted/damian_rotated_pixelated.gif", rotate: "rotate-2"  },
  { name: "Marcus", role: "shouts",       gif: "/wanted/marcus_rotated_pixelated.gif", rotate: "-rotate-1" },
  { name: "Oli",    role: "plays drums",  gif: "/wanted/oli_rotated_pixelated.gif",    rotate: "rotate-1"  },
  { name: "Taylor", role: "plays bass",   gif: "/wanted/taylor_rotated_pixelated.gif", rotate: "-rotate-2" },
];

export default function ManifestoPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 lg:py-16">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
          Manifesto
        </h1>

        <p className="text-xs leading-loose mb-8">
          Punk isn&apos;t dead. It&apos;s alive in the sounds of Balloon Tomb...
        </p>

        <div className="mb-10 border-2 border-white/30 overflow-hidden">
          <Image
            src="/photos/circle_pixelated.jpg"
            alt="Balloon Tomb band photo"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 100vw, 672px"
            priority
          />
        </div>

        <p className="text-xs leading-loose mb-12">
          Balloon Tomb are a silly and loud bunch of four people. They make their
          sounds within the city of Bristol. They enjoy shouting about goblins,
          trains, and dating apps. Don&apos;t shout back at them or they may cry.
        </p>

        {/* Member cards — rotated like photos pinned to a wall */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {members.map((member) => (
            <div
              key={member.name}
              className={`
                flex flex-col items-center gap-3
                ${member.rotate}
                hover:rotate-0 hover:-translate-y-2
                transition-transform duration-200
                ease-out
              `}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs font-bold text-white hover:text-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors duration-200 rounded">
                    {member.name}
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>This is {member.name}</DialogTitle>
                  <DialogDescription>
                    He {member.role}.
                  </DialogDescription>
                </DialogContent>
              </Dialog>
              {/* unoptimized preserves GIF animation */}
              <Image
                src={member.gif}
                alt={member.name}
                width={300}
                height={380}
                unoptimized
                loading="lazy"
                className="w-full h-auto object-contain border-2 border-white/30 hover:border-pink-500 transition-colors duration-200"
              />
            </div>
          ))}
        </div>

        <p className="text-xs leading-loose mb-12">
          Checkout their silly words, socials and gigs, and submit ur worst dates n
          trains for us to yell about &mdash; much fun to come!
        </p>

      </div>

      {/* Full-width divider — intentionally outside the max-w container */}
      <Image
        src="/photos/line_pixelated.jpg"
        alt=""
        aria-hidden
        width={1920}
        height={300}
        className="w-full h-auto"
        sizes="100vw"
      />
    </div>
  );
}
