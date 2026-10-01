import type { PageLoad } from "./$types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getMonthName(monthStr: string): string {
  const monthNum = parseInt(monthStr, 10);
  if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
    return MONTH_NAMES[monthNum - 1];
  }
  return monthStr;
}

export const load: PageLoad = async ({ params, parent }) => {
  const { allPosts } = await parent();
  const normalizedMonth = params.month.padStart(2, "0");
  const monthName = getMonthName(params.month);

  const filteredPosts = allPosts.filter((post) => {
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
