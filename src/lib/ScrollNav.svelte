<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import Icon from "./Icon.svelte";
  import { isSidebarOpen } from "./Sidebar.svelte";

  const routes = ["/", "/about", "/projects", "/blog"];
  let visible = $state(false);
  let isMobile = $state(false);
  let cooldown = false;
  let touchStartX = 0;

  const currentPath = $derived(page.url.pathname);
  const currentIndex = $derived(routes.indexOf(currentPath));
  const isFirstPage = $derived(currentIndex === 0);
  const isLastPage = $derived(currentIndex === routes.length - 1);

  const hintText = $derived.by(() => {
    if (isMobile) {
      if (isFirstPage) {
        return "Swipe left to explore";
      }
      return "Swipe left for next page";
    }

    if (isFirstPage) {
      return "Scroll down to explore";
    }
    return "Scroll down for next page";
  });

  function handleNavigate(direction: "next" | "prev") {
    if (cooldown || isSidebarOpen()) {
      return;
    }
    const currentPath = page.url.pathname;
    const currentIndex = routes.indexOf(currentPath);
    if (currentIndex === -1) {
      return;
    }

    let targetIndex = currentIndex;
    if (direction === "next") {
      targetIndex = currentIndex + 1;
    } else {
      targetIndex = currentIndex - 1;
    }

    if (targetIndex >= 0 && targetIndex < routes.length) {
      cooldown = true;
      goto(routes[targetIndex]);
      setTimeout(() => {
        cooldown = false;
      }, 1000);
    }
  }

  function handleWheel(event: WheelEvent) {
    const deltaY = event.deltaY;
    if (Math.abs(deltaY) < 30) {
      return;
    }

    const docEl = document.documentElement;
    const isAtTop = window.scrollY <= 2;
    const isAtBottom = window.scrollY + window.innerHeight >= docEl.scrollHeight - 5;

    if (deltaY > 0 && isAtBottom) {
      handleNavigate("next");
    } else if (deltaY < 0 && isAtTop) {
      handleNavigate("prev");
    }
  }

  function handleTouchStart(event: TouchEvent) {
    if (event.touches.length > 0) {
      touchStartX = event.touches[0].clientX;
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (event.changedTouches.length === 0) {
      return;
    }
    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX > 0) {
      handleNavigate("next");
    } else {
      handleNavigate("prev");
    }
  }

  function handleScroll() {
    if (currentIndex === -1 || isLastPage) {
      visible = false;
      return;
    }

    if (isFirstPage) {
      visible = window.scrollY < 50;
      return;
    }

    const currentScrollY = window.scrollY;
    const docEl = document.documentElement;
    const isAtBottom = currentScrollY + window.innerHeight >= docEl.scrollHeight - 25;

    if (isAtBottom) {
      visible = true;
    } else {
      visible = false;
    }
  }

  $effect(() => {
    if (isFirstPage) {
      visible = true;
    } else {
      visible = false;
    }
  });

  onMount(() => {
    isMobile =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    if (isFirstPage) {
      visible = true;
    }
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

{#if visible && !isLastPage}
  <div class="scroll-hint" transition:fade={{ duration: 300 }}>
    <span>{hintText}</span>
    <Icon icon="tabler:arrow-right" width="16" height="16" />
  </div>
{/if}

<style>
  .scroll-hint {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-main);
    background: rgba(128, 128, 128, 0.05);
    border: 1px solid rgba(128, 128, 128, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    padding: 0.4rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    white-space: nowrap;
    pointer-events: none;
    transition: opacity 0.3s ease;
    animation: bounce-horizontal 2s infinite;
  }

  .scroll-hint span,
  .scroll-hint :global(.iconify) {
    opacity: 0.65;
  }

  @keyframes bounce-horizontal {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateX(-50%) translateX(0);
    }
    40% {
      transform: translateX(-50%) translateX(6px);
    }
    60% {
      transform: translateX(-50%) translateX(3px);
    }
  }
</style>
