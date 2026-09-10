/** Compare complete statements, so a shared opening never hides a condition. */
export function repeatsReadingCopy(text: string | undefined, shown: readonly string[]) {
  if (!text?.trim()) return true;
  const normalize = (value: string) => value.toLowerCase().replace(/[\p{P}\p{Z}\s]/gu, "");
  const needle = normalize(text);
  return shown.some((value) => normalize(value) === needle);
}

/** Import provenance is shown once with the source, rather than as a how-to. */
export function isImportedStoryExplanation(text: string) {
  return [
    "GrokCases ingested this public X post.",
    "This public X post is a first-person Grok Bot case.",
    "Elon Musk reposted or quoted this original Grok Bot post.",
    "This public X Article / long-form write-up is a Grok Bot case.",
    "This public case was surfaced through the awesome-grok-bot Field Cases index.",
    "A public example of someone handing work to Grok Bot, kept here with attribution.",
    "It is a concrete public example of work being handed to Grok Bot, with the original source kept for context.",
    "It is a public Grok Bot post Elon Musk boosted.",
  ].some((prefix) => text.startsWith(prefix));
}
