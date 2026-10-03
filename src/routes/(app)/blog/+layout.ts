import { fetchPostsMap, fetchPosts } from "#lib/dataService.js";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
  return {
    posts: await fetchPosts(),
    postsMap: await fetchPostsMap(),
    title: "Blog",
    description: "Francis Dominic Fajardo's Blog",
    ogType: "website"
  };
};
