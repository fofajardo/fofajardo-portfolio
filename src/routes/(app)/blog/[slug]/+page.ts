import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { BlogPostMetadata } from "$lib/lib.types";

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`$lib/content/blog/${params.slug}.md`);
    const meta = post.metadata as BlogPostMetadata & { legacy?: boolean };

    if (meta.legacy === true) {
      const dateParts = meta.date.split("-");
      const year = dateParts[0];
      const month = dateParts[1];
      redirect(308, `/blog/${year}/${month}/${params.slug}`);
    }

    error(404, `Could not find ${params.slug}`);
  } catch (e) {
    if (e && typeof e === "object" && "status" in e) {
      throw e;
    }
    error(404, `Could not find ${params.slug}`);
  }
};
