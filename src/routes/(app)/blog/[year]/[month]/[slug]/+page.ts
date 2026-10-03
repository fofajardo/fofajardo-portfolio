import { fetchPostsMap } from "#lib/dataService.js";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  try {
    const posts = await fetchPostsMap();
    const post = posts.get(params.year)?.get(params.month)?.get(params.slug);
    if (post === undefined) {
      error(404, `Could not find ${params.slug} at ${params.year}/${params.month}`);
    }

    return {
      content: post.content,
      meta: post,
      title: post.title,
      description: post.description,
      ogType: "article",
      ogImage: post.ogImage || post.preview || "",
      author: post.author,
      publishedTime: post.date
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
};
