import { remark } from "remark";
import html from "remark-html";

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
