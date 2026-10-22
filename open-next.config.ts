import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// ponytail: no incremental cache yet — ISR pages (revalidate 60) re-render per request on Workers.
// Add an R2/KV incremental cache when traffic grows: https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({});
