import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { allPosts } = await parent();
  const filteredPosts = allPosts.filter((post) => post.tags?.includes(params.tag));
  return {
    posts: filteredPosts,
    tag: params.tag
  };
};
