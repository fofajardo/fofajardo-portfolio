import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
  const { allPosts } = await parent();
  return {
    posts: allPosts
  };
};
