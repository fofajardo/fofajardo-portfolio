<script lang="ts" module>
  import { writable } from "svelte/store";

  let nextNum = 1;
  export const figures = writable<Record<string, number>>({});

  export function resetFigureCounter() {
    nextNum = 1;
    figures.set({});
  }

  function registerFigure(id: string): number {
    let currentNum = 0;
    figures.update((store) => {
      if (id in store) {
        currentNum = store[id];
        return store;
      }
      currentNum = nextNum++;
      return { ...store, [id]: currentNum };
    });
    return currentNum;
  }
</script>

<script lang="ts">
  const { src, alt, caption, id } = $props<{
    src: string;
    alt: string;
    caption?: string;
    id: string;
  }>();

  // `id` is presumed to be immutable.
  // svelte-ignore state_referenced_locally
  const num = registerFigure(id);
</script>

<figure {id} class="blog-figure">
  <div class="blog-figure-img-wrapper">
    <img {src} {alt} />
  </div>
  {#if caption}
    <figcaption class="blog-figcaption">
      <strong>Figure {num}:</strong>
      {caption}
    </figcaption>
  {/if}
</figure>

<style>
  .blog-figure {
    margin: 1.5em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .blog-figure-img-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .blog-figure img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  .blog-figcaption {
    margin-top: 0.5em;
    font-size: 0.85em;
    opacity: 0.85;
    text-align: center;
  }
</style>
