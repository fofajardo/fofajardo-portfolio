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

    return {
      content: post.default,
      meta: post.metadata as BlogPostMetadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
};
