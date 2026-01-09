import {
  experience, talks, volunteering
} from "$lib/content/data.json";

export function load() {
	return {
		experience, volunteering, talks
	};
}
