import { fetchPostsByYearAndMonth, fetchPosts } from "#lib/dataService.js";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  return {
    posts: await fetchPosts(),
    groupedPosts: await fetchPostsByYearAndMonth(),
    title: "Blog",
    description: "Francis Dominic Fajardo's Blog",
    ogType: "website"
  };
};
