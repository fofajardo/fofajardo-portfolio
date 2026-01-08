import {
	experience, nav, talks, volunteering
} from '$lib/data.json';

export function load() {
	return {
		experience, volunteering, talks, nav
	};
}
