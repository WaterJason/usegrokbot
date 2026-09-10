import type { Locale } from "./types";

export type TeamSubmitUiCopy = {
  teamIntro: string;
  stepOne: string;
  submitTitle: string;
  submitLead: string;
  submitHelp: string;
  submitReview: string;
  xUrl: string;
  xUrlHint: string;
  previewTitle: string;
  previewBody: string;
  previewPlaceholder: string;
  optionalTitle: string;
  optionalHint: string;
  prompt: string;
  notes: string;
  notesHint: string;
  missing: string;
  invalidUrl: string;
  skipped: string;
  failed: string;
  send: string;
};

export const teamSubmitUiCopy: Record<Locale, TeamSubmitUiCopy> = {
  en: {
    teamIntro: "Choose your situation, then see the matching Bot Team templates.",
    stepOne: "Step 1",
    submitTitle: "Share how you use Grok Bot",
    submitLead: "Paste a public X post link.",
    submitHelp:
      "The site reads the author, the apps, and the result from that post. If it passes the check, it appears on the site.",
    submitReview:
      "A person does not approve ordinary posts. We do not invent result numbers. If the post has no number, it is published as Output.",
    xUrl: "Public X post link",
    xUrlHint: "Use a public x.com or twitter.com post link.",
    previewTitle: "Your GrokCases identity",
    previewBody:
      "Paste an X link to see your community Blob. The same account always gets the same one.",
    previewPlaceholder: "Your Grok Bot",
    optionalTitle: "Optional details",
    optionalHint: "Add a prompt or notes only if the post is not enough.",
    prompt: "Prompt (optional)",
    notes: "Notes (optional)",
    notesHint: "Write only what the post does not make obvious.",
    missing: "Please paste an X post link first.",
    invalidUrl: "Please use a public x.com or twitter.com post link. Private links cannot be used.",
    skipped: "This post was not published.",
    failed: "The post could not be read now. Please try again.",
    send: "Submit this post",
  },
  "zh-Hant": {
    teamIntro: "先選你現在的情況，再看對應的 Bot 團隊模板。",
    stepOne: "第一步",
    submitTitle: "分享你怎麼使用 Grok Bot",
    submitLead: "貼上公開的 X 貼文連結。",
    submitHelp: "網站會讀這則貼文裡的作者、用到的應用和結果。通過檢查後，就會出現在網站上。",
    submitReview: "一般情況不用等人批准。我們不會自己編造結果數字。原帖沒有數字，就會標成產出。",
    xUrl: "公開 X 貼文連結",
    xUrlHint: "請使用公開的 x.com 或 twitter.com 貼文連結。",
    previewTitle: "你的 GrokCases 身份",
    previewBody: "貼上 X 連結後，會出現你的社群形象。同一個帳號永遠是同一隻。",
    previewPlaceholder: "你的 Grok Bot",
    optionalTitle: "選填內容",
    optionalHint: "如果貼文還不夠清楚，再補上提示詞或備註。",
    prompt: "提示詞（選填）",
    notes: "備註（選填）",
    notesHint: "原帖看不出來的內容才寫。",
    missing: "請先貼上 X 貼文連結。",
    invalidUrl: "請貼公開的 x.com 或 twitter.com 貼文連結。私人連結不能使用。",
    skipped: "這則貼文沒有上架。",
    failed: "現在無法讀取這則貼文。請稍後再試。",
    send: "提交這則貼文",
  },
  "zh-Hans": {
    teamIntro: "先选你现在的情况，再看对应的 Bot 团队模板。",
    stepOne: "第一步",
    submitTitle: "分享你怎么使用 Grok Bot",
    submitLead: "贴上公开的 X 帖子链接。",
    submitHelp: "网站会读这则帖子里的作者、用到的应用和结果。通过检查后，就会出现在网站上。",
    submitReview: "一般情况不用等人批准。我们不会自己编造结果数字。原帖没有数字，就会标成产出。",
    xUrl: "公开 X 帖子链接",
    xUrlHint: "请使用公开的 x.com 或 twitter.com 帖子链接。",
    previewTitle: "你的 GrokCases 身份",
    previewBody: "贴上 X 链接后，会出现你的社区形象。同一个账号永远是同一只。",
    previewPlaceholder: "你的 Grok Bot",
    optionalTitle: "选填内容",
    optionalHint: "如果帖子还不够清楚，再补上提示词或备注。",
    prompt: "提示词（选填）",
    notes: "备注（选填）",
    notesHint: "原帖看不出来的内容才写。",
    missing: "请先贴上 X 帖子链接。",
    invalidUrl: "请贴公开的 x.com 或 twitter.com 帖子链接。私人链接不能使用。",
    skipped: "这则帖子没有上架。",
    failed: "现在无法读取这则帖子。请稍后再试。",
    send: "提交这则帖子",
  },
  ja: {
    teamIntro: "今の状況を選ぶと、合う Bot チームのテンプレートが出ます。",
    stepOne: "手順 1",
    submitTitle: "Grok Bot の使い方を共有する",
    submitLead: "公開の X 投稿リンクを貼ってください。",
    submitHelp:
      "サイトはその投稿から作者、使ったアプリ、結果を読み取ります。確認を通れば、サイトに表示されます。",
    submitReview:
      "通常の投稿に人の承認は不要です。結果の数字は作りません。投稿に数字がなければ、出力と表示します。",
    xUrl: "公開の X 投稿リンク",
    xUrlHint: "公開の x.com または twitter.com の投稿リンクを使ってください。",
    previewTitle: "あなたの GrokCases の姿",
    previewBody:
      "X のリンクを貼ると、コミュニティ用の Blob がすぐに現れます。同じユーザー名なら、いつも同じ姿です。",
    previewPlaceholder: "あなたの Grok Bot",
    optionalTitle: "任意の詳細",
    optionalHint: "投稿だけでは足りないときだけ、プロンプトやメモを足してください。",
    prompt: "プロンプト（任意）",
    notes: "メモ（任意）",
    notesHint: "投稿だけでは分からないことだけ書いてください。",
    missing: "先に X 投稿のリンクを貼ってください。",
    invalidUrl: "公開の x.com または twitter.com の投稿リンクを使ってください。非公開のリンクは使えません。",
    skipped: "この投稿は公開されませんでした。",
    failed: "今はこの投稿を読み取れません。あとでもう一度試してください。",
    send: "この投稿を送る",
  },
};

export function teamSubmitCopy(locale: Locale): TeamSubmitUiCopy {
  return teamSubmitUiCopy[locale] ?? teamSubmitUiCopy.en;
}
