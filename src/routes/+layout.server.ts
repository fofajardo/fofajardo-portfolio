import { contacts, nav } from "#lib/dataService.js";

export const prerender = true;

export function load() {
  return {
    contacts,
    nav
  };
}
