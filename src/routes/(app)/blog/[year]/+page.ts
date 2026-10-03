import { fetchPostsByYearAndMonth } from "#lib/dataService.js";
import type { BlogPost } from "#lib/lib.types.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { posts } = await parent();
  const filteredPosts = posts.filter((post) => {
    return post.year === params.year;
  });

  const yearMonths = (await fetchPostsByYearAndMonth()).get(params.year);
  const yearGrouped = new Map<string, Map<string, BlogPost[]>>();
  if (yearMonths) {
    yearGrouped.set(params.year, yearMonths);
  }

  return {
    posts: filteredPosts,
    groupedPosts: yearGrouped,
    year: params.year,
    heading: `Posts from ${params.year}`,
    title: `Posts from ${params.year} - Francis Dominic Fajardo`,
    description: `A collection of blog posts from ${params.year}.`,
    emptyMessage: `No blog posts found from ${params.year}.`,
    ogType: "website"
  };
};
