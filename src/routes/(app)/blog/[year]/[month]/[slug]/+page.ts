import type { BlogPostMetadata } from "#lib/lib.types.js";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`#content/blog/${params.slug}.md`);
    const meta = post.metadata as BlogPostMetadata;

    const dateParts = meta.date.split("-");
    const postYear = dateParts[0];
    const postMonth = dateParts[1];

    if (postYear !== params.year || postMonth !== params.month) {
      error(404, `Could not find ${params.slug} at ${params.year}/${params.month}`);
    }

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
