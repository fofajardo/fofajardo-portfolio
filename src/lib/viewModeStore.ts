import { writable } from "svelte/store";
import { browser } from "$app/environment";

const defaultValue = "grid";
const initialValue = browser
  ? (window.localStorage.getItem("projectsViewMode") ?? defaultValue)
  : defaultValue;

export const viewModeStore = writable<string>(initialValue);

if (browser) {
  viewModeStore.subscribe((value) => {
    window.localStorage.setItem("projectsViewMode", value);
  });
}
