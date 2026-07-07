<script lang="ts" module>
  import { writable } from "svelte/store";

  let nextNum = 1;
  export const tablesStore = writable<Record<string, number>>({});

  export function resetTableCounter() {
    nextNum = 1;
    tablesStore.set({});
  }

  function registerTable(id: string): number {
    let currentNum = 0;
    tablesStore.update((store) => {
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
  const props = $props<{
    caption?: string;
    id: string;
    children?: import("svelte").Snippet;
  }>();

  const num = registerTable(props.id);
</script>

<div id={props.id} class="blog-table-wrapper">
  {#if props.children}
    {@render props.children()}
  {/if}
  {#if props.caption}
    <div class="blog-table-caption">
      <strong>Table {num}.</strong>
      {props.caption}
    </div>
  {/if}
</div>

<style>
  .blog-table-wrapper {
    margin: 1.5em 0;
    width: 100%;
  }
  .blog-table-caption {
    margin-top: 0.5em;
    font-size: 0.85em;
    opacity: 0.85;
    text-align: center;
  }
</style>
