"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, SlidersHorizontal, X } from "lucide-react";
import { AuthorAvatar } from "@/components/AuthorAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { UseCaseFilterPanel } from "@/components/UseCaseFilterPanel";
import type {
  VerifiedUseCaseCategorySlug,
  VerifiedUseCaseEvidence,
  VerifiedUseCaseStructure,
} from "@/data/verified-use-cases";
import { cn } from "@/lib/cn";
import { useI18n, verifiedUseCasesPageCopy } from "@/lib/i18n";
import { useCaseBrowserCopy } from "@/lib/i18n/use-case-browser";

export type VerifiedUseCaseCard = {
  slug: string;
  rank: number;
  title: string;
  category: VerifiedUseCaseCategorySlug;
  evidence: VerifiedUseCaseEvidence;
  structure: VerifiedUseCaseStructure;
  authorName: string;
  handle?: string;
};

type FilterValue<T extends string> = "all" | T;

export function UseCasesView({
  items,
  reviewedPostCount,
}: {
  items: readonly VerifiedUseCaseCard[];
  reviewedPostCount: number;
}) {
  const { locale } = useI18n();
  const copy = verifiedUseCasesPageCopy(locale);
  const browser = useCaseBrowserCopy(locale);
  const [category, setCategory] = useState<FilterValue<VerifiedUseCaseCategorySlug>>("all");
  const [evidence, setEvidence] = useState<FilterValue<VerifiedUseCaseEvidence>>("all");
  const [structure, setStructure] = useState<FilterValue<VerifiedUseCaseStructure>>("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (category === "all" || item.category === category) &&
          (evidence === "all" || item.evidence === evidence) &&
          (structure === "all" || item.structure === structure),
      ),
    [category, evidence, items, structure],
  );

  const extraCount = Number(evidence !== "all") + Number(structure !== "all");
  const hasAnyFilter = category !== "all" || extraCount > 0;
  const selectedFilters = [
    category !== "all"
      ? {
          key: "category",
          label: copy.categories.find((item) => item.slug === category)?.label ?? category,
          onClear: () => setCategory("all"),
        }
      : null,
    evidence !== "all"
      ? {
          key: "evidence",
          label: evidence === "prompt" ? copy.promptIncluded : copy.setupShared,
          onClear: () => setEvidence("all"),
        }
      : null,
    structure !== "all"
      ? {
          key: "structure",
          label: structure === "team" ? copy.botTeam : copy.singleBot,
          onClear: () => setStructure("all"),
        }
      : null,
  ].filter((item): item is { key: string; label: string; onClear: () => void } => item !== null);

  function clearAll() {
    setCategory("all");
    setEvidence("all");
    setStructure("all");
  }

  const categoryOptions = [{ slug: "all" as const, label: copy.allCategories }, ...copy.categories];
  const evidenceOptions = [
    { value: "all", label: copy.allEvidence },
    { value: "prompt", label: copy.promptIncluded },
    { value: "setup", label: copy.setupShared },
  ];
  const structureOptions = [
    { value: "all", label: copy.allStructures },
    { value: "single", label: copy.singleBot },
    { value: "team", label: copy.botTeam },
  ];

  return (
    <div data-use-cases-page className="mx-auto max-w-[1120px] px-5 py-8 md:px-8 md:py-12">
      <header className="max-w-[760px]">
        <h1 className="ui-page-title">
          {copy.title}
        </h1>
        <p className="ui-page-intro mt-4">{copy.subtitle(reviewedPostCount)}</p>
      </header>

      <section className="mt-8" aria-label={browser.categoriesLabel}>
        <label className="ui-label grid gap-2 text-mute md:hidden">
          {browser.categoriesLabel}
          <select value={category} onChange={(event) => setCategory(event.target.value as FilterValue<VerifiedUseCaseCategorySlug>)} className="min-h-12 w-full rounded-xl border border-line bg-card px-3 text-[16px] font-normal text-ink">
            {categoryOptions.map((item) => <option key={item.slug} value={item.slug}>{item.label}</option>)}
          </select>
        </label>
        <p className="ui-label hidden text-mute md:block">{browser.categoriesLabel}</p>
        <div className="mt-2 hidden flex-wrap gap-2 md:flex">
          {categoryOptions.map((item) => {
            const value = item.slug;
            const active = category === value;
            return (
              <button
                key={value}
                type="button"
                data-filter-value={value}
                aria-pressed={active}
                onClick={() => setCategory(value)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-3.5 text-[15px] font-medium transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line bg-card text-mute hover:border-line-strong hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="ui-count font-medium text-mute">
          {browser.resultCount(filteredItems.length)}
        </p>
        <button
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="use-case-filter-panel"
          onClick={() => setFiltersOpen((open) => !open)}
          className={cn(
            "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-[15px] font-medium transition-colors",
            extraCount > 0 || filtersOpen
              ? "border-accent bg-accent-soft text-accent"
              : "border-line bg-card text-ink hover:border-line-strong",
          )}
        >
          <SlidersHorizontal className="size-4" strokeWidth={1.75} />
          {browser.filters}
          {extraCount > 0 ? (
            <span className="ui-count rounded-full bg-ink px-2 py-0.5 font-medium text-inverse">
              {extraCount}
            </span>
          ) : null}
        </button>
        {hasAnyFilter ? (
          <button
            type="button"
            data-clear-use-case-filters
            onClick={clearAll}
            className="inline-flex min-h-11 items-center text-[15px] font-medium text-accent hover:text-ink"
          >
            {browser.clearFilters}
          </button>
        ) : null}
      </div>

      {selectedFilters.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2" aria-label={browser.selectedFilters}>
          {selectedFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClear}
              aria-label={browser.removeFilter(item.label)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-accent bg-accent-soft px-3 text-[15px] font-medium text-accent"
            >
              {item.label}
              <X className="size-3.5" strokeWidth={2} />
            </button>
          ))}
        </div>
      ) : null}

      <div id="use-case-filter-panel">
        <UseCaseFilterPanel
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          evidence={evidence}
          structure={structure}
          evidenceLabel={copy.evidenceLabel}
          structureLabel={copy.structureLabel}
          evidenceOptions={evidenceOptions}
          structureOptions={structureOptions}
          resultCount={filteredItems.length}
          onEvidenceChange={(value) => setEvidence(value as FilterValue<VerifiedUseCaseEvidence>)}
          onStructureChange={(value) => setStructure(value as FilterValue<VerifiedUseCaseStructure>)}
          onClear={() => {
            setEvidence("all");
            setStructure("all");
          }}
        />
      </div>

      <section className="mt-8" aria-label={copy.resultsLabel}>
        {filteredItems.length > 0 ? (
          <ol className="grid gap-x-10 md:grid-cols-2">
            {filteredItems.map((item) => (
              <li key={item.slug} className="border-t border-line">
                <LocaleLink
                  href={`/use-cases/${item.slug}`}
                  className="group grid min-h-40 grid-cols-[2rem_minmax(0,1fr)] gap-3 py-6 focus-visible:outline-offset-4"
                >
                  <span className="ui-count pt-0.5 font-medium text-mute">
                    {String(item.rank).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="ui-card-title flex items-start gap-2 text-ink group-hover:text-accent">
                      <span className="min-w-0 flex-1">{item.title}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-faint transition-colors group-hover:text-accent"
                        strokeWidth={1.75}
                      />
                    </span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      <Badge tone="neutral">
                        {copy.categories.find((entry) => entry.slug === item.category)?.label ?? item.category}
                      </Badge>
                      <Badge tone={item.evidence === "prompt" ? "accent" : "neutral"}>
                        {item.evidence === "prompt" ? copy.promptIncluded : copy.setupShared}
                      </Badge>
                      <Badge tone="neutral">{item.structure === "team" ? copy.botTeam : copy.singleBot}</Badge>
                    </span>
                    <span className="mt-5 flex min-w-0 items-center gap-2.5">
                      <AuthorAvatar name={item.authorName} handle={item.handle} size={40} />
                      <span className="min-w-0">
                        <span className="block text-[15px] font-medium wrap-break-word text-ink">{item.authorName}</span>
                        {item.handle ? <span className="ui-meta mt-0.5 block text-mute">@{item.handle}</span> : null}
                      </span>
                    </span>
                  </span>
                </LocaleLink>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-4 border-y border-line py-12 text-center">
            <p className="ui-body text-mute">{copy.empty}</p>
            <button
              type="button"
              data-clear-use-case-filters
              onClick={clearAll}
              className="mt-4 min-h-11 text-[15px] font-medium text-accent hover:text-ink"
            >
              {browser.clearFilters}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function Badge({ children, tone }: { children: React.ReactNode; tone: "accent" | "neutral" }) {
  return (
    <span
      className={cn(
        "ui-label inline-flex items-center rounded-full px-2.5 py-1 text-mute",
        tone === "accent" ? "bg-accent-soft text-accent" : "border border-line text-mute",
      )}
    >
      {children}
    </span>
  );
}
