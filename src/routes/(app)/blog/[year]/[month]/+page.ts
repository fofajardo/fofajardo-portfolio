import type { PageLoad, EntryGenerator } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

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

export const entries: EntryGenerator = async () => {
  const posts = import.meta.glob("$lib/content/blog/*.md");
  const slugs = Object.keys(posts).map((path) => {
    return path.split("/").pop()?.replace(/\.md$/, "") || "";
  });

  const entriesList = await Promise.all(
    slugs.map(async (slug) => {
      const post = (await import(`$lib/content/blog/${slug}.md`)) as { metadata: BlogPostMetadata };
      if (post.metadata.unlisted) {
        return null;
      }
      const dateParts = post.metadata.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      return { year, month };
    })
  );

  const uniqueYearMonths = Array.from(
    new Set(
      entriesList
        .filter((entry): entry is { year: string; month: string } => {
          return entry !== null;
        })
        .map((entry) => {
          return `${entry.year}/${entry.month}`;
        })
    )
  ).map((item) => {
    const [year, month] = item.split("/");
    return { year, month };
  });

  return uniqueYearMonths;
};

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
