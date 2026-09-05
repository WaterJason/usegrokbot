"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ArticleRow } from "@/components/ArticleRow";
import { BotFace, teamBotColor } from "@/components/BotFace";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { DiscoverFeed } from "@/components/DiscoverFeed";
import { GitHubStar } from "@/components/GitHubStar";
import { TemplateName } from "@/components/TemplateName";
import { HeroBot } from "@/components/HeroBot";
import { IdentityMascot } from "@/components/IdentityMascot";
import { LocaleLink } from "@/components/LocaleLink";
import { AnimatedCountLabel, CensusNumber } from "@/components/PostCensus";
import { appsBySlug, isAppSlug } from "@/data/apps";
import { getDiscoverStory } from "@/data/discover";
import {
  getTemplateIdentity,
  localizeText,
  templateCountForIdentity,
  type TemplateIdentitySlug,
} from "@/data/template-identities";
import { getTemplateTeamCardCopy } from "@/data/template-team-copy";
import { catalogEntry, templates } from "@/data/templates";
import { isTopicSlug, topicMessageKey, type TopicSlug } from "@/data/topics";
import type { AppSlug } from "@/data/types";
import { getVerifiedUseCase } from "@/data/verified-use-cases";
import type { RankedStory } from "@/lib/articles";
import { useI18n } from "@/lib/i18n/locale";
import { homeDiscoveryCopy } from "@/lib/i18n/home-discovery";
import { localizeTemplateCopy } from "@/lib/i18n/templates";
import {
  localizeVerifiedUseCase,
  verifiedUseCasesPageCopy,
} from "@/lib/i18n/verified-use-cases";
import { cn } from "@/lib/cn";

const IDENTITY_SLUGS = [
  "x-creator",
  "engineer",
  "solo-founder",
  "manager",
  "marketer",
  "sales",
  "researcher",
  "parent",
] as const satisfies readonly TemplateIdentitySlug[];

const TEAM_TEMPLATE_IDS = [
  "_2vi1lOY4oiBaJDA3S8l1",
  "8dB3XPIA8XIopvQUIC73P",
  "Bt48h63v32_q_shWVlEBb",
] as const;

const USE_CASE_SLUGS = [
  "lease-pdf-review",
  "digital-clutter-cleanup",
  "bug-to-pull-request",
  "credit-card-benefits-audit",
  "resume-interview-prep",
  "founder-org-chart",
] as const;

const FOLLOW_ACCOUNTS = [
  {
    name: "Grok Bot",
    handle: "bot",
    role: {
      en: "Official product account",
      "zh-Hant": "官方產品帳號",
      "zh-Hans": "官方产品账号",
      ja: "公式プロダクトアカウント",
    },
  },
  {
    name: "Lingxi",
    handle: "lingxi",
    role: {
      en: "Building Grok Bot",
      "zh-Hant": "參與建立 Grok Bot",
      "zh-Hans": "参与打造 Grok Bot",
      ja: "Grok Bot を作っています",
    },
  },
  {
    name: "Matt",
    handle: "mattyp",
    role: {
      en: "Grok Bot team",
      "zh-Hant": "Grok Bot 團隊",
      "zh-Hans": "Grok Bot 团队",
      ja: "Grok Bot チーム",
    },
  },
  {
    name: "Eric Zakariasson",
    handle: "ericzakariasson",
    role: {
      en: "SpaceXAI",
      "zh-Hant": "SpaceXAI 團隊",
      "zh-Hans": "SpaceXAI 团队",
      ja: "SpaceXAI チーム",
    },
  },
] as const;

const SIGNAL_COUNT_TOKEN = "__POST_COUNT__";

const identities = IDENTITY_SLUGS.map((slug) => {
  const identity = getTemplateIdentity(slug);
  if (!identity) throw new Error(`Missing homepage identity: ${slug}`);
  return identity;
});

const teamTemplates = TEAM_TEMPLATE_IDS.map((id) => {
  const template = templates.find((item) => item.id === id);
  const catalog = catalogEntry(id);
  if (!template || !catalog) throw new Error(`Missing homepage Bot Team template: ${id}`);
  return { template, catalog };
});

const realUseCases = USE_CASE_SLUGS.map((slug) => {
  const useCase = getVerifiedUseCase(slug);
  if (!useCase) throw new Error(`Missing homepage Use Case: ${slug}`);
  return useCase;
});

export function HomeView({
  postCount,
  stars,
  popularArticles,
}: {
  postCount: number;
  stars?: number | null;
  popularArticles: RankedStory[];
}) {
  return (
    <Suspense
      fallback={
        <HomeViewContent postCount={postCount} query="" stars={stars} popularArticles={popularArticles} />
      }
    >
      <HomeViewFromUrl
        postCount={postCount}
        stars={stars}
        popularArticles={popularArticles}
      />
    </Suspense>
  );
}

function HomeViewFromUrl({
  postCount,
  stars,
  popularArticles,
}: {
  postCount: number;
  stars?: number | null;
  popularArticles: RankedStory[];
}) {
  const searchParams = useSearchParams();
  const rawTopic = searchParams.get("topic")?.trim() ?? "";
  const rawApp = searchParams.get("app")?.trim() ?? "";
  const topic = isTopicSlug(rawTopic) ? rawTopic : undefined;
  const app = isAppSlug(rawApp) ? rawApp : undefined;

  return (
    <HomeViewContent
      postCount={postCount}
      query={searchParams.get("q")?.trim() ?? ""}
      topic={topic}
      app={app}
      stars={stars}
      popularArticles={popularArticles}
    />
  );
}

function HomeViewContent({
  postCount,
  query,
  topic,
  app,
  stars,
  popularArticles,
}: {
  postCount: number;
  query: string;
  topic?: TopicSlug;
  app?: AppSlug;
  stars?: number | null;
  popularArticles: RankedStory[];
}) {
  const { locale, t } = useI18n();
  const discoveryCopy = homeDiscoveryCopy[locale];
  const useCaseCopy = verifiedUseCasesPageCopy(locale);
  const resultTitle = [
    query ? `“${query}”` : "",
    topic ? t(topicMessageKey(topic)) : "",
    app ? appsBySlug[app].name : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const showResults = Boolean(query || topic || app);

  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1240px] px-5 pb-8 pt-8 md:px-8 md:pb-16 md:pt-20">
          <div className="grid grid-cols-[minmax(0,1fr)_160px] items-center gap-x-3 gap-y-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-16 md:gap-y-8">
            <div className="col-span-2 min-w-0 md:col-span-1 md:col-start-1 md:row-start-1">
              <div className="flex flex-wrap items-center gap-3">
                <p className="ui-label tracking-[0.06em] text-mute uppercase">
                  {t("home.kicker")}
                </p>
                <GitHubStar stars={stars} className="h-7 shrink-0 px-2.5" />
              </div>
              <h1 className="ui-hero-title mt-5 max-w-3xl">
                {t("home.title")}
              </h1>
              {!showResults ? (
                <p className="ui-page-intro mt-5 max-w-xl md:text-[18px]">
                  {discoveryCopy.intro}
                </p>
              ) : null}
            </div>
            <div className="col-start-1 row-start-2 min-w-0 self-center border-l border-accent pl-4 md:col-start-1 md:row-start-2 md:max-w-[650px] md:pl-5">
              <AnimatedSignal total={postCount} />
              <p className="ui-meta mt-3 text-faint">
                {t("home.signalRefresh")}
              </p>
            </div>
            <div className="col-start-2 row-start-2 mx-auto md:col-start-2 md:row-span-2 md:row-start-1 md:mx-0">
              <HeroBot />
            </div>

          </div>
        </div>
      </section>

      {showResults ? (
        <section
          id="search-results"
          data-topic={topic}
          data-app={app}
          className="mx-auto max-w-[1240px] px-5 py-16 md:px-8 md:py-20"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="ui-section-title min-w-0">
              {resultTitle}
            </h2>
            <LocaleLink
              href="/"
              className="inline-flex min-h-11 shrink-0 items-center self-start text-[15px] font-medium text-mute hover:text-ink sm:self-auto"
            >
              {t("filters.clear")}
            </LocaleLink>
          </div>
          <DiscoverFeed
            query={query}
            hideFilters
            showOutcomes={false}
            categoryFilter={topic}
            appFilter={app}
          />
        </section>
      ) : (
        <>
      <section id="find-your-bot" className="mx-auto max-w-[1240px] scroll-mt-16 px-5 py-10 md:px-8 md:py-20">
        <SectionHeader
          title={t("home.identitiesTitle")}
          href="/templates"
          cta={t("home.identitiesCta")}
          compactOnMobile
        />
        <p className="ui-body mt-3 max-w-xl text-mute">{discoveryCopy.identityHint}</p>
        <div data-home-identity-grid="" className="mt-6 grid gap-3 min-[360px]:grid-cols-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
          {identities.map((identity) => (
            <LocaleLink
              key={identity.slug}
              href={`/templates/${identity.slug}`}
              className="spring-lift group flex min-w-0 flex-col rounded-2xl border border-line bg-card p-4 hover:border-line-strong sm:p-5"
            >
              <div className="flex flex-col-reverse items-start gap-4">
                <h3 className="ui-card-title w-full group-hover:text-accent">
                  {localizeText(identity.name, locale)}
                </h3>
                <IdentityMascot slug={identity.slug} paper="var(--card)" />
              </div>
              <p className="ui-body mt-3 text-mute">
                {localizeText(identity.description, locale)}
              </p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                <AnimatedCountLabel
                  total={templateCountForIdentity(identity.slug)}
                  template={t("home.identityTemplateCount")}
                  className="ui-count font-medium text-mute"
                />
                <ArrowUpRight aria-hidden className="size-4 shrink-0 text-faint group-hover:text-accent" />
              </div>
            </LocaleLink>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-elevated">
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-24">
          <p className="ui-label tracking-[0.06em] text-mute uppercase">
            {t("home.botTeamsLabel")}
          </p>
          <div className="mt-2">
            <SectionHeader title={t("home.botTeamsTitle")} href="/templates/teams" cta={t("home.botTeamsCta")} />
          </div>
          <div data-home-team-grid="" className="mt-6 grid gap-3 min-[360px]:grid-cols-2 sm:mt-8 sm:gap-4 lg:grid-cols-4">
            {teamTemplates.map(({ template, catalog }, index) => {
              const copy = localizeTemplateCopy(template.id, locale, catalog);
              const purpose = getTemplateTeamCardCopy(template.id, locale) ?? copy.oneLiner;
              return (
                <a
                  key={template.id}
                  href={template.templateUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-home-team-card=""
                  className="spring-lift group flex min-w-0 flex-col rounded-2xl border border-line bg-card p-4 hover:border-line-strong sm:p-5"
                >
                  <div className="flex flex-col-reverse items-start gap-4">
                    <h3 className="ui-card-title min-h-[3.5rem] w-full group-hover:text-accent">
                      <TemplateName title={copy.title} />
                    </h3>
                    <div aria-hidden className="relative h-10 w-14 shrink-0">
                      <BotFace size={32} color={teamBotColor(index)} paper="var(--card)" className="absolute top-0 left-0" />
                      <BotFace size={32} color={teamBotColor(index + 1)} paper="var(--card)" className="absolute right-0 bottom-0" />
                    </div>
                  </div>
                  <p className="ui-body mt-3 text-mute">{purpose}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                    <span className="text-[15px] font-medium text-accent">{t("home.openTemplate").replace(/\s*→$/, "")}</span>
                    <ArrowUpRight aria-hidden className="size-4 shrink-0 text-faint group-hover:text-accent" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section id="real-use-cases" className="mx-auto max-w-[1240px] scroll-mt-16 px-5 py-10 md:px-8 md:py-24">
        <SectionHeader title={t("home.realUseCasesTitle")} href="/use-cases" cta={t("home.realUseCasesCta")} />
        <div className="mt-8 grid gap-x-10 md:grid-cols-2">
          {realUseCases.map((useCase, index) => {
            const localized = localizeVerifiedUseCase(useCase, locale);
            const source = getDiscoverStory(useCase.primarySourceSlug);
            return (
              <LocaleLink
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group grid min-h-[172px] grid-cols-[2rem_minmax(0,1fr)_auto] gap-3 border-t border-line py-6"
              >
                <span className="pt-0.5 font-mono text-[16px] font-medium text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="ui-card-title block group-hover:text-accent">
                    {localized.title}
                  </span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    <Badge>{useCase.evidence === "prompt" ? useCaseCopy.promptIncluded : useCaseCopy.setupShared}</Badge>
                    <Badge>{useCase.structure === "team" ? useCaseCopy.botTeam : useCaseCopy.singleBot}</Badge>
                  </span>
                  {source ? (
                    <span className="mt-4 flex items-center gap-2.5">
                      <AuthorAvatar name={source.authorName} handle={source.handle} size={40} />
                      <span className="truncate text-[13px] text-mute">
                        {source.handle ? `@${source.handle}` : source.authorName}
                      </span>
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight aria-hidden className="mt-1 size-4 text-faint group-hover:text-accent" />
              </LocaleLink>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8 md:py-24">
          <SectionHeader
            title={t("home.popularArticlesTitle")}
            body={t("home.popularArticlesBody")}
            href="/articles"
            cta={t("home.popularArticlesCta")}
          />
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {popularArticles.map((item, index) => (
              <ArticleRow
                key={item.story.slug}
                item={item}
                locale={locale}
                viewsLabel={t("pages.rankingsViews")}
                rank={index + 1}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-24">
        <SectionHeader title={t("home.followTeamTitle")} body={t("home.followTeamBody")} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FOLLOW_ACCOUNTS.map((account) => (
            <a
              key={account.handle}
              href={`https://x.com/${account.handle}`}
              target="_blank"
              rel="noreferrer"
              className="spring-lift group flex min-h-[150px] min-w-0 items-start gap-4 rounded-2xl border border-line bg-card p-5 hover:border-line-strong"
            >
              <AuthorAvatar name={account.name} handle={account.handle} size={48} />
              <span className="min-w-0">
                <span className="ui-card-title block group-hover:text-accent">
                  {account.name}
                </span>
                <span className="ui-meta mt-1 block text-mute">@{account.handle}</span>
                <span className="ui-body mt-3 block text-mute">{account.role[locale]}</span>
                <span className="mt-3 block text-[15px] leading-6 font-medium text-accent">{t("home.followOnX")}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 pb-24 md:px-8 md:pb-28">
        <div className="rounded-[20px] border border-line bg-elevated px-6 py-12 text-center md:px-12 md:py-16">
          <h2 className="ui-section-title">{t("home.submitTitle")}</h2>
          <p className="ui-body mx-auto mt-3 max-w-xl text-mute">{t("home.submitBody")}</p>
          <LocaleLink
            href="/submit"
            className="accent-gradient spring-press mt-7 inline-flex min-h-11 items-center rounded-[10px] px-5 text-[15px] font-medium"
          >
            {t("home.submitCta")}
          </LocaleLink>
        </div>
      </section>
        </>
      )}
    </>
  );
}

function AnimatedSignal({ total }: { total: number }) {
  const { locale, t } = useI18n();
  const formattedTotal = new Intl.NumberFormat(locale === "en" ? "en-US" : locale).format(total);
  const [before, after = ""] = t("home.signalEvidence", { n: SIGNAL_COUNT_TOKEN }).split(SIGNAL_COUNT_TOKEN);

  return (
    <div>
      <p className="sr-only">{t("home.signal", { n: formattedTotal })}</p>
      <p
        aria-hidden="true"
        className="flex flex-wrap items-baseline gap-x-1.5 text-[15px] leading-6 font-medium tracking-[-0.01em] text-mute md:text-[16px]"
      >
        <span>{before.trim()}</span>
        <CensusNumber
          total={total}
          className="text-right text-[24px] leading-none md:text-[26px]"
        />
        <span>{after.trim()}</span>
      </p>
      <p aria-hidden="true" className="ui-card-title mt-2 md:text-[21px]">
        {t("home.signalResult")}
      </p>
    </div>
  );
}

function SectionHeader({
  title,
  body,
  href,
  cta,
  compactOnMobile = false,
}: {
  title: string;
  body?: string;
  href?: string;
  cta?: string;
  compactOnMobile?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 sm:flex-row sm:items-end sm:justify-between",
        compactOnMobile ? "flex-row items-end justify-between" : "flex-col",
      )}
    >
      <div className="min-w-0">
        <h2 className="ui-section-title">{title}</h2>
        {body ? <p className="ui-body mt-3 text-mute">{body}</p> : null}
      </div>
      {href && cta ? (
        <LocaleLink
          href={href}
          className={cn(
            "min-h-11 max-w-full py-2.5 text-[15px] leading-6 font-medium text-mute hover:text-ink sm:self-auto",
            compactOnMobile ? "self-auto text-right" : "self-start",
          )}
        >
          {cta}
        </LocaleLink>
      ) : null}
    </div>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 ui-label text-mute">
      {children}
    </span>
  );
}
