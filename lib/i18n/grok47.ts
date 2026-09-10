import type { Grok47CategorySlug } from "@/data/grok47";
import type { Locale } from "./types";

export type Grok47Copy = {
  metaTitle: string;
  metaDescription: string;
  brand: string;
  skip: string;
  explore: string;
  about: string;
  unofficial: string;
  builtWith: string;
  modelName: string;
  discover: string;
  exploreCollection: string;
  dragStars: string;
  replay: string;
  pause: string;
  play: string;
  spiralAria: string;
  everyone: string;
  originalPosts: string;
  creations: string;
  collectionEmpty: string;
  collectionEmptyHint: string;
  all: string;
  featured: string;
  latest: string;
  filterAria: string;
  sortAria: string;
  aboutCreation: string;
  viewOnX: string;
  postedPrompt: string;
  copyPrompt: string;
  copied: string;
  savePrompt: string;
  savedPrompt: string;
  noPrompt: string;
  promptsChip: string;
  vaultTitle: string;
  vaultBody: string;
  vaultCount: string;
  vaultEmpty: string;
  vaultSearch: string;
  collectorTitle: string;
  collectorBody: string;
  urlLabel: string;
  urlPlaceholder: string;
  pasteLabel: string;
  pastePlaceholder: string;
  extract: string;
  extractedEmpty: string;
  authorLabel: string;
  saveLocal: string;
  savedLocal: string;
  exportJson: string;
  removeLocal: string;
  sampleBadge: string;
  sampleNote: string;
  footerMark: string;
  footerLegal: string;
  backHome: string;
  themeToLight: string;
  themeToDark: string;
  langLabel: string;
  follow: string;
  categories: Record<Grok47CategorySlug, string>;
};

export const grok47Copy: Record<Locale, Grok47Copy> = {
  en: {
    metaTitle: "Grok 4.7 Hub",
    metaDescription: "An unofficial showcase of things made with Grok 4.7, plus prompts collected from the original X posts.",
    brand: "Grok 4.7 Hub",
    skip: "Skip to content",
    explore: "Explore",
    about: "About Grok 4.7",
    unofficial: "An unofficial showcase of things made with Grok 4.7",
    builtWith: "Built with",
    modelName: "Grok 4.7.",
    discover: "Discover what people are making with Grok 4.7.",
    exploreCollection: "Explore the collection",
    dragStars: "Drag to explore the stars",
    replay: "Replay the star spiral",
    pause: "Pause motion",
    play: "Play motion",
    spiralAria: "Interactive star spiral. Drag or use the arrow keys to rotate. Home resets the view.",
    everyone: "Grok 4.7, in the hands of everyone.",
    originalPosts: "Find out more in the creators’ original X posts.",
    creations: "creations",
    collectionEmpty: "Grok 4.7 is not public yet.",
    collectionEmptyHint: "When people post work made with it, the original X posts will appear here.",
    all: "All",
    featured: "Featured",
    latest: "Latest",
    filterAria: "Filter by category",
    sortAria: "Sort posts",
    aboutCreation: "About this creation",
    viewOnX: "View on X",
    postedPrompt: "Posted prompt",
    copyPrompt: "Copy prompt",
    copied: "Copied",
    savePrompt: "Save to vault",
    savedPrompt: "Saved",
    noPrompt: "No reusable prompt in this post.",
    promptsChip: "Prompts",
    vaultTitle: "Prompts, pulled from the posts.",
    vaultBody: "If a creator pasted the prompt in the X post, it is collected here. You can also paste a post and extract one locally — nothing leaves this browser.",
    vaultCount: "prompts",
    vaultEmpty: "No posted prompts yet. They will be collected from the X posts once Grok 4.7 is out.",
    vaultSearch: "Search prompts",
    collectorTitle: "Collect a prompt from a post",
    collectorBody: "Paste an X URL and the post text. If the prompt is in a code fence or after “Prompt:”, it is pulled out.",
    urlLabel: "X post URL",
    urlPlaceholder: "https://x.com/name/status/…",
    pasteLabel: "Post text",
    pastePlaceholder: "Paste the post, including the prompt if it is in the text.",
    extract: "Extract prompt",
    extractedEmpty: "No prompt found. You can still type one below and save it.",
    authorLabel: "Name (optional)",
    saveLocal: "Save locally",
    savedLocal: "Saved in this browser",
    exportJson: "Export JSON",
    removeLocal: "Remove",
    sampleBadge: "Sample",
    sampleNote: "Waiting for Grok 4.7 to ship. This page does not invent posts.",
    footerMark: "Grok 4.7 Hub",
    footerLegal:
      "An unofficial showcase of things made with Grok 4.7. Not affiliated with or endorsed by xAI or X. Original posts and media remain on X. Summaries describe creators’ claims.",
    backHome: "GrokCases",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    langLabel: "Display language",
    follow: "Follow",
    categories: {
      video: "Video",
      images: "Images",
      coding: "Coding",
      apps: "Apps / Websites",
      agents: "Agents",
      research: "Research",
    },
  },
  "zh-Hant": {
    metaTitle: "Grok 4.7 Hub",
    metaDescription: "非正式展示用 Grok 4.7 做出來的東西，並收集創作者貼在 X 帖文裡的提示詞。",
    brand: "Grok 4.7 Hub",
    skip: "跳到內容",
    explore: "瀏覽",
    about: "關於 Grok 4.7",
    unofficial: "非正式展示：用 Grok 4.7 做出來的東西",
    builtWith: "Built with",
    modelName: "Grok 4.7.",
    discover: "看看大家用 Grok 4.7 在做什麼。",
    exploreCollection: "瀏覽作品",
    dragStars: "拖曳探索星圖",
    replay: "重播星螺旋",
    pause: "暫停動態",
    play: "播放動態",
    spiralAria: "可互動的星螺旋。拖曳或用方向鍵旋轉。Home 重設視角。",
    everyone: "Grok 4.7，在每個人手上。",
    originalPosts: "詳情見創作者的原始 X 帖文。",
    creations: "件作品",
    collectionEmpty: "Grok 4.7 尚未公開。",
    collectionEmptyHint: "待有人貼出用它做出來的作品，原始 X 帖文會出現在這裡。",
    all: "全部",
    featured: "精選",
    latest: "最新",
    filterAria: "依類別篩選",
    sortAria: "排序",
    aboutCreation: "關於這件作品",
    viewOnX: "在 X 查看",
    postedPrompt: "帖文裡的提示詞",
    copyPrompt: "複製提示詞",
    copied: "已複製",
    savePrompt: "存入提示詞庫",
    savedPrompt: "已保存",
    noPrompt: "這則帖文沒有可重用的提示詞。",
    promptsChip: "提示詞",
    vaultTitle: "從帖文抽出的提示詞。",
    vaultBody: "創作者若把提示詞寫在 X 帖文裡，會收集到這裡。你也可以在本機貼上帖文再抽出——資料不會離開瀏覽器。",
    vaultCount: "則提示詞",
    vaultEmpty: "尚無帖文裡的提示詞。等 Grok 4.7 推出後，才會從真實帖文收集。",
    vaultSearch: "搜尋提示詞",
    collectorTitle: "從帖文收集提示詞",
    collectorBody: "貼上 X 網址與帖文內容。若提示詞在程式碼區塊或「Prompt:」之後，會自動抽出。",
    urlLabel: "X 帖文網址",
    urlPlaceholder: "https://x.com/name/status/…",
    pasteLabel: "帖文內容",
    pastePlaceholder: "貼上帖文。若文中有提示詞，一併貼上。",
    extract: "抽出提示詞",
    extractedEmpty: "沒有找到提示詞。你仍可在下方自行填寫後保存。",
    authorLabel: "名稱（可選）",
    saveLocal: "在本機保存",
    savedLocal: "已保存在這個瀏覽器",
    exportJson: "匯出 JSON",
    removeLocal: "移除",
    sampleBadge: "範例",
    sampleNote: "等待 Grok 4.7 推出。本頁不會虛構帖文。",
    footerMark: "Grok 4.7 Hub",
    footerLegal:
      "非正式展示用 Grok 4.7 做出來的東西。與 xAI 或 X 無關，亦未經其背書。原始帖文與媒體仍在 X。摘要只轉述創作者的說法。",
    backHome: "GrokCases",
    themeToLight: "切換淺色主題",
    themeToDark: "切換深色主題",
    langLabel: "顯示語言",
    follow: "跟隨",
    categories: {
      video: "影片",
      images: "圖像",
      coding: "程式",
      apps: "應用／網站",
      agents: "Agents",
      research: "研究",
    },
  },
  "zh-Hans": {
    metaTitle: "Grok 4.7 Hub",
    metaDescription: "非正式展示用 Grok 4.7 做出来的东西，并收集创作者贴在 X 帖文里的提示词。",
    brand: "Grok 4.7 Hub",
    skip: "跳到内容",
    explore: "浏览",
    about: "关于 Grok 4.7",
    unofficial: "非正式展示：用 Grok 4.7 做出来的东西",
    builtWith: "Built with",
    modelName: "Grok 4.7.",
    discover: "看看大家用 Grok 4.7 在做什么。",
    exploreCollection: "浏览作品",
    dragStars: "拖曳探索星图",
    replay: "重播星螺旋",
    pause: "暂停动态",
    play: "播放动态",
    spiralAria: "可互动的星螺旋。拖曳或用方向键旋转。Home 重置视角。",
    everyone: "Grok 4.7，在每个人手上。",
    originalPosts: "详情见创作者的原始 X 帖文。",
    creations: "件作品",
    collectionEmpty: "Grok 4.7 尚未公开。",
    collectionEmptyHint: "待有人贴出用它做出来的作品，原始 X 帖文会出现在这里。",
    all: "全部",
    featured: "精选",
    latest: "最新",
    filterAria: "按类别筛选",
    sortAria: "排序",
    aboutCreation: "关于这件作品",
    viewOnX: "在 X 查看",
    postedPrompt: "帖文里的提示词",
    copyPrompt: "复制提示词",
    copied: "已复制",
    savePrompt: "存入提示词库",
    savedPrompt: "已保存",
    noPrompt: "这则帖文没有可重用的提示词。",
    promptsChip: "提示词",
    vaultTitle: "从帖文抽出的提示词。",
    vaultBody: "创作者若把提示词写在 X 帖文里，会收集到这里。你也可以在本机贴上帖文再抽出——数据不会离开浏览器。",
    vaultCount: "则提示词",
    vaultEmpty: "尚无帖文里的提示词。等 Grok 4.7 推出后，才会从真实帖文收集。",
    vaultSearch: "搜索提示词",
    collectorTitle: "从帖文收集提示词",
    collectorBody: "贴上 X 网址与帖文内容。若提示词在代码块或“Prompt:”之后，会自动抽出。",
    urlLabel: "X 帖文网址",
    urlPlaceholder: "https://x.com/name/status/…",
    pasteLabel: "帖文内容",
    pastePlaceholder: "贴上帖文。若文中有提示词，一并贴上。",
    extract: "抽出提示词",
    extractedEmpty: "没有找到提示词。你仍可在下方自行填写后保存。",
    authorLabel: "名称（可选）",
    saveLocal: "在本机保存",
    savedLocal: "已保存在这个浏览器",
    exportJson: "导出 JSON",
    removeLocal: "移除",
    sampleBadge: "示例",
    sampleNote: "等待 Grok 4.7 推出。本页不会虚构帖文。",
    footerMark: "Grok 4.7 Hub",
    footerLegal:
      "非正式展示用 Grok 4.7 做出来的东西。与 xAI 或 X 无关，亦未经其背书。原始帖文与媒体仍在 X。摘要只转述创作者的说法。",
    backHome: "GrokCases",
    themeToLight: "切换浅色主题",
    themeToDark: "切换深色主题",
    langLabel: "显示语言",
    follow: "关注",
    categories: {
      video: "视频",
      images: "图像",
      coding: "编程",
      apps: "应用／网站",
      agents: "Agents",
      research: "研究",
    },
  },
  ja: {
    metaTitle: "Grok 4.7 Hub",
    metaDescription: "Grok 4.7 で作られたものの非公式ショーケース。元の X 投稿から集めたプロンプト付き。",
    brand: "Grok 4.7 Hub",
    skip: "本文へ",
    explore: "見る",
    about: "Grok 4.7 について",
    unofficial: "Grok 4.7 で作られたものの非公式ショーケース",
    builtWith: "Built with",
    modelName: "Grok 4.7.",
    discover: "みんなが Grok 4.7 で何を作っているか。",
    exploreCollection: "作品を見る",
    dragStars: "ドラッグして星を探る",
    replay: "星の渦を再生",
    pause: "動きを止める",
    play: "動きを再生",
    spiralAria: "操作できる星の渦。ドラッグまたは矢印キーで回転。Home で視点を戻す。",
    everyone: "Grok 4.7 を、みんなの手に。",
    originalPosts: "詳しくは作者の元の X 投稿を。",
    creations: "件",
    collectionEmpty: "Grok 4.7 はまだ公開されていません。",
    collectionEmptyHint: "公開後、それで作られた作品の元の X 投稿がここに並びます。",
    all: "すべて",
    featured: "注目",
    latest: "最新",
    filterAria: "カテゴリで絞り込む",
    sortAria: "並び替え",
    aboutCreation: "この作品について",
    viewOnX: "X で見る",
    postedPrompt: "投稿内のプロンプト",
    copyPrompt: "プロンプトをコピー",
    copied: "コピーした",
    savePrompt: "保管庫に保存",
    savedPrompt: "保存済み",
    noPrompt: "この投稿に再利用できるプロンプトはない。",
    promptsChip: "プロンプト",
    vaultTitle: "投稿から抜き出したプロンプト。",
    vaultBody: "作者が X 投稿にプロンプトを書いていれば、ここに集める。投稿を貼って抜き出すこともできる。データはこのブラウザから出ない。",
    vaultCount: "件のプロンプト",
    vaultEmpty: "まだ投稿内のプロンプトはない。Grok 4.7 公開後に、本物の投稿から集める。",
    vaultSearch: "プロンプトを検索",
    collectorTitle: "投稿からプロンプトを集める",
    collectorBody: "X の URL と本文を貼る。コードフェンスや「Prompt:」のあとにあれば抜き出す。",
    urlLabel: "X 投稿 URL",
    urlPlaceholder: "https://x.com/name/status/…",
    pasteLabel: "投稿本文",
    pastePlaceholder: "投稿を貼る。プロンプトがあれば一緒に。",
    extract: "プロンプトを抜き出す",
    extractedEmpty: "プロンプトが見つからない。下に書いて保存してもよい。",
    authorLabel: "名前（任意）",
    saveLocal: "この端末に保存",
    savedLocal: "このブラウザに保存した",
    exportJson: "JSON を書き出す",
    removeLocal: "削除",
    sampleBadge: "サンプル",
    sampleNote: "Grok 4.7 の公開を待っている。このページは投稿を捏造しない。",
    footerMark: "Grok 4.7 Hub",
    footerLegal:
      "Grok 4.7 で作られたものの非公式ショーケース。xAI および X とは無関係で、後援も受けていない。元の投稿とメディアは X 上にある。要約は作者の主張の言い換え。",
    backHome: "GrokCases",
    themeToLight: "ライトテーマに切り替え",
    themeToDark: "ダークテーマに切り替え",
    langLabel: "表示言語",
    follow: "フォロー",
    categories: {
      video: "動画",
      images: "画像",
      coding: "コード",
      apps: "アプリ／サイト",
      agents: "Agents",
      research: "研究",
    },
  },
};
