import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/estate-snapshot", "/practice-areas", "/about", "/privacy", "/disclaimer"].map((p) => ({
    url: `${SITE.baseUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8,
  }));
  const landing = getAllSlugs().map((s) => ({
    url: `${SITE.baseUrl}/${s}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7,
  }));
  return [...core, ...landing];
}
