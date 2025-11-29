export default function MerchPage() {
  const merchItems = [
    { src: "/merch/merch-drying.jpg", alt: "Tees" },
    { src: "/merch/sticker-bottle.jpg", alt: "Stickers" },
    // add more merch items here
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Merch</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {merchItems.map((item, index) => (
          <div
            key={index}
            className="
              relative 
              border-4 border-gray-500 
              p-1 
              hover:scale-105 
              transition-transform 
              duration-200 
              bg-black
              shadow-[4px_4px_0px_0px_white]
              "
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-center font-bold text-sm">
              {item.alt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
