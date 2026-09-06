import assert from "node:assert/strict";
import { getGithubRepositoryStars } from "../lib/github";
import { getGithubResourceStars } from "../lib/github-resource-stars";
import saved from "../data/github-resource-stars.json";
import { githubBookmarks } from "../data/bookmarks";

async function main() {
  const originalFetch = globalThis.fetch;
  try {
    const date = "Sun, 06 Sep 2026 01:00:00 GMT";
    globalThis.fetch = async () => Response.json({ stargazers_count: 0 }, { headers: { date } });
    assert.deepEqual(await getGithubRepositoryStars("example/repo"), {
      count: 0, checkedAt: "2026-09-06T01:00:00.000Z",
    }, "Zero stars must remain visible and retain the source date");

    for (const value of [-1, 1.5, "241", null]) {
      globalThis.fetch = async () => Response.json({ stargazers_count: value });
      assert.equal(await getGithubRepositoryStars("example/repo"), null);
    }

    const url = "https://github.com/RongleCat/awesome-grok-bot";
    for (const failure of ["rate-limit", "network"] as const) {
      globalThis.fetch = async () => {
        if (failure === "network") throw new Error("Offline");
        return new Response(null, { status: 403 });
      };
      const result = await getGithubResourceStars([url, "https://github.com/example/unknown"]);
      assert.deepEqual(result[url], saved[url], "Use the verified snapshot during a GitHub failure");
      assert.equal(result["https://github.com/example/unknown"], null, "Unknown is not zero");
    }

    let calls = 0;
    globalThis.fetch = async () => { calls++; return Response.json({ stargazers_count: 321 }); };
    assert.equal(await getGithubRepositoryStars("https://untrusted.example/repo"), null);
    assert.equal(calls, 0, "Invalid repository names must not trigger requests");
    const latest = await getGithubResourceStars([url, url]);
    assert.equal(latest[url]?.count, 321, "Fresh counts must replace the snapshot");
    assert.equal(calls, 1, "Each repository should only be requested once");

    for (const item of githubBookmarks) {
      const stats = saved[item.url as keyof typeof saved];
      assert.ok(stats && Number.isSafeInteger(stats.count) && stats.count >= 0, `${item.id}: missing verified count`);
      assert.ok(Number.isFinite(Date.parse(stats.checkedAt)), `${item.id}: missing source date`);
    }
    console.log("GitHub star counts: zero, invalid data, caching date, fallback, deduplication and catalog coverage passed.");
  } finally {
    globalThis.fetch = originalFetch;
  }
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
