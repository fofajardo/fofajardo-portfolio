<script lang="ts">
  import { page } from "$app/state";
  import { HeroArt } from "#comp/background";
  import { BlogView } from "#comp/blog";
  import { LinkAnchor } from "#comp/ui";

  const { children } = $props();
  const tag = $derived(page.data.tag);
  const heading = $derived(page.data.heading ?? (tag ? `Posts tagged #${tag}` : "Blog"));
  const pageTitle = $derived(
    page.data.title
      ? page.data.title.includes("Francis Dominic Fajardo")
        ? page.data.title
        : `${page.data.title} - Francis Dominic Fajardo`
      : tag
        ? `Posts tagged #${tag} - Francis Dominic Fajardo`
        : "Blog - Francis Dominic Fajardo"
  );
</script>

<svelte:head>
  <title>{pageTitle}</title>
</svelte:head>

<div class="heading-container">
  <HeroArt type="blog" />
  <div class="heading-content">
    <h1>{heading}</h1>
    <div class="card">
      <nav class="card-actions">
        <LinkAnchor
          link={{
            type: "external",
            url: "/feed.xml",
            label: "RSS 2.0",
            icon: "ph:rss-bold"
          }}
          isButton
        />
        <LinkAnchor
          link={{
            type: "external",
            url: "/feed.atom",
            label: "Atom/RFC 4287",
            icon: "ph:rss-bold"
          }}
          isButton
        />
      </nav>
    </div>
  </div>
</div>

<main>
  <section class="content-layout">
    <BlogView data={page.data} {tag} />
    {@render children()}
  </section>
</main>
