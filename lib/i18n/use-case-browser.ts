import type { VerifiedUseCase } from "@/data/verified-use-cases";
import type { Locale } from "./types";
import { localizeVerifiedUseCase } from "./verified-use-cases";

type UseCaseBrowserCopy = {
  filters: string;
  filtersTitle: string;
  closeFilters: string;
  showResults: (count: number) => string;
  selectedFilters: string;
  clearFilters: string;
  resultCount: (count: number) => string;
  categoriesLabel: string;
  helpsLabel: string;
  prepareLabel: string;
  startLabel: string;
  pasteHint: string;
  preparePrompt: string;
  prepareSetup: string;
  prepareTeam: string;
  startPrompt: string;
  startSetup: string;
  startFromStep: (step: string) => string;
  originalPrompt: string;
  removeFilter: (label: string) => string;
  filterCount: (count: number) => string;
};

const copyByLocale: Record<Locale, UseCaseBrowserCopy> = {
  en: {
    filters: "Filters",
    filtersTitle: "More filters",
    closeFilters: "Close filters",
    showResults: (count) => (count === 1 ? "Show 1 use case" : `Show ${count} use cases`),
    selectedFilters: "Selected",
    clearFilters: "Clear filters",
    resultCount: (count) => (count === 1 ? "1 use case" : `${count} use cases`),
    categoriesLabel: "Categories",
    helpsLabel: "What this helps you do",
    prepareLabel: "What to prepare",
    startLabel: "How to start",
    pasteHint: "Copy this, then paste it into Grok Bot.",
    preparePrompt: "You need Grok Bot and this source prompt.",
    prepareSetup: "You need Grok Bot and the shared setup below.",
    prepareTeam: "Review the shared team setup below to see which Bots it uses.",
    startPrompt: "Copy the prompt, then paste it into Grok Bot.",
    startSetup: "Follow the shared setup from the first step.",
    startFromStep: (step) => `Start with this: ${step}`,
    originalPrompt: "Original prompt",
    removeFilter: (label) => `Remove ${label}`,
    filterCount: (count) => (count === 1 ? "1 selected" : `${count} selected`),
  },
  "zh-Hant": {
    filters: "篩選",
    filtersTitle: "更多條件",
   closeFilters: "關閉篩選",
    showResults: (count) => `查看 ${count} 個使用案例`,
   selectedFilters: "已選條件",
   clearFilters: "清除篩選",
    resultCount: (count) => `${count} 個使用案例`,
   categoriesLabel: "分類",
    helpsLabel: "幫你做什麼",
    prepareLabel: "需要準備什麼",
    startLabel: "如何開始",
   pasteHint: "複製後，貼到 Grok Bot 裡。",
    preparePrompt: "你需要 Grok Bot，以及這段來源提示詞。",
   prepareSetup: "你需要 Grok Bot，以及下面的公開設定。",
    prepareTeam: "先查看下面的 Bot 團隊設定，確認會用到哪些 Bot。",
    startPrompt: "複製提示詞，然後貼到 Grok Bot 裡。",
   startSetup: "從公開設定的第一步開始。",
   startFromStep: (step) => `從這一步開始：${step}`,
    originalPrompt: "原文提示詞",
   removeFilter: (label) => `移除${label}`,
    filterCount: (count) => `已選 ${count} 項`,
  },
  "zh-Hans": {
    filters: "筛选",
    filtersTitle: "更多条件",
   closeFilters: "关闭筛选",
    showResults: (count) => `查看 ${count} 个使用案例`,
   selectedFilters: "已选条件",
   clearFilters: "清除筛选",
    resultCount: (count) => `${count} 个使用案例`,
   categoriesLabel: "分类",
    helpsLabel: "帮你做什么",
    prepareLabel: "需要准备什么",
    startLabel: "如何开始",
   pasteHint: "复制后，贴到 Grok Bot 里。",
    preparePrompt: "你需要 Grok Bot，以及这段来源提示词。",
   prepareSetup: "你需要 Grok Bot，以及下面的公开设置。",
    prepareTeam: "先查看下面的 Bot 团队设置，确认会用到哪些 Bot。",
    startPrompt: "复制提示词，然后贴到 Grok Bot 里。",
   startSetup: "从公开设置的第一步开始。",
   startFromStep: (step) => `从这一步开始：${step}`,
    originalPrompt: "原文提示词",
   removeFilter: (label) => `移除${label}`,
    filterCount: (count) => `已选 ${count} 项`,
  },
  ja: {
    filters: "絞り込み",
    filtersTitle: "ほかの条件",
    closeFilters: "条件を閉じる",
    showResults: (count) => `${count} 件の活用例を見る`,
    selectedFilters: "選んだ条件",
    clearFilters: "条件をクリア",
    resultCount: (count) => `${count} 件の活用例`,
    categoriesLabel: "カテゴリー",
    helpsLabel: "何を手伝ってくれるか",
    prepareLabel: "用意するもの",
    startLabel: "始め方",
    pasteHint: "コピーして、Grok Bot に貼り付けます。",
    preparePrompt: "Grok Bot と、この元のプロンプトが必要です。",
    prepareSetup: "Grok Bot と、下の公開設定が必要です。",
    prepareTeam: "下の公開チーム設定で、使う Bot を確認します。",
    startPrompt: "プロンプトをコピーして、Grok Bot に貼り付けます。",
    startSetup: "公開設定の最初の手順から始めます。",
    startFromStep: (step) => `まずこれからです：${step}`,
    originalPrompt: "元のプロンプト",
    removeFilter: (label) => `${label} を外す`,
    filterCount: (count) => `${count} 件選択中`,
  },
};

export function useCaseBrowserCopy(locale: Locale) {
  return copyByLocale[locale];
}

export function useCaseStartGuide(item: VerifiedUseCase, locale: Locale) {
  const copy = useCaseBrowserCopy(locale);
  const localized = localizeVerifiedUseCase(item, locale);
  const firstStep = localized.setupSteps[0];

  return {
    helps: localized.title,
    prepare:
      item.evidence === "prompt"
        ? copy.preparePrompt
        : item.structure === "team"
          ? copy.prepareTeam
          : copy.prepareSetup,
    start:
      item.evidence === "prompt"
        ? copy.startPrompt
        : firstStep
          ? copy.startFromStep(firstStep)
          : copy.startSetup,
  };
}

export type { UseCaseBrowserCopy };
