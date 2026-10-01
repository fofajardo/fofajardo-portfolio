import type { BlogPostMetadata } from "$lib/lib.types";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$content/blog/*.md");
  const slugs = Object.keys(posts).map((path) => {
    return path.split("/").pop()?.replace(/\.md$/, "") || "";
  });

  const postDetails = await Promise.all(
    slugs.map(async (slug) => {
      const post = (await import(`$content/blog/${slug}.md`)) as { metadata: BlogPostMetadata };
      const dateParts = post.metadata.date.split("-");
      const year = dateParts[0];
      return {
        slug,
        year,
        unlisted: post.metadata.unlisted,
        legacy: post.metadata.legacy
      };
    })
  );

  const legacySlugs = postDetails
    .filter((post) => {
      return post.legacy === true;
    })
    .map((post) => {
      return { yearOrSlug: post.slug };
    });

  return legacySlugs;
};

export const load: PageLoad = async ({ params, parent }) => {
  try {
    const post = await import(`$content/blog/${params.yearOrSlug}.md`);
    const meta = post.metadata as BlogPostMetadata;

    if (meta.legacy === true) {
      const dateParts = meta.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return {
        redirectUrl: `/blog/${year}/${month}/${params.yearOrSlug}`
      };
    }
  } catch (e) {
    if (e && typeof e === "object" && "status" in e) {
      throw e;
    }
  }

  const { allPosts } = await parent();
  const filteredPosts = allPosts.filter((post) => {
    return post.year === params.yearOrSlug;
  });

  return {
    posts: filteredPosts,
    year: params.yearOrSlug,
    heading: `Posts from ${params.yearOrSlug}`,
    title: `Posts from ${params.yearOrSlug} - Francis Dominic Fajardo`,
    description: `A collection of blog posts from ${params.yearOrSlug}.`,
    emptyMessage: `No blog posts found from ${params.yearOrSlug}.`,
    ogType: "website"
  };
};
