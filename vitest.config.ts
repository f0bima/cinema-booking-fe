/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import { configDefaults } from "vitest/config";
import path from "path";

export default getViteConfig(
  {
    test: {
      globals: true,
      // environment: "node",
      environment: "happy-dom",
      setupFiles: "./vitest.setup.ts",
      include: ["src/**/*.test.{ts,tsx,js}"],
      exclude: [
        ...configDefaults.exclude,
        "packages/template/*",
        "src/components/ui/*",
      ],

      coverage: {
        provider: "v8", // bisa juga 'istanbul' kalau kamu mau laporan yang lebih rinci
        reporter: ["text", "html", "json-summary"],
        reportsDirectory: "./coverage",
        exclude: [
          "node_modules/",
          "dist/",
          "dist/**",
          "dist/server/**",
          "src/components/ui/**",
          "vite.config.*",
          "vitest.setup.ts",
          "**/__tests__/**",
          "**/build/**",
          // SHADCN UI

          "src/common/presentation/component/shadcn/ui/**",
        ],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  {
    site: "https://example.com/",
    trailingSlash: "always",
  },
);
