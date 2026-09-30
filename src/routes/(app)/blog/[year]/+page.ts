import { error } from "@sveltejs/kit";
import type { PageLoad, EntryGenerator } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const slugs = Object.keys(posts).map((path) => {
    return path.split("/").pop()?.replace(/\.md$/, "") || "";
  });

  const postDetails = await Promise.all(
    slugs.map(async (slug) => {
      const post = (await import(`$lib/content/blog/${slug}.md`)) as { metadata: BlogPostMetadata };
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

  const years = Array.from(
    new Set(
      postDetails
        .filter((post) => {
          return !post.unlisted;
        })
        .map((post) => {
          return post.year;
        })
    )
  ).map((year) => {
    return { year };
  });

  const legacySlugs = postDetails
    .filter((post) => {
      return post.legacy === true;
    })
    .map((post) => {
      return { year: post.slug };
    });

  return [...years, ...legacySlugs];
};

export const load: PageLoad = async ({ params, parent }) => {
  try {
    const post = await import(`$lib/content/blog/${params.year}.md`);
    const meta = post.metadata as BlogPostMetadata;

    if (meta.legacy === true) {
      const dateParts = meta.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return {
        redirectUrl: `/blog/${year}/${month}/${params.year}`
      };
    }
  } catch (e) {
    if (e && typeof e === "object" && "status" in e) {
      throw e;
    }
  }

  const { allPosts } = await parent();
  const filteredPosts = allPosts.filter((post) => {
    return post.year === params.year;
  });

  return {
    posts: filteredPosts,
    year: params.year,
    heading: `Posts from ${params.year}`,
    title: `Posts from ${params.year} - Francis Dominic Fajardo`,
    description: `A collection of blog posts from ${params.year}.`,
    emptyMessage: `No blog posts found from ${params.year}.`,
    ogType: "website"
  };
};
