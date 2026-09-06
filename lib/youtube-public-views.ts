export type YouTubeViewStats = { count: number; checkedAt: string };

// Read only the requested video's details, never counts from recommendations.
// Parse data as JSON; do not execute any scripts from the YouTube page.
export function parseYouTubeViews(html: string, videoId: string): number | null {
  const marker = /"videoDetails"\s*:\s*\{/g;
  for (const match of html.matchAll(marker)) {
    const start = match.index! + match[0].length - 1;
    let depth = 0;
    let quoted = false;
    let escaped = false;
    for (let i = start; i < html.length; i++) {
      const char = html[i];
      if (quoted) {
        if (escaped) escaped = false;
        else if (char === "\\") escaped = true;
        else if (char === '"') quoted = false;
      } else if (char === '"') quoted = true;
      else if (char === "{") depth++;
      else if (char === "}" && --depth === 0) {
        try {
          const details = JSON.parse(html.slice(start, i + 1));
          if (details.videoId !== videoId) break;
          if (typeof details.viewCount !== "string" || !/^\d+$/.test(details.viewCount)) break;
          const count = Number(details.viewCount);
          if (Number.isSafeInteger(count) && count >= 0) return count;
        } catch {
          // Missing or changed public metadata is unavailable, not zero views.
        }
        break;
      }
    }
  }
  return null;
}

export async function fetchPublicYouTubeViews(videoId: string): Promise<YouTubeViewStats> {
  if (!/^[A-Za-z0-9_-]{11}$/.test(videoId)) throw new Error("Invalid YouTube video ID");
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { Accept: "text/html", "User-Agent": "UseGrokBot/1.0 (+https://usegrokbot.com)" },
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error(`YouTube returned ${response.status}`);
  const count = parseYouTubeViews(await response.text(), videoId);
  if (count === null) throw new Error("YouTube view count missing");
  return { count, checkedAt: new Date().toISOString() };
}
