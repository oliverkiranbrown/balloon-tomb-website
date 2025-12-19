import Image from "next/image";

export default function Home() {
  return (
    <span>
      <a href="/manifesto" target="_blank">
        <img 
          src="/logos/balloon-tomb-light.png"
          alt="Balloon Tomb Logo"
          className="w-full h-full object-cover
          bg-black/70 text-white text-center font-bold text-sm"
        />
      </a>
    </span>
    
  ); 
}
