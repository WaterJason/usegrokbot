import type { Locale } from "@/lib/i18n/types";

export const grok47CategorySlugs = [
  "video",
  "images",
  "coding",
  "apps",
  "agents",
  "research",
] as const;

export type Grok47CategorySlug = (typeof grok47CategorySlugs)[number];

export type Localized = Record<Locale, string>;

export type Grok47Creation = {
  id: string;
  title: Localized;
  summary: Localized;
  postText: Localized;
  category: Grok47CategorySlug;
  featured: boolean;
  publishedAt: string;
  authorName: string;
  handle: string;
  verified?: boolean;
  xPostUrl?: string;
  prompt?: string;
  media?: { kind: "image" | "video"; label: Localized };
};

export type CollectedPrompt = {
  id: string;
  sourceId?: string;
  sourceUrl: string;
  authorName: string;
  handle: string;
  postText: string;
  prompt: string;
  category: Grok47CategorySlug | "unspecified";
  savedAt: string;
  origin: "catalog" | "local";
};

/** Empty until Grok 4.7 is public and real X posts can be wired in. */
export const grok47Creations: Grok47Creation[] = [];

const PROMPT_FENCE = /```(?:prompt|text|markdown)?\s*\n([\s\S]*?)```/gi;
const PROMPT_LABEL =
  /(?:^|\n)\s*(?:prompt|system prompt|提示詞|提示词|プロンプト)\s*[:：]\s*([\s\S]+)/i;

export function extractPromptFromPost(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  const fences = [...trimmed.matchAll(PROMPT_FENCE)]
    .map((match) => match[1].trim())
    .filter(Boolean);
  if (fences.length > 0) return fences.join("\n\n");

  const labeled = trimmed.match(PROMPT_LABEL);
  if (labeled?.[1]) {
    const body = labeled[1].trim();
    const firstBlock = body.split(/\n\s*\n/)[0]?.trim();
    if (firstBlock && firstBlock.length >= 12) return firstBlock;
  }

  return null;
}

export function parseXStatusUrl(value: string): { handle: string; id: string } | null {
  try {
    const url = new URL(value.trim());
    if (!/(^|\.)((x|twitter)\.com)$/i.test(url.hostname)) return null;
    const match = url.pathname.match(/^\/([^/]+)\/status\/(\d+)/);
    if (!match) return null;
    return { handle: match[1], id: match[2] };
  } catch {
    return null;
  }
}

export function collectedFromCreation(item: Grok47Creation, locale: Locale): CollectedPrompt | null {
  if (!item.prompt) return null;
  return {
    id: `catalog:${item.id}`,
    sourceId: item.id,
    sourceUrl: item.xPostUrl ?? "",
    authorName: item.authorName,
    handle: item.handle,
    postText: item.postText[locale],
    prompt: item.prompt,
    category: item.category,
    savedAt: item.publishedAt,
    origin: "catalog",
  };
}

export function grok47PromptCount(items: Grok47Creation[] = grok47Creations) {
  return items.filter((item) => Boolean(item.prompt)).length;
}
