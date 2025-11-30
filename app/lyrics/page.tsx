export default function LyricsPage() {
  // Example list of lyrics pages
  const songs = [
    { title: "Always Late", slug: "song-1" },
    { title: "Dull Apps", slug: "song-2" },
    { title: "Gobblin Dynasty", slug: "song-3" },
    { title: "New Docs", slug: "song-4" },
    { title: "Haddock Dad", slug: "song-5" },
    { title: "Pretty Mean", slug: "song-6" },
    { title: "LOTR", slug: "song-7" },
  ];

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Lyrics</h1>

      <ul className="space-y-4">
        {songs.map((song) => (
          <li key={song.slug}>
            <a
              href={`/lyrics/${song.slug}`}
              className="text-pink-400 hover:text-black text-2xl underline"
            >
              {song.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}