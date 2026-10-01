import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
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
