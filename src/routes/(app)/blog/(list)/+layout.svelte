<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import LinkAnchor from "$lib/LinkAnchor.svelte";

  const { children } = $props();
  const posts = $derived(page.data.posts ?? []);
  const tag = $derived(page.data.tag);

  function handleTagClick(e: MouseEvent, t: string) {
    e.stopPropagation();
    e.preventDefault();
    if (t !== tag) {
      goto(`/blog/tag/${t}`);
    }
  }
</script>

<svelte:head>
  <title>{tag ? `Posts tagged #${tag}` : "Blog"} - Francis Dominic Fajardo</title>
</svelte:head>

<div class="heading-container">
  <div class="heading-content">
    <h1>{tag ? `Posts tagged #${tag}` : "Blog"}</h1>
    <LinkAnchor
      link={{
        type: "external",
        url: "/feed.xml",
        label: "RSS",
        icon: "tabler:rss"
      }}
      isButton
    />
  </div>
</div>

<section class="content-layout">
  {#if posts.length === 0}
    <p>No blog posts found{tag ? ` with this tag` : ""}.</p>
  {:else}
    <div class="cardset list">
      {#each posts as post (post.slug)}
        <a class="card-anchor" href="/blog/{post.slug}">
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
