import type { BlogPost, BlogPostMetadata } from "$lib/lib.types";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const iterablePostFiles = Object.entries(posts);

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const resolved = (await resolver()) as { metadata: BlogPostMetadata };
      const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";

      return {
        slug,
        ...resolved.metadata
      } as BlogPost;
    })
  );

  const visiblePosts = allPosts.filter((post) => !post.unlisted);
  visiblePosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    allPosts: visiblePosts
  };
};
