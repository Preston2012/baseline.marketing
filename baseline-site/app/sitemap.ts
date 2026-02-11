import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = [
  "/",
  "/methodology/",
  "/pricing/",
  "/press/",
  "/support/",
  "/privacy/",
  "/terms/",
  "/eula/",
  "/do-not-sell-or-share/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  /* Audit fix: hardcode launch date for static export reliability */
  const lastModified = new Date("2026-02-08");
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified
  }));
}
