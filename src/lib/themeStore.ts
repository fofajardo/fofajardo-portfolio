import { writable } from "svelte/store";

export type ThemeType = "device" | "light" | "dark" | "green" | "amber";

const isBrowser = typeof window !== "undefined";

const initialTheme = isBrowser
  ? (localStorage.getItem("theme") as ThemeType) || "device"
  : "device";

export const themeStore = writable<ThemeType>(initialTheme);

if (isBrowser) {
  themeStore.subscribe((theme) => {
    localStorage.setItem("theme", theme);

    const html = document.documentElement;
    // Remove all existing theme classes
    html.classList.remove(
      "theme-device",
      "theme-light",
      "theme-dark",
      "theme-green",
      "theme-amber"
    );

    // Add current theme class
    html.classList.add(`theme-${theme}`);
  });
}
