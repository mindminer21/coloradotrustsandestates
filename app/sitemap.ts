import type { MetadataRoute } from "next";
import { getPillarEntries } from "@/lib/pillars";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const core = ["", "/estate-snapshot", "/practice-areas", "/about", "/privacy", "/disclaimer"].map((p) => ({
    url: `${SITE.baseUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8,
  }));
  const landing = getPillarEntries().map((entry) => ({
    url: `${SITE.baseUrl}${entry.path}`, lastModified: now, changeFrequency: "weekly" as const, priority: entry.type === "problem" ? 0.8 : 0.7,
  }));
  return [...core, ...landing];
}
