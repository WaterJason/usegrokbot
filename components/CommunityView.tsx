"use client";

import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { communityProfileUrl, type CommunityIdentity } from "@/data/community";
import { useI18n } from "@/lib/i18n";

export type GitHubContributor = {
  login: string;
  contributions: number;
  htmlUrl: string;
};

export function CommunityView({
  identities,
  contributors,
}: {
  identities: CommunityIdentity[];
  contributors: GitHubContributor[];
}) {
  const { locale } = useI18n();
  const copy = communityCopy(locale);

  return (
    <div className="mx-auto max-w-[1120px] px-5 py-8 md:px-8 md:py-12">
      <div className="max-w-[760px]">
        <h1 className="ui-page-title">{copy.title}</h1>
        <p className="ui-page-intro mt-4">{copy.body}</p>
        <LocaleLink
          href="/submit"
          className="accent-gradient mt-6 inline-flex h-11 items-center rounded-[10px] px-5 text-[15px] font-medium text-inverse"
        >
          {copy.submit} →
        </LocaleLink>
      </div>

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 className="ui-section-title">{copy.builders}</h2>
            <p className="ui-body mt-3 text-mute">{copy.buildersBody}</p>
          </div>
          <a
            href="https://github.com/a70win-wq/usegrokbot/graphs/contributors"
            target="_blank"
            rel="noreferrer"
            className="ui-meta hidden shrink-0 pb-1 text-mute hover:text-ink sm:inline"
          >
            {copy.github} ↗
          </a>
        </div>

        {contributors.length ? (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contributors.map((person) => (
              <a
                key={person.login}
                href={person.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex min-w-0 items-start gap-3 rounded-2xl border border-line bg-card px-4 py-4 transition hover:border-line-strong"
              >
                <BlobatarAvatar name={`github:${person.login}`} size={56} expression="smug" />
                <div className="min-w-0">
                  <p className="ui-card-title">@{person.login}</p>
                  <p className="ui-meta mt-1.5 text-mute">
                    <span className="ui-count font-medium">{person.contributions}</span> {copy.contributions}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="ui-body mt-6 rounded-2xl border border-line bg-elevated px-5 py-6 text-mute">
            {copy.buildersFallback}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="ui-section-title">{copy.zoo}</h2>
        <p className="ui-body mt-3 max-w-2xl text-mute">{copy.zooBody}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {identities.map((person) => (
            <a
              key={person.handle}
              href={communityProfileUrl(person.handle)}
              target="_blank"
              rel="noopener noreferrer"
              data-community-handle={person.handle}
              className="group flex min-w-0 items-start gap-3 rounded-2xl border border-line bg-card px-4 py-4 transition hover:border-line-strong"
            >
              <BlobatarAvatar name={person.handle} size={56} expression="happy" />
              <span className="min-w-0">
                <span className="ui-card-title block">{person.name}</span>
                <span className="ui-meta mt-1 block text-mute">@{person.handle}</span>
                <span className="ui-meta mt-1.5 block text-mute">
                  <span className="ui-count font-medium">{person.count}</span> {person.count === 1 ? copy.case : copy.cases}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function communityCopy(locale: string) {
  if (locale === "zh-Hant") {
    return {
      title: "UseGrokBot 社群",
      body: "認識分享真實案例的人，以及一起改善 UseGrokBot 的開源貢獻者。",
      submit: "分享你的使用案例",
      builders: "開源貢獻者",
      buildersBody: "一起改善網站、程式和內容的人。",
      github: "在 GitHub 查看",
      contributions: "次貢獻",
      buildersFallback: "貢獻者資料暫時未能載入，你仍可前往 GitHub 查看。",
      zoo: "精選分享者",
      zooBody: "按已分享的公開案例數量精選。每張卡片會直接開啟作者的 X 個人頁。",
      case: "個案例",
      cases: "個案例",
    };
  }
  if (locale === "zh-Hans") {
    return {
      title: "UseGrokBot 社区",
      body: "认识分享真实案例的人，以及一起改善 UseGrokBot 的开源贡献者。",
      submit: "分享你的使用案例",
      builders: "开源贡献者",
      buildersBody: "一起改善网站、程序和内容的人。",
      github: "在 GitHub 查看",
      contributions: "次贡献",
      buildersFallback: "贡献者数据暂时未能加载，你仍可前往 GitHub 查看。",
      zoo: "精选分享者",
      zooBody: "按已分享的公开案例数量精选。每张卡片会直接打开作者的 X 个人页。",
      case: "个案例",
      cases: "个案例",
    };
  }
  if (locale === "ja") {
    return {
      title: "UseGrokBot コミュニティ",
      body: "実際の Grok Bot 例を共有する人と、UseGrokBot を支えるオープンソースの貢献者を紹介します。",
      submit: "あなたの Grok Bot を追加",
      builders: "コミュニティの作り手",
      buildersBody: "UseGrokBot を支えるオープンソースの貢献者。",
      github: "GitHub で見る",
      contributions: "件の貢献",
      buildersFallback: "貢献者のデータを読み込めません。GitHub のリポジトリは閲覧できます。",
      zoo: "厳選した共有者",
      zooBody: "公開例の数から厳選。カードから作者の X プロフィールを開けます。",
      case: "件の例",
      cases: "件の例",
    };
  }
  return {
    title: "UseGrokBot Community",
    body: "Meet the people behind real Grok Bot examples and the open-source builders improving UseGrokBot. This page keeps the list short and useful.",
    submit: "Add your Grok Bot",
    builders: "Community Builders",
    buildersBody: "Open-source contributors helping the project grow.",
    github: "View on GitHub",
    contributions: "contributions",
    buildersFallback: "Contributor data is temporarily unavailable, but the GitHub repository is still public.",
    zoo: "Featured sharers",
    zooBody: "Selected by the number of public examples shared. Each card opens the author's X profile.",
    case: "case",
    cases: "cases",
  };
}
