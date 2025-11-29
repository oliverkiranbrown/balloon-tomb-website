import { Button } from "@/components/ui/pixelact-ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left section */}
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Balloon Tomb
        </div>

        {/* Center section - Links */}
        <div className="flex gap-6">
          <Button>multiverse</Button>
        </div>

        {/* Right section - Socials */}
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/balloon_tomb/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            Instagram
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            Spotify
          </a>
        </div>
      </div>
    </footer>
  );
}
