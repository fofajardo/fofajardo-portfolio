import { fetchPosts } from "#lib/dataService.js";
import { escapeXml } from "#lib/utils.js";
import { create } from "xmlbuilder2";
import { EMAIL_WM } from "$app/env/public";

function fakeResolve(path: string = "") {
  if (path.startsWith("/")) {
    return `${import.meta.env.VITE_URL_ORIGIN}${path}`;
  }
  return `${import.meta.env.VITE_URL_ORIGIN}/${path}`;
}

async function getSyndicationData() {
  const posts = await fetchPosts();
  const pubDate = new Date(posts[posts.length - 1].date);
  const title = "Francis Dominic Fajardo";
  const description = "Francis Dominic Fajardo's Blog";
  const copyrightNotice = `Copyright ${new Date().getFullYear()}, Francis Dominic Fajardo`;
  return { posts, pubDate, title, description, copyrightNotice };
}

export async function generateRssXml() {
  const { posts, pubDate, title, description, copyrightNotice } = await getSyndicationData();

  const builder = create({
    encoding: "utf-8"
  })
    // rss
    .ele("rss", {
      version: "2.0",
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

    // description
    if (post.description) {
      postBuilder.ele("description").txt(escapeXml(post.description));
    }
    // author
    if (post.author) {
      postBuilder.ele("author").txt(escapeXml(post.author));
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

export async function generateAtomXml() {
  const { posts, pubDate, title, description, copyrightNotice } = await getSyndicationData();

  // Build Atom/RFC 4287 compatible format
  const builder = create({
    encoding: "utf-8"
  })
    // rss
    .ele("feed", {
      xmlns: "http://www.w3.org/2005/Atom"
    })
    // title
    .ele("title", { type: "text" })
    .txt(title)
    .up()
    // subtitle
    .ele("subtitle", { type: "text" })
    .txt(description)
    .up()
    // link (rss)
    .ele("link", {
      href: fakeResolve("feed.xml"),
      rel: "self",
      type: "application/rss+xml"
    })
    .up()
    // link (atom)
    .ele("link", {
      href: fakeResolve("feed.atom"),
      rel: "self",
      type: "application/atom+xml"
    })
    .up()
    // updated
    .ele("updated")
    .txt(pubDate.toISOString())
    .up()
    // author
    .ele("author")
    .ele("name")
    .txt(title)
    .up()
    .ele("uri")
    .txt(fakeResolve())
    .up()
    .ele("email")
    .txt(EMAIL_WM)
    .up()
    .up()
    // id
    .ele("id")
    .txt(fakeResolve("blog"))
    .up()
    // rights
    .ele("rights")
    .txt(copyrightNotice)
    .up();

  posts.forEach((post) => {
    const postUrl = fakeResolve(`blog/${post.year}/${post.month}/${post.slug}`);
    const postDate = new Date(post.date);

    const postBuilder = builder
      .ele("entry")
      // title
      .ele("title")
      .txt(escapeXml(post.title))
      .up()
      // link (alternate)
      .ele("link", { rel: "alternate", type: "text/html", href: postUrl })
      .up()
      // id
      .ele("id")
      .txt(postUrl)
      .up()
      // updated
      .ele("updated")
      .txt(postDate.toISOString())
      .up();

    // description
    if (post.description) {
      postBuilder.ele("summary").txt(escapeXml(post.description));
    }
    // author
    if (post.author) {
      postBuilder.ele("author").ele("name").txt(escapeXml(post.author));
    }
    // tags
    if (post.tags) {
      post.tags.forEach((tag) => {
        postBuilder.ele("category", { term: escapeXml(tag), label: escapeXml(tag) });
      });
    }
    // enclosure
    if (post.ogImage) {
      postBuilder.ele("link", {
        rel: "enclosure",
        length: 0,
        type: "image/png",
        href: fakeResolve(post.ogImage)
      });
    }
  });

  return builder.end({ prettyPrint: true });
}
