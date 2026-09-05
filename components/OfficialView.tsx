"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Search } from "lucide-react";
import { BotFace, botColorFor } from "@/components/BotFace";
import { CopyButton } from "@/components/CopyButton";
import {
  OFFICIAL_DOCS_URL,
  OFFICIAL_SOURCE_URL,
  officialCategories,
  officialGuideCount,
  officialUseCases,
  type OfficialCategory,
  type OfficialUseCase,
} from "@/data/official-use-cases";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { localizeOfficial } from "@/lib/i18n/official";
import { readingUiCopy } from "@/lib/i18n/reading-ui";

const categoryKeys: Record<OfficialCategory, string> = {
  general: "officialPage.catGeneral",
  sales: "officialPage.catSales",
  marketing: "officialPage.catMarketing",
  "customer-success": "officialPage.catCustomerSuccess",
  recruiting: "officialPage.catRecruiting",
  "operations-finance": "officialPage.catOps",
  product: "officialPage.catProduct",
  engineering: "officialPage.catEngineering",
  life: "officialPage.catLife",
};

function subscribeRoleHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

const getRoleHash = () => window.location.hash.slice(1);
const getServerRoleHash = () => "";

export function OfficialView() {
  const { locale, t } = useI18n();
  const ui = readingUiCopy[locale];
  const [category, setCategory] = useState<OfficialCategory | "all">("all");
  const [query, setQuery] = useState("");
  const selectedSlug = useSyncExternalStore(subscribeRoleHash, getRoleHash, getServerRoleHash);
  const catalog = useMemo(
    () => officialUseCases.map((item) => localizeOfficial(item, locale)),
    [locale],
  );

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalog.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!needle) return true;
      const source = officialUseCases.find((entry) => entry.slug === item.slug);
      const haystack = [
        item.title,
        item.role,
        item.guide?.owns,
        item.guide?.connect,
        item.guide?.startWith,
        source?.title,
        source?.role,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [catalog, category, query]);

  const selected: OfficialUseCase | undefined =
    items.find((item) => item.slug === selectedSlug) ?? items[0];

  useEffect(() => {
    if (!selected || selected.slug === selectedSlug) return;
    window.history.replaceState(window.history.state, "", `#${selected.slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, [selected, selectedSlug]);

  function pick(slug: string) {
    window.history.replaceState(window.history.state, "", `#${slug}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
      document.getElementById("official-detail")?.scrollIntoView({ behavior, block: "start" });
    });
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="ui-page-title">{t("officialPage.title")}</h1>
          <p className="ui-page-intro mt-4">{ui.officialIntro}</p>
          <p className="ui-count mt-3 font-medium text-mute">
            {t("officialPage.count", { n: officialUseCases.length })}
            {" · "}
            {t("officialPage.countGuide", { n: officialGuideCount })}
          </p>
        </div>
        <label className="relative block w-full max-w-sm">
          <span className="sr-only">{t("officialPage.search")}</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("officialPage.search")}
            className="h-12 w-full rounded-xl border border-line bg-card pr-3 pl-9 text-[16px] text-ink placeholder:text-faint focus:border-accent"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:hidden">
        <label className="ui-label grid gap-2 text-mute">
          {ui.chooseCategory}
          <select value={category} onChange={(event) => setCategory(event.target.value as OfficialCategory | "all")} className="min-h-12 w-full min-w-0 rounded-xl border border-line bg-card px-3 text-[16px] font-normal text-ink">
            <option value="all">{t("officialPage.catAll")}</option>
            {officialCategories.map((item) => <option key={item} value={item}>{t(categoryKeys[item])}</option>)}
          </select>
        </label>
        {selected ? (
          <label className="ui-label grid gap-2 text-mute">
            {ui.chooseRole}
            <select aria-controls="official-detail" value={selected.slug} onChange={(event) => pick(event.target.value)} className="min-h-12 w-full min-w-0 rounded-xl border border-accent bg-accent-soft px-3 text-[16px] font-normal text-ink">
              {items.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}
            </select>
          </label>
        ) : null}
      </div>

      <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
        <FilterChip active={category === "all"} label={t("officialPage.catAll")} onClick={() => setCategory("all")} />
        {officialCategories.map((item) => (
          <FilterChip
            key={item}
            active={category === item}
            label={t(categoryKeys[item])}
            onClick={() => setCategory(item)}
          />
        ))}
      </div>

      {items.length === 0 ? (
        <div role="status" className="mt-8 rounded-2xl border border-line bg-card p-6">
          <p className="ui-body text-mute">{t("officialPage.empty")}</p>
          <button type="button" className="ui-button-secondary mt-4" onClick={() => { setQuery(""); setCategory("all"); }}>{ui.clearFilters}</button>
        </div>
      ) : null}

      <div className="mt-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="hidden lg:sticky lg:top-28 lg:flex lg:h-[calc(100vh-12rem)] lg:flex-col">
          <nav
            className="prompt-scroll min-h-0 flex-1 overflow-y-auto"
            aria-label={t("officialPage.title")}
          >
            {items.length === 0 ? (
              <p className="ui-meta py-6 text-mute">{t("officialPage.empty")}</p>
            ) : (
              <ul className="space-y-1">
                {items.map((item) => {
                  const active = item.slug === selected?.slug;
                  return (
                    <li key={item.slug}>
                      <button
                        type="button"
                        onClick={() => pick(item.slug)}
                        aria-current={active ? "true" : undefined}
                        aria-label={
                          item.guide ? `${item.title}. ${t("officialPage.hasTask")}` : undefined
                        }
                        className={cn(
                          "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left text-[15px] transition-colors",
                          active ? "border-accent bg-accent-soft text-accent" : "border-transparent text-mute hover:bg-card hover:text-ink",
                        )}
                      >
                        <span className="flex min-w-0 items-baseline gap-2">
                          {item.guide ? (
                            <span
                              className={cn(
                                "mt-1 size-1.5 shrink-0 rounded-full",
                                active ? "bg-accent" : "bg-faint",
                              )}
                              title={t("officialPage.hasTask")}
                              aria-hidden
                            />
                          ) : (
                            <span className="size-1.5 shrink-0" aria-hidden />
                          )}
                          <span className={cn("min-w-0 truncate", active && "font-medium")}>{item.title}</span>
                        </span>
                        <span className="ui-meta hidden shrink-0 text-mute xl:inline">
                          {t(categoryKeys[item.category])}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </aside>

        {selected ? <OfficialDetail key={selected.slug} selected={selected} /> : null}
      </div>
    </div>
  );
}

function OfficialDetail({ selected }: { selected: OfficialUseCase }) {
  const { t, locale } = useI18n();
  const ui = readingUiCopy[locale];
  const guide = selected.guide;

  return (
    <article id="official-detail" className="min-w-0 scroll-mt-28 rounded-2xl border border-line bg-card p-5 md:p-8">
      <div className="flex items-start justify-between gap-6">
        <h2 className="ui-section-title min-w-0">
          {selected.title}
        </h2>
        <BotFace size={52} color={botColorFor(selected.slug)} className="mt-1 hidden shrink-0 lg:block" />
      </div>
      <p className="ui-meta mt-3 text-mute">
        {t(categoryKeys[selected.category])} · {t("officialPage.badge")}
        {guide ? ` · ${t("officialPage.hasTask")}` : ""}
      </p>

      <section className="mt-7 max-w-[38rem]">
        <p className="ui-label text-mute">
          {t("officialPage.roleTitle")}
        </p>
        <p className="ui-body mt-3 text-ink">{selected.role}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CopyButton
            text={selected.role}
            label={t("officialPage.copyRole")}
            variant={guide ? "ghost" : "solid"}
          />
        </div>
        <p className="ui-meta mt-3 text-mute">{ui.roleHint}</p>
      </section>

      {guide ? (
        <>
          <section className="mt-8 max-w-[38rem] border-t border-line pt-6">
            <p className="ui-label text-mute">
              {t("officialPage.scopeTitle")}
            </p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="ui-label text-mute">{t("officialPage.owns")}</dt>
                <dd className="ui-body mt-1 text-ink">{guide.owns}</dd>
              </div>
              <div>
                <dt className="ui-label text-mute">{t("officialPage.connect")}</dt>
                <dd className="ui-body mt-1 text-ink">{guide.connect}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-8 max-w-[38rem] border-t border-line pt-6">
            <p className="ui-label text-mute">
              {t("officialPage.taskTitle")}
            </p>
            <blockquote className="ui-body mt-4 border-l-2 border-line pl-4 text-ink">
              {guide.startWith}
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CopyButton text={guide.startWith} label={t("officialPage.copyTask")} variant="solid" />
              <a
                href={OFFICIAL_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[15px] text-mute underline decoration-line underline-offset-[5px] hover:text-ink"
              >
                {t("officialPage.docs")} ↗
              </a>
            </div>
            <p className="ui-meta mt-3 text-mute">{ui.taskHint}</p>
          </section>
        </>
      ) : null}

      <p className="ui-body mt-8 max-w-[38rem] text-mute">
        <a
          href={OFFICIAL_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-[5px] hover:text-ink"
        >
          {t("officialPage.source")} ↗
        </a>
      </p>
    </article>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center rounded-full border px-3.5 py-2 text-[15px] transition-colors",
        active ? "border-accent bg-accent-soft text-accent" : "border-line bg-card text-mute hover:border-line-strong hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
