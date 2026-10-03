import { getMonthName } from "#lib/utils.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { posts } = await parent();
  const normalizedMonth = params.month.padStart(2, "0");
  const monthName = getMonthName(params.month);

  const filteredPosts = posts.filter((post) => {
    return (
      post.year === params.year && (post.month === params.month || post.month === normalizedMonth)
    );
  });

  return {
    posts: filteredPosts,
    year: params.year,
    month: params.month,
    heading: `Posts from ${monthName} ${params.year}`,
    title: `Posts from ${monthName} ${params.year} - Francis Dominic Fajardo`,
    description: `A collection of blog posts from ${monthName} ${params.year}.`,
    emptyMessage: `No blog posts found from ${monthName} ${params.year}.`,
    ogType: "website"
  };
};
