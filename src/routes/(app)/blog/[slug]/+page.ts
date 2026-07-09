import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const iterable = Object.entries(posts);
  const legacySlugs = await Promise.all(
    iterable.map(async ([path, resolver]) => {
      const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";
      const resolved = (await resolver()) as { metadata: BlogPostMetadata };
      return { slug, legacy: resolved.metadata.legacy };
    })
  );

  return legacySlugs.filter((post) => post.legacy === true).map((post) => ({ slug: post.slug }));
};

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/content/blog/${params.slug}.md`);
    const meta = post.metadata as BlogPostMetadata;

    if (meta.legacy === true) {
      const dateParts = meta.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return {
        redirectUrl: `/blog/${year}/${month}/${params.slug}`
      };
    }

    error(404, `Could not find ${params.slug}`);
  } catch (e) {
    if (e && typeof e === "object" && "status" in e) {
      throw e;
    }
    error(404, `Could not find ${params.slug}`);
  }
};
