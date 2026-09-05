import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IdentityMascot } from "@/components/IdentityMascot";
import { AnimatedCountLabel } from "@/components/PostCensus";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import {
  identityClusters,
  localizeText,
  moreTemplateIdentities,
  templateCountForIdentity,
  templateIdentitiesForCluster,
  templateIdentityUiCopy,
} from "@/data/template-identities";
import { withLocale, type UrlLocale } from "@/lib/i18n/paths";
import { templateBrowserCopy } from "@/lib/i18n/template-browser";
import type { Locale } from "@/lib/i18n/types";

export function TemplatesIdentityIndex({
  locale,
  urlLocale,
}: {
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const copy = templateIdentityUiCopy[locale];
  const browserCopy = templateBrowserCopy[locale];
  const jumps = [
    ...identityClusters.map((cluster) => ({
      href: "#identity-cluster-" + cluster.slug,
      label: localizeText(cluster.name, locale),
    })),
    { href: "#more-identities", label: copy.moreTitle },
  ];

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 md:py-10" data-template-identity-index>
      <TemplatesModeNav active="role" locale={locale} urlLocale={urlLocale} />

      <div className="border-b border-line pb-5 pt-6 md:pt-8">
        <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
          {copy.title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-mute">{copy.intro}</p>
        <nav className="mt-4" aria-label={browserCopy.clusterJumpLabel} data-identity-cluster-jump>
          <div className="flex flex-wrap gap-2">
            {jumps.map((jump) => (
              <a
                key={jump.href}
                href={jump.href}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-[15px] font-medium text-ink hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {jump.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className="space-y-10 pt-8 md:space-y-14 md:pt-10">
        {identityClusters.map((cluster) => {
          const identities = templateIdentitiesForCluster(cluster.slug);
          const headingId = "identity-cluster-" + cluster.slug;
          return (
            <section key={cluster.slug} aria-labelledby={headingId}>
              <div className="max-w-2xl">
                <h2
                  id={headingId}
                  className="scroll-mt-24 text-2xl font-medium tracking-tight text-ink"
                >
                  {localizeText(cluster.name, locale)}
                </h2>
                <p className="mt-2 text-[15px] leading-6 text-mute">
                  {localizeText(cluster.description, locale)}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {identities.map((identity) => {
                  const count = templateCountForIdentity(identity.slug);
                  return (
                    <Link
                      key={identity.slug}
                      href={withLocale("/templates/" + identity.slug, urlLocale)}
                      className="group spring-lift flex min-h-[148px] min-w-0 flex-col rounded-2xl border border-line bg-card p-5 hover:border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      data-template-identity={identity.slug}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-[18px] font-medium tracking-tight text-ink">
                          {localizeText(identity.name, locale)}
                        </h3>
                        <IdentityMascot slug={identity.slug} paper="var(--card)" />
                      </div>
                      <p className="mt-3 text-[15px] leading-6 text-mute">
                        {localizeText(identity.description, locale)}
                      </p>
                      <span className="mt-auto flex items-end justify-between gap-3 pt-5">
                        <span className="flex items-center gap-1.5 text-[15px] font-medium text-accent">
                          {copy.openIdentity}
                          <ArrowRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </span>
                        <AnimatedCountLabel
                          total={count}
                          template={copy.templateCount}
                          className="shrink-0 font-mono text-[12px] tabular-nums text-mute"
                        />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="more-identities">
          <div className="max-w-3xl">
            <h2
              id="more-identities"
              className="scroll-mt-24 text-2xl font-medium tracking-tight text-ink"
            >
              {copy.moreTitle}
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-mute">{copy.moreBody}</p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {moreTemplateIdentities().map((identity) => {
              const count = templateCountForIdentity(identity.slug);
              return (
                <Link
                  key={identity.slug}
                  href={withLocale("/templates/" + identity.slug, urlLocale)}
                  className="group flex min-h-11 items-center gap-3 rounded-[12px] border border-line px-4 py-3 text-ink hover:border-line-strong hover:bg-card"
                  data-template-identity={identity.slug}
                >
                  <IdentityMascot slug={identity.slug} size={36} paper="var(--canvas)" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-medium">
                      {localizeText(identity.name, locale)}
                    </span>
                    <AnimatedCountLabel
                      total={count}
                      template={copy.templateCount}
                      className="mt-1 block font-mono text-[12px] text-mute"
                    />
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-mute transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              );
            })}
          </div>
        </section>

        <aside className="rounded-2xl border border-line bg-elevated p-6 md:p-8" aria-labelledby="identity-rationale">
          <h2 id="identity-rationale" className="text-xl font-medium tracking-tight text-ink">
            {copy.whyTitle}
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-6 text-mute">{copy.whyBody}</p>
        </aside>
      </div>
    </div>
  );
}
