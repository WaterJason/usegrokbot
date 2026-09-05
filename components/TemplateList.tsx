"use client";

import { useState } from "react";
import { getTemplateStory, rankLabel, templates, type BotTemplate } from "@/data/templates";
import { getTemplateTeamCardCopy } from "@/data/template-team-copy";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { localizedTemplateFields, templateBrowserCopy, templateCardCopy } from "@/lib/i18n/template-browser";
import { useTapFeedback } from "@/lib/tap-feedback";
import { formatViewCount, metricForPostUrl, metricForStory } from "@/lib/x-metrics";

const MORE_STEP = 12;

export function TemplateList({
  items = templates,
  pager = true,
  heading: Heading = "h2",
  variant = "ranked",
}: {
  items?: readonly BotTemplate[];
  pager?: boolean;
  heading?: "h2" | "h3";
  variant?: "ranked" | "identity" | "team";
}) {
  const { locale, t } = useI18n();
  const openLabel = templateBrowserCopy[locale].openInGrokBot;
  const [requestedVisible, setRequestedVisible] = useState(MORE_STEP);
  const visible = pager ? Math.min(requestedVisible, items.length) : items.length;
  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;
  const ListTag = variant === "ranked" ? "ol" : "ul";

  return (
    <>
      <ListTag className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-5">
        {shown.map((item) => {
          const fields = localizedTemplateFields(item, locale);
          const xPostUrl = fields.xPostUrl;
          const byline = item.handle ? "@" + item.handle : item.authorName;
          const card = templateCardCopy(fields.title, fields.oneLiner);

          if (variant === "identity" || variant === "team") {
            const isTeamCard = variant === "team";
            const teamPurpose = isTeamCard
              ? getTemplateTeamCardCopy(item.id, locale)
              : undefined;
            const lead = (teamPurpose || card.description).trim();

            return (
              <li key={item.id}>
                <article
                  data-template-id={item.id}
                  className={cn(
                    "spring-lift flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong",
                    isTeamCard && "border-line-strong bg-elevated",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Heading className="min-w-0 text-[18px] font-medium tracking-tight wrap-break-word text-ink">
                      {card.title}
                    </Heading>
                    {xPostUrl ? (
                      <XPostButton href={xPostUrl} label={t("discover.viewOriginalX")} />
                    ) : null}
                  </div>
                  {lead ? (
                    <p className="mt-3 min-w-0 text-[15px] leading-6 wrap-break-word text-ink">
                      {lead}
                    </p>
                  ) : null}
                  {byline ? (
                    <p className="mt-3 min-w-0 truncate text-[12px] text-mute">{byline}</p>
                  ) : null}
                  <div className="mt-auto pt-5">
                    <a
                      href={item.templateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="accent-gradient spring-press inline-flex h-11 w-full items-center justify-center rounded-[10px] px-5 text-[15px] font-medium"
                    >
                      {openLabel}
                    </a>
                  </div>
                </article>
              </li>
            );
          }

          const story = getTemplateStory(item);
          const views =
            (story ? metricForStory(story)?.views ?? 0 : 0) ||
            (metricForPostUrl(item.xPostUrl)?.views ?? 0);

          return (
            <li key={item.id}>
              <article data-template-id={item.id} className="spring-lift flex h-full min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[20px] tabular-nums tracking-tight text-mute">
                      {rankLabel(item.rank)}
                    </span>
                    {xPostUrl ? (
                      <XPostButton href={xPostUrl} label={t("discover.viewOriginalX")} />
                    ) : null}
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="text-[16px] font-medium tabular-nums tracking-tight text-ink">
                      {views > 0 ? formatViewCount(views, locale) : "—"}
                    </span>{" "}
                    <span className="text-[12px] text-mute">{t("pages.rankingsViews")}</span>
                  </p>
                </div>

                <Heading className="mt-4 text-[18px] font-medium tracking-tight wrap-break-word text-ink">
                  {card.title}
                </Heading>
                {card.description ? (
                  <p className="mt-3 min-w-0 text-[15px] leading-6 wrap-break-word text-mute">
                    {card.description}
                  </p>
                ) : null}
                {byline ? (
                  <p className="mt-3 min-w-0 truncate text-[12px] text-mute">{byline}</p>
                ) : null}

                <div className="mt-auto pt-5">
                  <a
                    href={item.templateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="accent-gradient spring-press inline-flex h-11 w-full items-center justify-center rounded-[10px] px-5 text-[15px] font-medium"
                  >
                    {openLabel}
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ListTag>
      {pager && hasMore ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-catalog-pager>
          <PagerButton
            onClick={() =>
              setRequestedVisible((count) => Math.min(count + MORE_STEP, items.length))
            }
          >
            {t("templates.showMore")}
          </PagerButton>
          <PagerButton onClick={() => setRequestedVisible(items.length)}>
            {t("templates.showAll")}
          </PagerButton>
        </div>
      ) : null}
    </>
  );
}

function PagerButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-[10px] border border-line px-5 text-[15px] text-ink transition-colors duration-200 hover:border-line-strong active:border-accent active:bg-accent-soft"
    >
      {children}
    </button>
  );
}

function XPostButton({ href, label }: { href: string; label: string }) {
  const tap = useTapFeedback();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      onClick={tap.trigger}
      onAnimationEnd={tap.onAnimationEnd}
      className={cn(
        "spring-press inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-line text-ink transition hover:border-line-strong hover:bg-accent-soft hover:text-accent",
        tap.className,
      )}
    >
      <XLogo />
    </a>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-3.5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
