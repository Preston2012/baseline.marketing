import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = [
  "/",
  "/features/",
  "/methodology/",
  "/ethos/",
  "/pricing/",
  "/what-we-dont-do/",
  "/built/",
  "/press/",
  "/support/",
  "/privacy/",
  "/terms/",
  "/eula/",
  "/do-not-sell-or-share/"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-01");
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified
  }));
}
