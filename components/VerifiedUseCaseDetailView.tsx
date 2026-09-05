import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { BotFace, teamBotColor } from "@/components/BotFace";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetGrokBot } from "@/components/GetGrokBot";
import { LocaleLink } from "@/components/LocaleLink";
import { PromptBox } from "@/components/PromptBox";
import type { VerifiedUseCase } from "@/data/verified-use-cases";
import {
  localizeVerifiedUseCase,
  verifiedUseCasesPageCopy,
  type Locale,
} from "@/lib/i18n";
import { useCaseBrowserCopy, useCaseStartGuide } from "@/lib/i18n/use-case-browser";
import {
  getVerifiedUseCasePrompt,
  getVerifiedUseCaseSource,
  sourceHref,
} from "@/lib/verified-use-case-sources";

export function VerifiedUseCaseDetailView({ item, locale }: { item: VerifiedUseCase; locale: Locale }) {
  const copy = verifiedUseCasesPageCopy(locale);
  const browser = useCaseBrowserCopy(locale);
  const guide = useCaseStartGuide(item, locale);
  const localized = localizeVerifiedUseCase(item, locale);
  const source = getVerifiedUseCaseSource(item.primarySourceSlug);
  const prompt = getVerifiedUseCasePrompt(item.primarySourceSlug);
  const relatedSources = item.supportingSourceSlugs
    .map((slug) => getVerifiedUseCaseSource(slug))
    .filter((candidate) => sourceHref(candidate) !== sourceHref(source));

  return (
    <article data-use-cases-page className="mx-auto max-w-[44rem] px-5 py-12 md:px-8 md:py-16">
      <Breadcrumbs items={[{ href: "/use-cases", label: copy.allUseCases }, { label: localized.title }]} />

      <header className="mt-8 border-b border-line pb-10 md:pb-12">
        <div className="flex flex-wrap gap-2">
          <Badge tone={item.evidence === "prompt" ? "accent" : "neutral"}>
            {item.evidence === "prompt" ? copy.promptIncluded : copy.setupShared}
          </Badge>
          <Badge tone="neutral">{item.structure === "team" ? copy.botTeam : copy.singleBot}</Badge>
          <Badge tone="neutral">{localized.categoryLabel}</Badge>
        </div>

        <h1 className="ui-page-title mt-7">
          {localized.title}
        </h1>

        <a
          href={sourceHref(source)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.openOriginal}: ${source.authorName}`}
          className="group mt-8 inline-flex min-h-12 items-center gap-3"
        >
          <AuthorAvatar name={source.authorName} handle={source.handle} size={40} />
          <span>
            <span className="block text-[15px] font-medium wrap-break-word text-ink group-hover:text-accent">{source.authorName}</span>
            <span className="ui-meta mt-0.5 flex items-center gap-1 text-mute">
              {source.handle ? `@${source.handle}` : copy.openOriginal}
              <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.75} />
            </span>
          </span>
        </a>
      </header>

      <section className="mt-10" data-use-case-guide aria-label={browser.helpsLabel}>
        <div className="grid gap-3 md:grid-cols-2">
          <GuideCard title={browser.prepareLabel} body={guide.prepare} />
          <GuideCard title={browser.startLabel} body={guide.start} />
        </div>
      </section>

      {prompt ? (
        <section className="mt-12" aria-label={copy.promptTitle}>
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <h2 className="ui-card-title">{browser.originalPrompt}</h2>
            </div>
            <GetGrokBot variant="outline" className="min-h-11 text-[15px]" />
          </div>
          <PromptBox prompt={prompt} showTitle={false} />
        </section>
      ) : (
        <section className="mt-12" aria-labelledby="shared-setup-title">
          <h2 id="shared-setup-title" className="ui-section-title">
            {copy.setupTitle}
          </h2>
          <ol className="mt-6 border-y border-line">
            {localized.setupSteps.map((step, index) => (
              <li key={`${item.slug}-step-${index}`} className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-b border-line py-5 last:border-b-0">
                <span className="ui-count pt-0.5 font-medium text-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="ui-body text-ink">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {item.structure === "team" && localized.teamRoles.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12" aria-labelledby="team-handoff-title">
          <h2 id="team-handoff-title" className="ui-section-title">
            {copy.handoffTitle}
          </h2>
          <ol className="mt-7">
            {localized.teamRoles.map((role, index) => {
              const last = index === localized.teamRoles.length - 1;
              return (
                <li key={`${item.slug}-${role.name}`} className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0">
                  {!last ? <span aria-hidden className="absolute top-11 bottom-0 left-6 w-px bg-line" /> : null}
                  <span className="relative z-10 grid size-12 place-items-center rounded-full border border-line bg-card">
                    <BotFace size={30} color={teamBotColor(index)} paper="var(--card)" />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="ui-card-title block text-ink">{role.name}</span>
                    <span className="ui-body mt-1 block text-mute">{role.purpose}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {relatedSources.length > 0 ? (
        <section className="mt-16 border-t border-line pt-10" aria-labelledby="related-source-title">
          <h2 id="related-source-title" className="ui-card-title">
            {copy.relatedSourcesTitle}
          </h2>
          <ul className="mt-5 divide-y divide-line border-y border-line sm:grid sm:grid-cols-2 sm:divide-y-0">
            {relatedSources.map((related, index) => (
              <li key={`${item.slug}-${related.slug}`} className={index % 2 === 1 ? "sm:border-l sm:border-line sm:pl-5" : "sm:pr-5"}>
                <a
                  href={sourceHref(related)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${copy.openOriginal}: ${related.authorName}`}
                  className="group flex min-h-16 items-center justify-between gap-3 py-3"
                >
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium wrap-break-word text-ink group-hover:text-accent">
                      {related.authorName}
                    </span>
                    {related.handle ? <span className="ui-meta mt-0.5 block text-mute">@{related.handle}</span> : null}
                  </span>
                  <ArrowUpRight aria-hidden className="size-3.5 shrink-0 text-faint group-hover:text-accent" strokeWidth={1.75} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-14 border-t border-line pt-6">
        <LocaleLink href="/use-cases" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-accent hover:text-ink">
          <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.75} />
          {copy.allUseCases}
        </LocaleLink>
      </p>
    </article>
  );
}

function GuideCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-line bg-card p-4 md:p-5">
      <h3 className="ui-label text-mute">{title}</h3>
      <p className="ui-body mt-2 text-ink">{body}</p>
    </article>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "accent" | "neutral" }) {
  return (
    <span
      className={
        tone === "accent"
          ? "ui-label inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 text-accent"
          : "ui-label inline-flex items-center rounded-full border border-line px-2.5 py-1 text-mute"
      }
    >
      {children}
    </span>
  );
}
