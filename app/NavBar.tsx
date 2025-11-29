"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [musicOpen, setMusicOpen] = useState(false);
  let timeoutId: NodeJS.Timeout;
  const pathname = usePathname(); // get current path

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setMusicOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => setMusicOpen(false), 200);
  };

  const navLinks = [
    { href: "/manifesto", label: "Manifesto" },
    { href: "/merch", label: "Merch" },
    { href: "/live", label: "Live" },
  ];

  return (
    <nav className="w-full bg-black text-white border-b border-white px-4 py-3">
      <div className="flex items-center justify-between w-full">
        <span>
          <a href="/" target="_blank">
            <img
              src="/logos/balloon-tomb-dark.jpg"
              alt="Balloon Tomb Logo"
              className="w-24 h-full object-cover"
            />
          </a>
        </span>

        <ul className="flex gap-8 text-xl items-center font-bold tracking-wider">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  ${pathname === link.href ? "text-pink-500" : "text-white"}
                  hover:text-pink-400
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Music dropdown */}
          <li
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`
                cursor-pointer
                ${pathname.startsWith("/music") ? "text-pink-500" : "text-white"}
                hover:text-pink-400
              `}
            >
              Music
            </span>

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

          {/* Socials */}
          <li>
            <a
              href="https://www.instagram.com/balloon_tomb/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              Socials
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
