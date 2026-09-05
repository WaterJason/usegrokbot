import {
  catalogEntry,
  getTemplateStory,
  templateCopy,
  type BotTemplate,
} from "@/data/templates";
import type { LocalizedTemplateGroup } from "@/data/template-identities";
import { localizeDiscoverStory } from "@/lib/i18n/discover";
import { localizeTemplateCopy } from "@/lib/i18n/templates";
import type { Locale } from "@/lib/i18n/types";

export type TemplateBrowserCopy = {
  searchLabel: string;
  searchPlaceholder: string;
  searchClear: string;
  clearAll: string;
  resultCount: string;
  emptySearch: string;
  emptySearchHint: string;
  openInGrokBot: string;
  clusterJumpLabel: string;
  sectionJumpLabel: string;
};

export const templateBrowserCopy = {
  en: {
    searchLabel: "Search these templates",
    searchPlaceholder: "Search by title, description, or author",
    searchClear: "Clear search",
    clearAll: "Clear search and filters",
    resultCount: "{n} templates",
    emptySearch: "No public templates match this search.",
    emptySearchHint: "Try another word, or clear the search and filters to see the list again.",
    openInGrokBot: "Open in Grok Bot",
    clusterJumpLabel: "Jump to an identity group",
    sectionJumpLabel: "Jump to a section",
  },
  "zh-Hant": {
    searchLabel: "搜尋這些模板",
    searchPlaceholder: "以標題、說明或作者搜尋",
    searchClear: "清除搜尋",
    clearAll: "清除搜尋與篩選",
    resultCount: "{n} 個模板",
    emptySearch: "沒有符合這個搜尋的公開模板。",
    emptySearchHint: "可以換一個詞，或清除搜尋與篩選後再看完整列表。",
    openInGrokBot: "在 Grok Bot 開啟",
    clusterJumpLabel: "跳到身份類別",
    sectionJumpLabel: "跳到這個身份的分類",
  },
  "zh-Hans": {
    searchLabel: "搜索这些模板",
    searchPlaceholder: "以标题、说明或作者搜索",
    searchClear: "清除搜索",
    clearAll: "清除搜索与筛选",
    resultCount: "{n} 个模板",
    emptySearch: "没有符合这个搜索的公开模板。",
    emptySearchHint: "可以换一个词，或清除搜索与筛选后再看完整列表。",
    openInGrokBot: "在 Grok Bot 开启",
    clusterJumpLabel: "跳到身份类别",
    sectionJumpLabel: "跳到这个身份的分类",
  },
  ja: {
    searchLabel: "これらのテンプレートを検索",
    searchPlaceholder: "タイトル、説明、作者で検索",
    searchClear: "検索を消す",
    clearAll: "検索と条件をクリア",
    resultCount: "{n} 件のテンプレート",
    emptySearch: "この検索に合う公開テンプレートはありません。",
    emptySearchHint: "別の言葉を試すか、検索と条件を消してもう一度一覧を見てください。",
    openInGrokBot: "Grok Bot で開く",
    clusterJumpLabel: "立場のグループへ移動",
    sectionJumpLabel: "この立場の分類へ移動",
  },
} satisfies Record<Locale, TemplateBrowserCopy>;

export function interpolateTemplateBrowserCopy(
  value: string,
  vars: Record<string, string | number>,
) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] === undefined ? "{" + key + "}" : String(vars[key]),
  );
}

export type LocalizedTemplateFields = {
  title: string;
  oneLiner: string;
  body: string;
  englishTitle: string;
  englishOneLiner: string;
  englishBody: string;
  catalogBody: string;
  authorName: string;
  handle?: string;
  xPostUrl?: string;
  postText: string;
};

export function localizedTemplateFields(
  item: BotTemplate,
  locale: Locale,
): LocalizedTemplateFields {
  const story = getTemplateStory(item);
  const localizedStory = story ? localizeDiscoverStory(story, locale) : undefined;
  const englishStory = story ? localizeDiscoverStory(story, "en") : undefined;
  const fallbackStory = localizedStory ?? englishStory ?? {
    title: item.authorName,
    headline: "",
    body: "",
  };
  const englishFallbackStory = englishStory ?? fallbackStory;
  const localized = templateCopy(item, fallbackStory);
  const english = templateCopy(item, englishFallbackStory);
  const catalog = catalogEntry(item.id);
  const copy = localizeTemplateCopy(item.id, locale, {
    title: localized.title,
    oneLiner: localized.oneLiner,
    body: catalog?.body,
  });
  const englishCopy = localizeTemplateCopy(item.id, "en", {
    title: english.title,
    oneLiner: english.oneLiner,
    body: catalog?.body,
  });
  const postText = (
    locale === "en"
      ? localizedStory?.body || catalog?.body || copy.oneLiner
      : copy.body || localizedStory?.body || copy.oneLiner
  ).trim();

  return {
    title: copy.title,
    oneLiner: copy.oneLiner,
    body: copy.body,
    englishTitle: englishCopy.title,
    englishOneLiner: englishCopy.oneLiner,
    englishBody: englishCopy.body,
    catalogBody: catalog?.body ?? "",
    authorName: item.authorName,
    handle: item.handle,
    xPostUrl: item.xPostUrl ?? story?.xPostUrl ?? story?.sourceUrl,
    postText,
  };
}

/** Keep one source excerpt from appearing again as both title and description. */
export function templateCardCopy(title: string, description: string) {
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();
  const normalize = (text: string) => text.toLowerCase().replace(/[\p{P}\p{Z}\s]/gu, "");
  const normalizedTitle = normalize(cleanTitle);
  const normalizedDescription = normalize(cleanDescription);
  if (normalizedTitle === normalizedDescription) return { title: cleanTitle, description: "" };
  if (/[.…]{1,3}$/.test(cleanTitle) && normalizedTitle.length >= 30 && normalizedDescription.startsWith(normalizedTitle)) {
    return { title: cleanDescription, description: "" };
  }
  return { title: cleanTitle, description: cleanDescription };
}

export function templateSearchHaystack(item: BotTemplate, locale: Locale) {
  const fields = localizedTemplateFields(item, locale);
  return [
    fields.title,
    fields.oneLiner,
    fields.body,
    fields.englishTitle,
    fields.englishOneLiner,
    fields.englishBody,
    fields.catalogBody,
    fields.authorName,
    fields.handle,
  ]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

export function filterTemplatesByQuery<T extends BotTemplate>(
  items: readonly T[],
  query: string,
  locale: Locale,
): readonly T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return items;
  return items.filter((item) => templateSearchHaystack(item, locale).includes(needle));
}

const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "your",
  "you",
  "for",
  "to",
  "of",
  "a",
  "an",
  "in",
  "on",
  "this",
  "that",
  "then",
  "more",
  "want",
  "bot",
  "help",
  "what",
]);

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .match(/[\p{L}\p{N}]{2,}/gu) ?? [];
}

type FocusText = Record<string, string>;
type GroupRef = Pick<LocalizedTemplateGroup, "slug" | "title" | "description">;

function groupText(group: GroupRef) {
  return [group.slug.replace(/[-_]/g, " "), group.title, group.description]
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
}

export function matchFocusToGroup(
  focus: FocusText,
  groups: readonly GroupRef[],
  englishGroups: readonly GroupRef[] = groups,
): GroupRef | undefined {
  const candidates = groups.filter((group) => group.slug !== "recommended");
  if (!candidates.length) return undefined;

  const englishBySlug = new Map(englishGroups.map((group) => [group.slug, group]));
  const focusValues = Object.values(focus)
    .map((value) => value.trim())
    .filter(Boolean);
  const focusTokens = new Set(
    focusValues.flatMap(tokenize).filter((token) => !STOP_WORDS.has(token)),
  );

  const scored = candidates
    .map((group) => {
      const english = englishBySlug.get(group.slug);
      const haystack = [groupText(group), english ? groupText(english) : ""]
        .filter(Boolean)
        .join("\n");
      let score = 0;

      for (const value of focusValues) {
        const needle = value.toLowerCase();
        if (!needle) continue;
        if (group.title.trim().toLowerCase() === needle) score += 10;
        else if (english?.title.trim().toLowerCase() === needle) score += 10;
        else if (haystack.includes(needle)) score += 5;
      }

      const slugTokens = tokenize(group.slug).filter((token) => !STOP_WORDS.has(token));
      if (focusTokens.has(group.slug) || (slugTokens.length && slugTokens.every((token) => focusTokens.has(token)))) {
        score += 6;
      } else if (slugTokens.some((token) => focusTokens.has(token))) {
        score += 3;
      }

      const groupTokens = new Set(tokenize(haystack).filter((token) => !STOP_WORDS.has(token)));
      for (const token of focusTokens) {
        if (!groupTokens.has(token)) continue;
        score += /[\u4e00-\u9fff]/.test(token) || token.length >= 4 ? 2 : 1;
      }

      return { group, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score);

  if (!scored.length) return undefined;
  if (scored.length > 1 && scored[0].score === scored[1].score) return undefined;
  if (scored[0].score < 4) return undefined;
  return scored[0].group;
}
