import type { Locale } from "./types";

type ReadingUiCopy = {
  copyFailed: string;
  articleSections: string;
  chooseRole: string;
  chooseCategory: string;
  clearFilters: string;
  officialIntro: string;
  roleHint: string;
  taskHint: string;
};

export const readingUiCopy: Record<Locale, ReadingUiCopy> = {
  en: {
    copyFailed: "Could not copy. Try again",
    articleSections: "Jump to a section",
    chooseRole: "Choose a role",
    chooseCategory: "Category",
    clearFilters: "Clear filters",
    officialIntro: "Explore the roles published by xAI. Copy a role description into your Bot; some also include a starter prompt for your conversation.",
    roleHint: "Paste into your Bot's description to explain what it should help you do.",
    taskHint: "Paste into your Bot conversation when you are ready to begin.",
  },
  "zh-Hant": {
    copyFailed: "未能複製，請再試",
    articleSections: "快速前往",
    chooseRole: "選擇一個角色",
    chooseCategory: "分類",
    clearFilters: "清除篩選",
    officialIntro: "查看 xAI 發布的官方角色。把角色介紹貼進 Bot 描述，說明它要幫你做什麼；部分角色另附可貼進對話的起始提示詞。",
    roleHint: "貼進 Bot 描述，說明它要幫你做什麼。",
    taskHint: "準備好後，貼進 Bot 對話開始使用。",
  },
  "zh-Hans": {
    copyFailed: "未能复制，请重试",
    articleSections: "快速前往",
    chooseRole: "选择一个角色",
    chooseCategory: "分类",
    clearFilters: "清除筛选",
    officialIntro: "查看 xAI 发布的官方角色。把角色介绍粘贴到 Bot 描述，说明它要帮你做什么；部分角色另附可粘贴到对话的起始提示词。",
    roleHint: "粘贴到 Bot 描述，说明它要帮你做什么。",
    taskHint: "准备好后，粘贴到 Bot 对话开始使用。",
  },
  ja: {
    copyFailed: "コピーできません。再試行",
    articleSections: "セクションへ移動",
    chooseRole: "役割を選ぶ",
    chooseCategory: "カテゴリー",
    clearFilters: "絞り込みを解除",
    officialIntro: "xAI が公開した公式の役割です。役割の説明を Bot の説明欄に貼り付けます。一部には会話を始めるためのプロンプトもあります。",
    roleHint: "Bot の説明欄に貼り付けて、何を手伝うかを伝えます。",
    taskHint: "準備ができたら、Bot との会話に貼り付けて始めましょう。",
  },
};
