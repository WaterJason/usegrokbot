import { readFile, writeFile } from "node:fs/promises";
import { youtubeBookmarks } from "../data/bookmarks";
import { youtubeVideoId } from "../lib/youtube";
import { fetchPublicYouTubeViews, type YouTubeViewStats } from "../lib/youtube-public-views";

async function main() {
  const path = "data/youtube-views.json";
  const previous: Record<string, YouTubeViewStats> = JSON.parse(await readFile(path, "utf8"));
  const ids = [...new Set(youtubeBookmarks.map(item => youtubeVideoId(item.url)).filter((id): id is string => id !== null))];
  let refreshed = 0;
  const entries = await Promise.all(ids.map(async id => {
    try {
      const stats = await fetchPublicYouTubeViews(id);
      refreshed++;
      return [id, stats] as const;
    } catch {
      console.warn(`Could not refresh ${id}; retaining its previous count and date.`);
      return [id, previous[id] ?? null] as const;
    }
  }));
  if (!refreshed) throw new Error("No YouTube counts refreshed; snapshot unchanged.");
  await writeFile(path, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`);
  console.log(`Refreshed ${refreshed}/${ids.length} YouTube view counts.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
