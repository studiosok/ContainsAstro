// @ts-check
import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

export default defineConfig({
  server: { port: 4000, host: true },
  devToolbar: { enabled: false },
  adapter: node({
    mode: "standalone"
  })
});