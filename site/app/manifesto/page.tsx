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
            //src="/photos/full-low_pixelated.jpg"
            src="/photos/full-even_pixelated.jpg"
            alt="Balloon Tomb band photo"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 100vw, 672px"
            priority
          />
        </div>

        <p className="text-xs leading-loose mb-12">
          Balloon Tomb are a silly and loud bunch of five people. They make their
          sounds within the city of Bristol. They enjoy shouting about goblins,
          trains, and dating apps. Don&apos;t shout back at them or they may cry.
        </p>

        <div className="mb-10 border-2 border-white/30 overflow-hidden">
          <Image
            //src="/photos/full-even_pixelated.jpg"
            //src="/photos/marcus-kick_pixelated.jpg"
            src="/photos/full-close_pixelated.jpg"
            alt="Balloon Tomb band photo"
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
            sizes="(max-width: 640px) 100vw, 672px"
            priority
          />
        </div>

        <p className="text-xs leading-loose mb-12">
          Checkout their silly words, socials and gigs, and submit ur worst dates n
          trains for us to yell about &mdash; much fun to come!
        </p>


      </div>

      {/* Full-width divider — intentionally outside the max-w container */}
      <Image
        //src="/photos/full-wide_pixelated.jpg"
        src="/photos/marcus-kick_pixelated.jpg"
        //src="/photos/full-close_pixelated.jpg"
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
