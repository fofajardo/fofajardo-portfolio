<script lang="ts">
  import { themeStore } from "$lib/themeStore";
  let { variant }: { variant?: "footer" | null } = $props();
</script>

<div class="theme-switcher {variant}">
  <button
    onclick={() => themeStore.set("device")}
    class="theme-btn theme-btn-device"
    class:active={$themeStore === "device"}
    title="Device night/day"
    aria-label="Device theme"
  ></button>
  <button
    onclick={() => themeStore.set("light")}
    class="theme-btn theme-btn-light"
    class:active={$themeStore === "light"}
    title="Light"
    aria-label="Light theme"
  ></button>
  <button
    onclick={() => themeStore.set("dark")}
    class="theme-btn theme-btn-dark"
    class:active={$themeStore === "dark"}
    title="Dark"
    aria-label="Dark theme"
  ></button>
  <button
    onclick={() => themeStore.set("green")}
    class="theme-btn theme-btn-green"
    class:active={$themeStore === "green"}
    title="Green"
    aria-label="Green theme"
  ></button>
  <button
    onclick={() => themeStore.set("amber")}
    class="theme-btn theme-btn-amber"
    class:active={$themeStore === "amber"}
    title="Amber"
    aria-label="Amber theme"
  ></button>
</div>

<style>
  .theme-switcher {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .theme-switcher.footer {
    margin-top: 1em;
    opacity: 0.5;
  }
  @media screen and (max-width: 768px) {
    .theme-switcher.footer {
      display: none;
    }
  }
  .theme-switcher .theme-btn {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid var(--text-link);
    transition: border-color 0.2s;
    padding: 0;
  }
  .theme-btn:hover {
    border-color: var(--text-link-hover);
  }
  .theme-btn.active {
    border-color: var(--text-main);
  }
  .theme-btn-device {
    background: linear-gradient(to right, #ffffff 50%, #0f1115 50%);
  }
  .theme-btn-light {
    background: #ffffff;
  }
  .theme-btn-dark {
    background: #0f1115;
  }
  .theme-btn-green {
    background: #052e16;
  }
  .theme-btn-amber {
    background: #451a03;
  }
</style>
