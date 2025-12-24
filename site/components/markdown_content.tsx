import { remark } from "remark";
import html from "remark-html";

// TODO: https://medium.com/the-tech-pulse/just-files-build-a-blog-with-next-js-and-react-markdown-305935c86aca
// Add nice rendering for header etc.

interface MarkdownContentProps {
  markdown: string;
}

export default async function MarkdownContent({
  markdown,
}: MarkdownContentProps) {
  const processed = await remark().use(html).process(markdown);

  return (
    <article className="prose prose-lg max-w-none">
      <div
        dangerouslySetInnerHTML={{
          __html: processed.toString(),
        }}
      />
    </article>
  );
}
