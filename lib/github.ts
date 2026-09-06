import { site } from "@/lib/site";

const REVALIDATE_SECONDS = 3600;

export type GithubRepositoryStars = { count: number; checkedAt: string };

export async function getGithubStars(repo = site.githubRepo): Promise<number | null> {
  return (await getGithubRepositoryStars(repo))?.count ?? null;
}

export async function getGithubRepositoryStars(repo: string): Promise<GithubRepositoryStars | null> {
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo)) return null;
  try {
    const headers = new Headers({
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "usegrokbot.com",
    });
    const token = process.env.GITHUB_TOKEN;
    if (token) headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github-stars"] },
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { stargazers_count?: unknown };
    if (typeof data.stargazers_count !== "number" ||
      !Number.isSafeInteger(data.stargazers_count) || data.stargazers_count < 0) return null;
    // Preserve the origin timestamp when Next.js serves a cached response.
    const responseDate = Date.parse(response.headers.get("date") ?? "");
    return {
      count: data.stargazers_count,
      checkedAt: new Date(Number.isFinite(responseDate) ? responseDate : Date.now()).toISOString(),
    };
  } catch {
    return null;
  }
}
