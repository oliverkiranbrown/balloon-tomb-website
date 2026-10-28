import fs from "fs";
import path from "path";
import Image from "next/image";
import PageHeading from "@/components/page_heading";

// Shuffled on every request, so the order changes on each page refresh.
export const dynamic = "force-dynamic";

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

/** Turn a filename into readable alt text: "full-band-sandwich.jpg" -> "Full Band Sandwich" */
function titleCaseFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Fisher-Yates shuffle so the gallery order changes on every render */
function shuffle<T>(items: T[]) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getPhotos() {
  const filenames = fs
    .readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .filter((name) =>
      IMAGE_EXTENSIONS.includes(path.extname(name).toLowerCase())
    );

  return shuffle(filenames).map((name) => ({
    src: `/gallery/${name}`,
    alt: titleCaseFilename(name),
  }));
}

export default function PhotosPage() {
  const photos = getPhotos();

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <PageHeading title="Photos" />
      </div>

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
