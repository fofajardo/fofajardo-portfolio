import type { BlogPost, BlogPostMetadata } from "$lib/lib.types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const iterablePostFiles = Object.entries(posts);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const resolved = (await resolver()) as { metadata: BlogPostMetadata };
      const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";

      const dateParts = resolved.metadata.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];

      return {
        slug,
        year,
        month,
        ...resolved.metadata
      } as BlogPost;
    })
  );

  const visiblePosts = allPosts.filter((post) => !post.unlisted);
  visiblePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    allPosts: visiblePosts,
    title: "Blog",
    description: "Francis Dominic Fajardo's Blog",
    ogType: "website"
  };
};
