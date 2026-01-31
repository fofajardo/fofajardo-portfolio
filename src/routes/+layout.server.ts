import { nav } from "$lib/dataService";

export const prerender = true;

export function load() {
  return {
    nav
  };
}
