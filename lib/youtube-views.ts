import { unstable_cache } from "next/cache";
import snapshot from "@/data/youtube-views.json";
import { youtubeVideoId } from "@/lib/youtube";
import { fetchPublicYouTubeViews, type YouTubeViewStats } from "@/lib/youtube-public-views";

export type YouTubeViewMap = Record<string, YouTubeViewStats | null>;
const savedViews: YouTubeViewMap = snapshot;

// Cache just the statistics. Keep a daily checked snapshot when YouTube blocks
// requests from hosting networks; never replace a known count with zero.
const getCachedVideoViews = unstable_cache(
  fetchPublicYouTubeViews,
  ["youtube-public-views-v2"],
  { revalidate: 86_400, tags: ["youtube-views"] },
);

export async function getYouTubeViews(urls: readonly string[]): Promise<YouTubeViewMap> {
  const ids = [...new Set(urls.map(youtubeVideoId).filter((id): id is string => id !== null))];
  return Object.fromEntries(await Promise.all(ids.map(async (id) => {
    try {
      const current = await getCachedVideoViews(id);
      const saved = savedViews[id];
      return [id, saved && saved.checkedAt > current.checkedAt ? saved : current];
    } catch {
      return [id, savedViews[id] ?? null];
    }
  })));
}
