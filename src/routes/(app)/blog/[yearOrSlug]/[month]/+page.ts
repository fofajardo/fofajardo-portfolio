import { getMonthName } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, parent }) => {
  const { allPosts } = await parent();
  const normalizedMonth = params.month.padStart(2, "0");
  const monthName = getMonthName(params.month);

  const filteredPosts = allPosts.filter((post) => {
    return (
      post.year === params.yearOrSlug &&
      (post.month === params.month || post.month === normalizedMonth)
    );
  });

  return {
    posts: filteredPosts,
    year: params.yearOrSlug,
    month: params.month,
    heading: `Posts from ${monthName} ${params.yearOrSlug}`,
    title: `Posts from ${monthName} ${params.yearOrSlug} - Francis Dominic Fajardo`,
    description: `A collection of blog posts from ${monthName} ${params.yearOrSlug}.`,
    emptyMessage: `No blog posts found from ${monthName} ${params.yearOrSlug}.`,
    ogType: "website"
  };
};
