import { writeFile } from "node:fs/promises";
import { githubBookmarks } from "../data/bookmarks";
import { getGithubResourceStars } from "../lib/github-resource-stars";

async function main() {
  const stats = await getGithubResourceStars(githubBookmarks.map((item) => item.url));
  await writeFile("data/github-resource-stars.json", `${JSON.stringify(stats, null, 2)}\n`);
  console.log(`Saved star counts for ${Object.values(stats).filter(Boolean).length} GitHub resources.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
