import type { Locale } from "./types";

type HomeDiscoveryCopy = {
  intro: string;
  chooseIdentity: string;
  seeExamples: string;
  identityHint: string;
};

export const homeDiscoveryCopy: Record<Locale, HomeDiscoveryCopy> = {
  en: {
    intro: "Find a Bot that helps with what you do. Use a template, or see what others have made.",
    chooseIdentity: "Find my Bot",
    seeExamples: "See real examples",
    identityHint: "Choose a familiar starting point. See what a Bot can help you do.",
  },
  "zh-Hant": {
    intro: "找一個能幫你做事的 Bot。可以先用現成模板，也可以先看別人怎麼用。",
    chooseIdentity: "找適合我的 Bot",
    seeExamples: "先看真實使用案例",
    identityHint: "選一個適合你的身份，看看 Bot 能幫你做什麼。",
  },
  "zh-Hans": {
    intro: "找一个能帮你做事的 Bot。可以先用现成模板，也可以先看别人怎么用。",
    chooseIdentity: "找适合我的 Bot",
    seeExamples: "先看真实使用案例",
    identityHint: "选一个适合你的身份，看看 Bot 能帮你做什么。",
  },
  ja: {
    intro: "やりたいことを手伝う Bot を見つけましょう。テンプレートから始めるか、実際の活用例を見てみましょう。",
    chooseIdentity: "自分に合う Bot を探す",
    seeExamples: "実際の活用例を見る",
    identityHint: "自分に近い立場を選んで、Bot が何を手伝えるか見てみましょう。",
  },
};
