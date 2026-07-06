import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

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
