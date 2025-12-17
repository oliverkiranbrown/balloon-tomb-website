"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [musicOpen, setMusicOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMusicOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMusicOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTouchToggle = () => {
    if (isMobile) {
      setMusicOpen(!musicOpen);
    }
  };

  const navLinks = [
    { href: "/manifesto", label: "Manifesto" },
    { href: "/merch", label: "Merch" },
    { href: "/live", label: "Live" },
  ];

  const musicLinks = [
    { href: "https://spotify.com", label: "Spotify", external: true },
    { href: "https://bandcamp.com", label: "Bandcamp", external: true },
    { href: "/lyrics", label: "Lyrics", external: false },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-black text-white border-b border-white z-50">
        <div className="container mx-auto px-4 py-3 overflow-y-hidden">
          <div className="flex items-center justify-between overflow-y-hidden">
            {/* Logo - always visible */}
            <Link href="/" className="z-50">
              <img
                src="/logos/balloon-tomb-dark.jpg"
                alt="Balloon Tomb Logo"
                className="w-20 md:w-24 lg:w-28 object-contain"
              />
            </Link>
            
            {/* Mobile Menu Button - only visible on mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg z-50"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-6 relative">
                <span className={`
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-0.5 w-6 bg-white
                  transition-all duration-300
                  ${mobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}
                `} />
                <span className={`
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-0.5 w-6 bg-white
                  transition-all duration-300
                  ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                `} />
                <span className={`
                  absolute left-0 top-1/2 -translate-y-1/2
                  h-0.5 w-6 bg-white
                  transition-all duration-300
                  ${mobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}
                `} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`
          lg:hidden
          fixed inset-0 bg-black
          transition-all duration-300 ease-in-out
          z-40
          ${mobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
          }
        `}>
          <div className="
            absolute top-20 right-0 bottom-0 left-0
            bg-black
            overflow-y-auto
          ">
            <div className="container mx-auto px-6 py-24">
              {/* Mobile Navigation Links */}
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-white/20 pb-4">
                    <Link
                      href={link.href}
                      className={`
                        block text-2xl font-bold tracking-wider
                        py-3
                        transition-all duration-200
                        ${pathname === link.href ? "text-pink-500" : "text-white"}
                        hover:text-pink-400
                        hover:pl-4
                      `}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}

                {/* Mobile Music Dropdown */}
                <li className="border-b border-white/20 pb-4">
                  <button
                    onClick={handleTouchToggle}
                    className={`
                      w-full text-left text-2xl font-bold tracking-wider
                      py-3
                      transition-all duration-200
                      ${pathname.startsWith("/music") ? "text-pink-500" : "text-white"}
                      hover:text-pink-400
                      flex items-center justify-between
                    `}
                  >
                    Music
                    <span className="text-3xl">{musicOpen ? '−' : '+'}</span>
                  </button>
                  
                  {musicOpen && (
                    <ul className="mt-4 ml-4 space-y-3 border-l-2 border-pink-500 pl-4">
                      {musicLinks.map((link) => (
                        <li key={link.label}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-xl font-bold py-2 text-white/80 hover:text-pink-400 transition-colors"
                            >
                              {link.label}
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="block text-xl font-bold py-2 text-white/80 hover:text-pink-400 transition-colors"
                            >
                              {link.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* Mobile Socials */}
                <li className="border-b border-white/20 pb-4">
                  <a
                    href="https://www.instagram.com/balloon_tomb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-2xl font-bold tracking-wider py-3 text-white hover:text-pink-400 transition-colors"
                  >
                    Socials
                  </a>
                </li>
              </ul>

              {/* Mobile Call to Action */}
              <div className="mt-12 pt-8 border-t border-white/30">
                <p className="text-white/60 text-center text-lg mb-6">
                  Follow for updates!
                </p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://www.instagram.com/balloon_tomb/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 rounded-full hover:bg-pink-500 transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    {/* Add Instagram icon here */}
                  </a>
                  {/* Add more social icons */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
}