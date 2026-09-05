"use client";

import { AppNamePills } from "@/components/AppPills";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DiscoverCard } from "@/components/DiscoverCard";
import { ExpandablePost } from "@/components/ExpandablePost";
import { XPostEmbed } from "@/components/XPostEmbed";
import type { DiscoverStory } from "@/data/discover";
import { formatStoryDate, sameCopy } from "@/lib/format";
import { openExternalUrl } from "@/lib/open-external";
import { localizeDiscoverStory, useI18n } from "@/lib/i18n";
import { isImportedStoryExplanation, repeatsReadingCopy } from "@/lib/reading-copy";

export function DiscoverDetailView({
  story,
  more,
}: {
  story: DiscoverStory;
  more: DiscoverStory[];
}) {
  const { locale, t } = useI18n();
  const item = localizeDiscoverStory(story, locale);
  const originalHref = story.xPostUrl ?? story.sourceUrl;
  const originalLabel = story.xPostUrl ? t("discover.viewOriginalX") : t("discover.viewOriginal");
  const trustLabel = story.tested
    ? t("discover.tabTested")
    : story.source === "official"
      ? t("discover.tabOfficial")
      : null;
  const postText = item.body || item.whatTheyDid || item.headline;
  const showTitle = Boolean(item.title) && !sameCopy(item.title, postText);
  const showHeadline =
    Boolean(item.headline) && !sameCopy(item.headline, postText) && !sameCopy(item.title, item.headline);
  const outcome = item.result;
  const showOutcome =
    Boolean(outcome) && !sameCopy(outcome, item.title) && !sameCopy(outcome, postText);
  const shown = [item.title, item.headline, postText, outcome ?? ""];
  const details = [
    { key: "whatTheyDid", text: item.whatTheyDid, source: story.whatTheyDid },
    { key: "howItWorks", text: item.howItWorks, source: story.howItWorks },
    { key: "whyUseful", text: item.whyUseful, source: story.whyUseful },
  ].filter(({ text, source }) => {
    if (isImportedStoryExplanation(source) || repeatsReadingCopy(text, shown)) return false;
    shown.push(text);
    return true;
  });

  return (
    <article className="mx-auto max-w-[44rem] px-5 py-10 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/", label: t("nav.discover") }, { label: item.title }]} />

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="ui-label rounded-full border border-line px-2.5 py-1 text-mute">
          {t(`discover.cat${story.category.charAt(0).toUpperCase()}${story.category.slice(1)}`)}
        </span>
        {trustLabel ? (
          <span className="ui-label rounded-full border border-line px-2.5 py-1 text-mute">
            {trustLabel}
          </span>
        ) : null}
        <span className="ui-meta text-mute">{formatStoryDate(story.publishedAt, locale)}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AuthorAvatar name={item.authorName} handle={story.handle} />
        <p className="text-[15px] font-medium wrap-break-word text-ink">
          {item.authorName}
          {story.handle ? <span className="ui-meta font-normal text-mute"> @{story.handle}</span> : null}
        </p>
      </div>
      {showTitle ? (
        <h1 className="ui-page-title mt-2">{item.title}</h1>
      ) : (
        <h1 className="sr-only">{item.title}</h1>
      )}
      {showHeadline ? <p className="ui-page-intro mt-4">{item.headline}</p> : null}
      {postText ? (
        <ExpandablePost
          text={postText}
          original={locale !== "en" ? story.body || story.whatTheyDid : undefined}
          className="mt-4"
        />
      ) : null}
      <div className="ui-meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-mute">
          {story.handle
            ? t("discover.basedOn", { handle: story.handle })
            : t("discover.basedOnNamed", { name: story.authorName })}
        </p>
        <a
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openExternalUrl(originalHref, event)}
          className="font-medium text-accent hover:underline"
        >
          {originalLabel} ↗
        </a>
      </div>
      {showOutcome ? (
        <div className="mt-6 rounded-[12px] border border-line bg-elevated px-4 py-3">
          <p className="ui-label uppercase text-mute">
            {item.result ? t("discover.result") : t("discover.output")}
          </p>
          <p className="ui-body mt-1 text-ink">{outcome}</p>
        </div>
      ) : null}

      {details.map(({ key, text }) => (
        <section key={key} className="mt-8">
          <h2 className="ui-card-title">{t(`discover.${key}`)}</h2>
          <p className="ui-body mt-3 text-ink">{text}</p>
        </section>
      ))}

      <section className="mt-8">
        <h2 className="ui-card-title">{t("discover.whoShouldTry")}</h2>
        <ul className="ui-body mt-3 list-disc space-y-1 pl-5 text-ink">
          {item.whoShouldTry.map((who) => (
            <li key={who}>{who}</li>
          ))}
        </ul>
      </section>

      {item.quote && !postText.includes(item.quote) ? (
        <blockquote className="mt-8 border-l-2 border-line pl-4">
          <p className="ui-label uppercase text-mute">{t("discover.quoteCaption")}</p>
          <p className="ui-body mt-2 text-mute">“{item.quote}”</p>
          {locale !== "en" && story.quote && story.quote !== item.quote ? (
            <p className="ui-meta mt-2 text-mute">
              {t("discover.quoteOriginal")}：{story.quote}
            </p>
          ) : null}
        </blockquote>
      ) : null}

      <div className="ui-meta mt-8 flex flex-wrap gap-2 text-mute">
        {[t(`difficulty.${story.difficulty}`), t(`schedule.${story.schedule}`)].map((chip) => (
          <span key={chip} className="rounded-full border border-line px-2.5 py-1">
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <p className="ui-label mb-1.5 uppercase text-mute">
          {t("discover.integrations")}
        </p>
        <AppNamePills apps={story.apps} />
      </div>

      <div className="mt-8">
        <a
          href={originalHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => openExternalUrl(originalHref, event)}
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-4 text-[15px] text-mute hover:border-line-strong hover:text-ink"
        >
          {originalLabel} ↗
        </a>
      </div>
      <p className="ui-meta mt-2 text-mute">{story.sourceLabel}</p>
      {story.source === "community" && !story.tested ? (
        <p className="ui-meta mt-2 text-mute">{t("discover.communityNote")}</p>
      ) : null}

      {story.xPostUrl ? (
        <section className="mt-12">
          <h2 className="ui-section-title">{t("discover.originalPost")}</h2>
          <p className="ui-meta mt-2 text-mute">{t("discover.embedNote")}</p>
          <div className="mt-4">
            <XPostEmbed url={story.xPostUrl} />
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section className="mt-16">
          <h2 className="ui-section-title">{t("discover.moreStories")}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {more.map((itemStory) => (
              <DiscoverCard key={itemStory.slug} story={itemStory} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
