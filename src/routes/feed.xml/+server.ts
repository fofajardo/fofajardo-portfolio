import { fetchPosts } from "#lib/dataService.js";
import { escapeXml } from "#lib/utils.js";

export const prerender = true;

export async function GET() {
  const posts = await fetchPosts();

  const siteUrl = "https://fofajardo.com";
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Francis Dominic Fajardo</title>
  <link>${siteUrl}/blog</link>
  <description>Francis Dominic Fajardo's Blog</description>
  <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
  ${posts
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
