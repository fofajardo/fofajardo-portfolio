import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  GOOGLE_ANALYTICS_ID: {
    public: true,
    static: true
  },
  RESUME_URL: {
    public: true,
    static: true
  }
});
