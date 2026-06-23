import type { Config } from "@react-router/dev/config";
import publications from "./app/data/publications.js";

const articlePaths = publications.flatMap((yearGroup) =>
  yearGroup.articles.map((article) => `/publications/${article.id}`)
);

export default {
  ssr: false,
  prerender: [
    "/",
    "/publications",
    "/speaking",
    "/testimonials",
    "/cv",
    "/prototype",
    ...articlePaths,
  ],
} satisfies Config;