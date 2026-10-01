<script lang="ts">
  import { formatDate, getMonthName, getCalendarDate } from "$lib/utils";
  import type { BlogPost } from "$lib/lib.types";

  const { data, tag } = $props();
  const posts = $derived(data.posts ?? []);
  const emptyMessage = $derived(data.emptyMessage);
  const isYear = $derived(Boolean(data.year));
  const isYearMonth = $derived(Boolean(data.year && data.month));
  const groupedPosts = $derived(data.groupedPosts ?? new Map());
</script>

{#snippet postCard(post: BlogPost, showDate = true)}
  <a class="card-anchor" href="/blog/{post.year}/{post.month}/{post.slug}">
    <div class="card">
      <div class="card-detail blog-card-detail">
        <div class="card-header blog-card-header">
          <span class="card-title blog-card-title">{post.title}</span>
          {#if post.description}
            <p class="blog-card-desc">{post.description}</p>
          {/if}
          {#if showDate}
            <span class="blog-card-date">{formatDate(post.date)}</span>
          {/if}
        </div>
      </div>
    </div>
  </a>
{/snippet}

{#if posts.length === 0}
  <p>
    {emptyMessage ?? (tag ? "No blog posts found with this tag." : "No blog posts found.")}
  </p>
{:else if isYearMonth}
  <div class="cardset list">
    {#each posts as post (post.slug)}
      {@render postCard(post, true)}
    {/each}
  </div>
{:else}
  {#each groupedPosts as [year, months] (year)}
    {#if !isYear}
      <h2 id={year}>
        <a href="/blog/{year}" class="heading-link">{year}</a>
      </h2>
    {/if}
    {#each months as [month, monthPosts] (month)}
      <h3 id="{year}-{month}">
        <a href="/blog/{year}/{month}" class="heading-link">{getMonthName(month)}</a>
      </h3>
      <div class="timeline-group">
        {#each monthPosts as post (post.slug)}
          {@const cal = getCalendarDate(post.date)}
          <div class="timeline-item">
            <div class="timeline-side">
              <div class="calendar-badge" aria-hidden="true">
                <span class="calendar-header">{cal.weekday}</span>
                <span class="calendar-day">{cal.day}</span>
              </div>
            </div>
            <div class="timeline-content cardset list">
              {@render postCard(post, false)}
            </div>
          </div>
        {/each}
      </div>
    {/each}
  {/each}
{/if}

<style>
  .heading-link {
    color: inherit;
    text-decoration: none;
  }
  .heading-link:hover,
  .heading-link:focus {
    color: var(--text-link);
    text-decoration: underline;
  }
  .timeline-group {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
  .timeline-item {
    display: flex;
    align-items: stretch;
    gap: 1.25em;
    position: relative;
  }
  .timeline-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 3.75rem;
    flex-shrink: 0;
    position: relative;
  }
  .calendar-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    background: var(--bg-surface);
    border-radius: 10px;
    overflow: hidden;
    color: var(--text-main);
    z-index: 1;
    user-select: none;
    pointer-events: none;
    cursor: default;
  }
  .calendar-header {
    width: 100%;
    background: var(--bg-surface-hover);
    color: var(--text-link);
    font-size: 0.7em;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-align: center;
    padding: 0.25em 0;
    text-transform: uppercase;
  }
  .calendar-day {
    font-family: monospace;
    font-size: 1.5em;
    font-weight: 900;
    line-height: 1.1;
    padding: 0.2em 0 0.25em;
    color: var(--text-main);
  }
  .timeline-item:not(:last-child) .timeline-side::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 2em;
    bottom: -3em;
    width: 2px;
    background: var(--bg-surface-hover);
    z-index: 0;
  }
  .timeline-content {
    flex: 1;
    min-width: 0;
  }
  @media screen and (max-width: 625px) {
    .timeline-side {
      width: 3rem;
    }
    .calendar-badge {
      width: 3rem;
      border-radius: 8px;
    }
    .calendar-header {
      font-size: 0.6em;
    }
    .calendar-day {
      font-size: 1.25em;
      padding: 0.15em 0 0.2em;
    }
    .timeline-item {
      gap: 0.75em;
    }
  }
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
