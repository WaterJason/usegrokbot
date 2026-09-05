import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TemplateList } from "@/components/TemplateList";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import {
  getTemplateIdentity,
  interpolateIdentityCopy,
  localizeText,
  templateGroupsForIdentity,
  templateIdentityUiCopy,
  templatesForIdentity,
  type TemplateIdentitySlug,
} from "@/data/template-identities";
import { withLocale, type UrlLocale } from "@/lib/i18n/paths";
import { matchFocusToGroup, templateBrowserCopy } from "@/lib/i18n/template-browser";
import type { Locale } from "@/lib/i18n/types";

export function TemplateIdentityDetailView({
  slug,
  locale,
  urlLocale,
}: {
  slug: TemplateIdentitySlug;
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const identity = getTemplateIdentity(slug);
  if (!identity) return null;

  const copy = templateIdentityUiCopy[locale];
  const browserCopy = templateBrowserCopy[locale];
  const name = localizeText(identity.name, locale);
  const items = templatesForIdentity(slug);
  const groups = templateGroupsForIdentity(slug, locale);
  const englishGroups = locale === "en" ? groups : templateGroupsForIdentity(slug, "en");
  const countLabel = interpolateIdentityCopy(copy.found, { n: items.length, name });
  const sparseLabel = interpolateIdentityCopy(
    items.length === 1 ? copy.sparse : copy.sparsePlural,
    { n: items.length },
  );
  const hideGroupHeadings = Boolean(identity.sparse && items.length <= 2);
  const jumpableGroups = hideGroupHeadings ? [] : groups;

  return (
    <div
      className="mx-auto max-w-[1240px] px-5 py-10 md:px-8 md:py-16"
      data-template-identity-detail={slug}
    >
      <TemplatesModeNav active="role" locale={locale} urlLocale={urlLocale} />

      <Link
        href={withLocale("/templates", urlLocale)}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-[10px] text-[15px] font-medium text-mute hover:text-ink"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {copy.back}
      </Link>

      <header className="mt-6 border-b border-line pb-8 md:mt-8 md:pb-10">
        <p className="text-[16px] font-medium tabular-nums text-mute">{countLabel}</p>
        <h1 className="mt-3 text-[clamp(32px,5vw,48px)] font-medium tracking-[-0.035em] text-ink">
          {name}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-mute">
          {localizeText(identity.description, locale)}
        </p>
      </header>

      <section className="py-8 md:py-10" aria-labelledby="identity-focus">
        <h2 id="identity-focus" className="text-xl font-medium tracking-tight text-ink">
          {copy.question}
        </h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {identity.focus.map((focus) => {
            const mapped = hideGroupHeadings ? undefined : matchFocusToGroup(focus, groups, englishGroups);
            const label = localizeText(focus, locale);
            if (mapped) {
              return (
                <li key={focus.en}>
                  <a
                    href={"#group-" + mapped.slug}
                    data-focus-link={mapped.slug}
                    className="flex min-h-11 items-center rounded-[12px] border border-line bg-card px-4 py-3 text-[15px] leading-5 text-ink hover:border-accent hover:bg-accent-soft hover:text-accent"
                  >
                    {label}
                  </a>
                </li>
              );
            }
            return (
              <li
                key={focus.en}
                className="flex min-h-11 items-center px-1 py-2 text-[15px] leading-5 text-ink"
              >
                {label}
              </li>
            );
          })}
        </ul>
      </section>

      {jumpableGroups.length > 1 ? (
        <nav className="mb-8" aria-label={browserCopy.sectionJumpLabel} data-identity-section-nav>
          <div className="flex flex-wrap gap-2">
            {jumpableGroups.map((group) => (
              <a
                key={group.slug}
                href={"#group-" + group.slug}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-[15px] font-medium text-ink hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {group.title}
              </a>
            ))}
          </div>
        </nav>
      ) : null}

      {identity.sparse && items.length > 0 ? (
        <p className="mb-10 rounded-2xl border border-line bg-card p-5 text-[15px] leading-6 text-mute">
          {sparseLabel}
        </p>
      ) : null}

      {items.length === 0 ? (
        <section className="rounded-2xl border border-line bg-card p-6 md:p-8" aria-labelledby="identity-empty">
          <h2 id="identity-empty" className="text-xl font-medium tracking-tight text-ink">
            {copy.empty}
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-6 text-mute">{copy.emptyBody}</p>
          <Link
            href={withLocale("/templates/all", urlLocale)}
            className="mt-6 inline-flex min-h-11 items-center rounded-[10px] border border-line px-4 text-[15px] font-medium text-ink hover:border-line-strong"
          >
            {copy.seeAll}
          </Link>
        </section>
      ) : (
        <div className="space-y-14 md:space-y-18">
          {groups.map((group) => {
            const hideHeading = hideGroupHeadings;
            return (
              <section key={group.slug} aria-labelledby={hideHeading ? undefined : "group-" + group.slug}>
                {hideHeading ? null : (
                  <div className="mb-6 max-w-2xl">
                    <h2
                      id={"group-" + group.slug}
                      className="scroll-mt-24 text-2xl font-medium tracking-tight text-ink"
                    >
                      {group.title}
                    </h2>
                    {group.description ? (
                      <p className="mt-2 text-[15px] leading-6 text-mute">{group.description}</p>
                    ) : null}
                  </div>
                )}
                <TemplateList
                  items={group.items}
                  pager={false}
                  heading="h3"
                  variant="identity"
                />
              </section>
            );
          })}
        </div>
      )}

      {items.length > 0 ? (
        <div className="mt-14 border-t border-line pt-8">
          <Link
            href={withLocale("/templates/all", urlLocale)}
            className="inline-flex min-h-11 items-center rounded-[10px] border border-line px-4 text-[15px] font-medium text-ink hover:border-line-strong"
          >
            {copy.seeAll}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
