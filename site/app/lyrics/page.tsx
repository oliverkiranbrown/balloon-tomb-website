// import Link from 'next/link';
// import FusionCollection from 'fusionable/FusionCollection';

// export default function LyricsPage() {
//   // Example list of lyrics pages
//   // const songs = [
//   //   { title: "Always Late", slug: "always_late" },
//   //   { title: "Dull Apps", slug: "song-2" },
//   //   { title: "Goblin Dynasty", slug: "song-3" },
//   //   { title: "New Docs", slug: "song-4" },
//   //   { title: "Haddock Dad", slug: "song-5" },
//   //   { title: "Pretty Mean", slug: "song-6" },
//   //   { title: "LOTR", slug: "song-7" },
//   // ];

//   const posts = getPosts(); // Static generation by default

//   console.log(posts[0].source);

//   return (

//     <div className="p-6 text-black bg-white min-h-screen">
//       <h1 className="text-4xl font-bold mb-6">Lyrics</h1>

//       <ul>
//         {posts.map((post) => (
//           <li key={post.name}>
//             <a 
//               href={`/lyrics/${post.name}`}
//               className="text-pink-400 hover:text-black text-2xl underline"
//             >
//               {post.name}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* <ul className="space-y-4">
//         {songs.map((song) => (
//           <li key={song.slug}>
//             <a
//               href={`/lyrics/${song.slug}`}
//               className="text-pink-400 hover:text-black text-2xl underline"
//             >
//               {song.title}
//             </a>
//           </li>
//         ))}
//       </ul> */}
//       <div>
//         <br/>
//         <img
//           src="/photos/shout_pixelated.jpg"
//           alt="Taylor"
//           className="w-full h-full object-contain border-4 border-gray-300 hover:border-pink-500 transition-colors duration-300"
//         />
//       </div>
//     </div>

//   );
// }

// // app/page.tsx

// function getPosts() {
//   const collection = new FusionCollection()
//     .loadFromDir('app/content/lyrics')
//   return collection.getItemsArray();
// }

import Link from "next/link";

export default function LyricsPage() {
  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Lyrics</h1>

      <ul className="space-y-4">
        <li className="text-pink-400 hover:text-black text-2xl underline">
          <Link href="lyrics/always_late" className="underline text-2xl">
            Always Late
          </Link>
        </li>
        <li className="text-pink-400 hover:text-black text-2xl underline">
          <Link href="lyrics/new_docs" className="underline text-2xl">
            New Docs
          </Link>
        </li>
        <li className="text-pink-400 hover:text-black text-2xl underline">
          <Link href="lyrics/haddock_dad" className="underline text-2xl">
            Haddock Dad
          </Link>
        </li>
        <li className="text-pink-400 text-2xl">
          Goblin Dynasty
        </li>
        <li className="text-pink-400 text-2xl">
          Pretty Mean
        </li>
        <li className="text-pink-400 text-2xl">
          Punk Fellowship
        </li>
      </ul>
    </div>
  );
}