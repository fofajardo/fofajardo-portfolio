import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  return {
    title: "λ",
    absoluteTitle: true,
    description: "Francis Dominic Fajardo's Start Page",
    ogType: "website"
  };
};
