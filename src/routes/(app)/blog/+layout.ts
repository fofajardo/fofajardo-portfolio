import { getPostsByYearAndMonth, getVisiblePosts } from "#lib/dataService.js";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  return {
    allPosts: await getVisiblePosts(),
    groupedPosts: await getPostsByYearAndMonth(),
    title: "Blog",
    description: "Francis Dominic Fajardo's Blog",
    ogType: "website"
  };
};
