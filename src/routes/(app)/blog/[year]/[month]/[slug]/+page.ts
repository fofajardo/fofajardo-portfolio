import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const slugs = Object.keys(posts).map((path) => {
    return path.split("/").pop()?.replace(/\.md$/, "") || "";
  });

  const entriesList = await Promise.all(
    slugs.map(async (slug) => {
      const post = (await import(`$lib/content/blog/${slug}.md`)) as { metadata: BlogPostMetadata };
      const dateParts = post.metadata.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return { year, month, slug };
    })
  );

  return entriesList;
};

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/content/blog/${params.slug}.md`);
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
