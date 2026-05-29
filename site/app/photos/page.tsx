import Image from "next/image";

const photos = [
  { src: "/gallery/full-band-action-thunderbolt.jpg", alt: "Full band at The Thunderbolt" },
  { src: "/gallery/taylor-bass.jpg", alt: "Taylor on bass" },
  { src: "/gallery/oli-portrait.jpg", alt: "Oli" },
  { src: "/gallery/marcus-portrait.jpg", alt: "Marcus" },
  { src: "/gallery/damian-portrait.jpg", alt: "Damian" },
  { src: "/gallery/marcus-taylor-action-shot-thekla.jpg", alt: "Marcus and Taylor at Thekla" },
  { src: "/gallery/taylor-portrait.jpg", alt: "Taylor" },
  { src: "/gallery/full-band-sandwich.jpg", alt: "Full band" },
  { src: "/gallery/thekla-full-band-far-away.jpg", alt: "Full band at Thekla" },
  { src: "/gallery/marcus-action-shot-frontman.jpg", alt: "Marcus on stage" },
];

export default function PhotosPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="columns-1 sm:columns-2 max-w-4xl mx-auto gap-3">
        {photos.map((photo, i) => (
          <div key={i} className="mb-3 break-inside-avoid">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={800}
              height={600}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
