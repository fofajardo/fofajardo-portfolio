import {
  nav, projects
} from "$lib/data.json";

export function load() {
	return {
		projects, nav
	};
}
