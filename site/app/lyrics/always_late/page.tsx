import fs from "fs";
import path from "path";
import MarkdownContent from "@/components/markdown_content";

export default async function AlwaysLatePage() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "content",
    "lyrics",
    "always_late.md"
  );

  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <MarkdownContent markdown={markdown} />
      <iframe src="https://show.co/social-unlock/2p89jlXCf2TpSHliNmmW8n/widget" title="Always Late — listen on Spotify" width="300" height="300" className="mx-auto"></iframe>
    </div>
  );
}
