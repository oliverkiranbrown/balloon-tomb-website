import fs from "fs";
import path from "path";
import MarkdownContent from "@/components/markdown_content";

export default async function CirtusPropogandaPage() {
  const filePath = path.join(
    process.cwd(),
    "app",
    "content",
    "lyrics",
    "cirtus_propoganda.md"
  );

  const markdown = fs.readFileSync(filePath, "utf8");

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <MarkdownContent markdown={markdown} />
    </div>
  );
}
