<script lang="ts">
  import { formatDate } from "$lib/utils";

  const { data, tag } = $props();
  const posts = $derived(data.posts ?? []);
  const emptyMessage = $derived(data.emptyMessage);
</script>

{#if posts.length === 0}
  <p>
    {emptyMessage ?? (tag ? "No blog posts found with this tag." : "No blog posts found.")}
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
