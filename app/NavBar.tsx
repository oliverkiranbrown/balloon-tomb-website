"use client";
import Link from "next/link";
import { useState} from "react";

export default function NavBar() {
  const [musicOpen, setMusicOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    // Cancel any pending close timeout
    clearTimeout(timeoutId);
    setMusicOpen(true);
  };

  const handleMouseLeave = () => {
    // Add small delay before closing
    timeoutId = setTimeout(() => setMusicOpen(false), 200); // 200ms delay
  };

  return (
    <nav className="
      w-full 
      bg-black 
      text-white 
      border-b 
      border-white 
      px-4 
      py-3">
      <ul className="
        flex 
        justify-around
        gap-6 
        text-2x1
        font-bold
        tracking-wider
        ">
        <li>
          <Link href="/manifesto" className="hover:text-pink-400">
            Manifesto
          </Link>
        </li>
        { /* Music dropdown with options*/ }
        <li className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer hover:text-pink-400">Music</span>

          {musicOpen && (
            <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-black border border-white rounded-lg shadow-lg z-10">
              <li className="border-b border-white">
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-pink-500 hover:text-black"
                >
                  Spotify
                </a>
              </li>
              <li className="border-b border-white">
                <a
                  href="https://bandcamp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-pink-500 hover:text-black"
                >
                  Bandcamp
                </a>
              </li>
              <li>
                <Link
                  href="/lyrics"
                  className="block px-4 py-2 hover:bg-pink-500 hover:text-black"
                >
                  Lyrics
                </Link>
              </li>
            </ul>
          )}
        </li>
        
        <li>
          <Link href="/live" className="hover:text-pink-400">
            Live
          </Link>
        </li>
        <li>
          <Link href="/merch" className="hover:text-pink-400">
            Merch
          </Link>
        </li>
      </ul>
    </nav>
  );
}
