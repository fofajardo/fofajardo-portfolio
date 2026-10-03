import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  GOOGLE_ANALYTICS_ID: {
    public: true
  }
});
