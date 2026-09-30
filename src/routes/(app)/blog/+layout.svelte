<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { page } from "$app/state";
  import LinkAnchor from "$lib/LinkAnchor.svelte";
  import HeroArt from "$lib/HeroArt.svelte";

  const { children } = $props();
  const posts = $derived(page.data.posts ?? []);
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

{#if page.data.redirectUrl}
  {@render children()}
{:else}
  <div class="heading-container">
    <HeroArt type="blog" />
    <div class="heading-content">
      <h1>{heading}</h1>
      <LinkAnchor
        link={{
          type: "external",
          url: "/feed.xml",
          label: "RSS",
          icon: "ph:rss-bold"
        }}
        isButton
      />
    </div>
  </div>

  <section class="content-layout">
    {#if posts.length === 0}
      <p>
        {page.data.emptyMessage ??
          (tag ? "No blog posts found with this tag." : "No blog posts found.")}
      </p>
    {:else}
      <div class="cardset list">
        {#each posts as post (post.slug)}
          <a class="card-anchor" href="/blog/{post.year}/{post.month}/{post.slug}">
            <div class="card">
              <div class="card-detail blog-card-detail">
                <div class="card-header blog-card-header">
                  <span class="card-title blog-card-title">{post.title}</span>
                  {#if post.description}
                    <p class="blog-card-desc">{post.description}</p>
                  {/if}
                  <span class="blog-card-date">{formatDate(post.date)}</span>
                </div>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
    {@render children()}
  </section>
{/if}

<style>
  .blog-card-detail {
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
  }
  .blog-card-header {
    width: 100%;
  }
  .blog-card-title {
    margin: 0;
  }
  .blog-card-date {
    opacity: 0.85;
  }
  .blog-card-desc {
    margin: 0;
    text-align: justify;
    color: inherit;
  }
</style>
