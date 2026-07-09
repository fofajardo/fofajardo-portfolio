import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const slugs = Object.keys(posts).map((path) => {
    return { slug: path.split("/").pop()?.replace(/\.md$/, "") || "" };
  });
  return slugs;
};

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/content/blog/${params.slug}.md`);
    const meta = post.metadata as BlogPostMetadata;

    return {
      content: post.default,
      meta,
      title: meta.title,
      description: meta.description,
      ogType: "article",
      ogImage: meta.ogImage || meta.preview || "",
      author: meta.author,
      publishedTime: meta.date
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
};
