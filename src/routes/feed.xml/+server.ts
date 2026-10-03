import { fetchPosts } from "#lib/dataService.js";
import { escapeXml } from "#lib/utils.js";
import { create } from "xmlbuilder2";
import { EMAIL_WM } from "$app/env/public";

export const prerender = true;

function fakeResolve(path: string = "") {
  if (path.startsWith("/")) {
    return `${import.meta.env.VITE_URL_ORIGIN}${path}`;
  }
  return `${import.meta.env.VITE_URL_ORIGIN}/${path}`;
}

async function generateRssXml() {
  const posts = await fetchPosts();
  const pubDate = new Date(posts[posts.length - 1].date);
  const title = "Francis Dominic Fajardo";
  const description = "Francis Dominic Fajardo's Blog";
  const copyrightNotice = `Copyright ${new Date().getFullYear()}, Francis Dominic Fajardo`;

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
    .txt(title)
    .up()
    // description
    .ele("description")
    .txt(description)
    .up()
    // link
    .ele("link")
    .txt(fakeResolve("blog"))
    .up()
    // lastBuildDate
    .ele("lastBuildDate")
    .txt(new Date().toUTCString())
    .up()
    // pubDate
    .ele("pubDate")
    .txt(pubDate.toUTCString())
    .up()
    // webMaster
    .ele("webMaster")
    .txt(EMAIL_WM)
    .up()
    // copyright
    .ele("copyright")
    .txt(copyrightNotice)
    .up()
    // creativeCommons:license
    .ele("creativeCommons:license")
    .txt("https://creativecommons.org/licenses/by-nd/4.0")
    .up();

  // Build Atom/RFC 4287 compatible format
  const atomBuilder = builder
    .up()
    // atom:title
    .ele("atom:title", { type: "text" })
    .txt(title)
    .up()
    // atom:subtitle
    .ele("atom:subtitle", { type: "text" })
    .txt(description)
    .up()
    // atom:link (rss)
    .ele("atom:link", {
      href: fakeResolve("feed.xml"),
      rel: "self",
      type: "application/rss+xml"
    })
    .up()
    // atom:link (atom)
    .ele("atom:link", {
      href: fakeResolve("feed.xml"),
      rel: "self",
      type: "application/atom+xml"
    })
    .up()
    // atom:updated
    .ele("atom:updated")
    .txt(pubDate.toISOString())
    .up()
    // atom:author
    .ele("atom:author")
    .ele("atom:name")
    .txt(title)
    .up()
    .ele("atom:uri")
    .txt(fakeResolve())
    .up()
    .ele("atom:email")
    .txt(EMAIL_WM)
    .up()
    .up()
    // atom:id
    .ele("atom:id")
    .txt(fakeResolve("blog"))
    .up()
    // atom:rights
    .ele("atom:rights")
    .txt(copyrightNotice)
    .up();

  posts.forEach((post) => {
    const postUrl = fakeResolve(`blog/${post.year}/${post.month}/${post.slug}`);
    const commentsUrl = `${postUrl}#comments`;
    const postDate = new Date(post.date);
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
      .txt(postDate.toUTCString())
      .up()
      // comments
      .ele("comments")
      .txt(commentsUrl)
      .up();

    const atomPostBuilder = atomBuilder
      .ele("atom:entry")
      // atom:title
      .ele("atom:title")
      .txt(escapeXml(post.title))
      .up()
      // atom:link (alternate)
      .ele("atom:link", { rel: "alternate", type: "text/html", href: postUrl })
      .up()
      // atom:id
      .ele("atom:id")
      .txt(postUrl)
      .up()
      // atom:updated
      .ele("atom:updated")
      .txt(postDate.toISOString())
      .up();

    // description
    if (post.description) {
      postBuilder.ele("description").txt(escapeXml(post.description));
      atomPostBuilder.ele("atom:summary").txt(escapeXml(post.description));
    }
    // author
    if (post.author) {
      postBuilder.ele("author").txt(escapeXml(post.author));
      atomPostBuilder.ele("atom:author").ele("atom:name").txt(escapeXml(post.author));
    }
    // tags
    if (post.tags) {
      post.tags.forEach((tag) => {
        postBuilder.ele("category").txt(escapeXml(tag));
        atomPostBuilder.ele("atom:category", { term: escapeXml(tag), label: escapeXml(tag) });
      });
    }
    // enclosure
    if (post.ogImage) {
      postBuilder.ele("enclosure", {
        length: 0,
        type: "image/png",
        url: fakeResolve(post.ogImage)
      });
      atomPostBuilder.ele("atom:link", {
        rel: "enclosure",
        length: 0,
        type: "image/png",
        href: fakeResolve(post.ogImage)
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
