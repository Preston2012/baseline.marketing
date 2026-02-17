import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = [
  "/",
  "/features/",
  "/methodology/",
  "/ethos/",
  "/pricing/",
  "/what-we-dont-do/",
  "/press/",
  "/support/",
  "/privacy/",
  "/terms/",
  "/eula/",
  "/do-not-sell-or-share/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-02-17");
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified
  }));
}
