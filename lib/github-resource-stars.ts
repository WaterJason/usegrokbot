import snapshot from "@/data/github-resource-stars.json";
import { getGithubRepositoryStars, type GithubRepositoryStars } from "@/lib/github";

export type GithubResourceStars = GithubRepositoryStars;

export type GithubResourceStarMap = Record<string, GithubResourceStars | null>;

const savedStars: GithubResourceStarMap = snapshot;

export async function getGithubResourceStars(urls: readonly string[]): Promise<GithubResourceStarMap> {
  const entries = await Promise.all(
    [...new Set(urls)].map(async (url) => {
      const repo = url.replace("https://github.com/", "");
      const stats = await getGithubRepositoryStars(repo) ?? savedStars[url] ?? null;
      return [url, stats] as const;
    }),
  );
  return Object.fromEntries(entries);
}
