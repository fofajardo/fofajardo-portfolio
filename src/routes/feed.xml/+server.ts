import type { BlogPostMetadata } from "$lib/lib.types";
import { escapeXml } from "$lib/utils";

export const prerender = true;

export async function GET() {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const iterablePostFiles = Object.entries(posts);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const resolved = (await resolver()) as { metadata: BlogPostMetadata };
      const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";
      const dateParts = resolved.metadata.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return {
        slug,
        year,
        month,
        ...resolved.metadata
      };
    })
  );

  const visiblePosts = allPosts.filter((post) => !post.unlisted);
  visiblePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const siteUrl = "https://fofajardo.is-a.dev";
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Francis Dominic Fajardo</title>
  <link>${siteUrl}/blog</link>
  <description>Francis Dominic Fajardo's Blog</description>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
  ${visiblePosts
    .map(
      (post) => `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${siteUrl}/blog/${post.year}/${post.month}/${post.slug}</link>
    <guid>${siteUrl}/blog/${post.year}/${post.month}/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    ${post.description ? `<description>${escapeXml(post.description)}</description>` : ""}
    ${post.author ? `<author>${escapeXml(post.author)}</author>` : ""}
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600"
    }
  });
}
