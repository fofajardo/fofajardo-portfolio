import { visiblePosts } from "$lib/dataService";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  return {
    allPosts: visiblePosts,
    title: "Blog",
    description: "Francis Dominic Fajardo's Blog",
    ogType: "website"
  };
};
