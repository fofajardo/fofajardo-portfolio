import { fetchPosts } from "#lib/dataService.js";
import { escapeXml } from "#lib/utils.js";
import { create } from "xmlbuilder2";

export const prerender = true;

function fakeResolve(path: string) {
  if (path.startsWith("/")) {
    return `${import.meta.env.VITE_URL_ORIGIN}${path}`;
  }
  return `${import.meta.env.VITE_URL_ORIGIN}/${path}`;
}

async function generateRssXml() {
  const posts = await fetchPosts();
  const pubDate = new Date(posts[posts.length - 1].date).toUTCString();

  const builder = create({
    encoding: "UTF-8"
  })
    // rss
    .ele("rss", {
      version: "2.0",
      "xmlns:atom": "http://www.w3.org/2005/Atom",
      "xmlns:creativeCommons": "http://backend.userland.com/creativeCommonsRssModule"
    })
    .ele("channel")
    // title
    .ele("title")
    .txt("Francis Dominic Fajardo")
    .up()
    // description
    .ele("description")
    .txt("Francis Dominic Fajardo's Blog")
    .up()
    // link
    .ele("link")
    .txt(fakeResolve("blog"))
    .up()
    // atom:link
    .ele("atom:link", {
      href: fakeResolve("feed.xml"),
      rel: "self",
      type: "application/rss+xml"
    })
    .up()
    // lastBuildDate
    .ele("lastBuildDate")
    .txt(new Date().toUTCString())
    .up()
    // pubDate
    .ele("pubDate")
    .txt(pubDate)
    .up()
    // copyright
    .ele("copyright")
    .txt(`Copyright ${new Date().getFullYear()}, Francis Dominic Fajardo`)
    .up()
    // creativeCommons:license
    .ele("creativeCommons:license")
    .txt("https://creativecommons.org/licenses/by-nd/4.0")
    .up()

  posts.forEach((post) => {
    const postUrl = fakeResolve(`blog/${post.year}/${post.month}/${post.slug}`);
    const commentsUrl = `${postUrl}#comments`;
    const postBuilder = builder
      .ele("item")
      // title
      .ele("title")
      .txt(escapeXml(post.title))
      .up()
      // link
      .ele("link")
      .txt(postUrl)
      .up()
      // guid
      .ele("guid")
      .txt(postUrl)
      .up()
      // pubDate
      .ele("pubDate")
      .txt(new Date(post.date).toUTCString())
      .up()
      // comments
      .ele("comments")
      .txt(commentsUrl)
      .up();
    // description
    if (post.description) {
      postBuilder.ele("description").txt(escapeXml(post.description)).up();
    }
    // author
    if (post.author) {
      postBuilder.ele("author").txt(escapeXml(post.author)).up();
    }
    // tags
    if (post.tags) {
      post.tags.forEach((tag) => {
        postBuilder.ele("category").txt(escapeXml(tag));
      });
    }
    // enclosure
    if (post.ogImage) {
      postBuilder.ele("enclosure", {
        length: 0,
        type: "image/png",
        url: fakeResolve(post.ogImage)
      });
    }
  });

  return builder.end({ prettyPrint: true });
}

export async function GET() {
  return new Response(await generateRssXml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "max-age=0, s-maxage=3600"
    }
  });
}
