"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CensusNumber } from "@/components/PostCensus";
import { TemplateList } from "@/components/TemplateList";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import {
  templateCategorySlugs,
  templates,
  templatesForFilters,
  type TemplateCategorySlug,
} from "@/data/templates";
import {
  interpolateTemplateHubCopy,
  templateHubUiCopy,
  type TemplateTypeFilter,
} from "@/data/template-types";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import {
  filterTemplatesByQuery,
  interpolateTemplateBrowserCopy,
  templateBrowserCopy,
} from "@/lib/i18n/template-browser";

export function TemplatesView() {
  const { locale, t, urlLocale } = useI18n();
  const copy = templateHubUiCopy[locale];
  const browserCopy = templateBrowserCopy[locale];
  const [category, setCategory] = useState<TemplateCategorySlug | "all">("all");
  const [templateType, setTemplateType] = useState<TemplateTypeFilter>("all");
  const [query, setQuery] = useState("");
  const [hasFiltered, setHasFiltered] = useState(false);
  const filtered = useMemo(
    () => templatesForFilters(category, templateType),
    [category, templateType],
  );
  const items = useMemo(
    () => filterTemplatesByQuery(filtered, query, locale),
    [filtered, locale, query],
  );
  const hasQuery = query.trim().length > 0;
  const isFiltered = category !== "all" || templateType !== "all" || hasQuery;
  const description = isFiltered
    ? interpolateTemplateHubCopy(copy.filteredBody, { n: items.length })
    : t("templates.allBody", { n: items.length });
  const resultCount = interpolateTemplateBrowserCopy(browserCopy.resultCount, {
    n: items.length,
  });

  function markFiltered() {
    setHasFiltered(true);
  }

  function selectTemplateType(next: TemplateTypeFilter) {
    if (next === templateType) return;
    markFiltered();
    setTemplateType(next);
  }

  function selectCategory(next: TemplateCategorySlug | "all") {
    if (next === category) return;
    markFiltered();
    setCategory(next);
  }

  function clearAll() {
    markFiltered();
    setCategory("all");
    setTemplateType("all");
    setQuery("");
  }

  if (!templates.length) {
    return (
      <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
        <h1 className="text-[clamp(28px,4vw,40px)] font-medium tracking-tight text-ink">
          {t("templates.allTitle")}
        </h1>
        <p className="ui-page-intro mt-3">{t("templates.empty")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
      <TemplatesModeNav active="all" locale={locale} urlLocale={urlLocale} />

      <h1 className="ui-page-title flex flex-wrap items-baseline gap-x-3 pt-8 md:pt-10">
        <span>{t("templates.allTitle")}</span>
        <CensusNumber accessible total={items.length} className="text-[1em] leading-none" />
      </h1>
      <p className="ui-page-intro mt-3">{description}</p>

      <div className="mt-7 space-y-5">
        <label className="block w-full min-w-0">
          <span className="mb-2 block ui-label text-mute">{browserCopy.searchLabel}</span>
          <span className="relative block">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-mute"
              strokeWidth={1.75}
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                markFiltered();
                setQuery(event.target.value);
              }}
              placeholder={browserCopy.searchPlaceholder}
              autoComplete="off"
              data-template-search
              className={cn("h-12 w-full rounded-[10px] border border-line bg-card pl-10 text-[16px] text-ink outline-none placeholder:text-mute focus:border-accent", hasQuery ? "pr-24" : "pr-3")}
            />
            {hasQuery ? (
              <button
                type="button"
                onClick={() => {
                  markFiltered();
                  setQuery("");
                }}
                data-clear-template-search
                className="absolute top-1/2 right-1 inline-flex h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-[8px] px-3 text-[15px] font-medium text-accent hover:bg-accent-soft"
              >
                {browserCopy.searchClear}
              </button>
            ) : null}
          </span>
        </label>

        <fieldset className="w-full min-w-0">
          <legend className="mb-2 ui-label text-mute">{copy.typeLabel}</legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={templateType === "all"}
              onClick={() => selectTemplateType("all")}
              label={copy.typeAll}
            />
            <Chip
              active={templateType === "single"}
              onClick={() => selectTemplateType("single")}
              label={copy.typeSingle}
            />
            <Chip
              active={templateType === "team"}
              onClick={() => selectTemplateType("team")}
              label={copy.typeTeam}
            />
          </div>
        </fieldset>

        <fieldset className="w-full min-w-0">
          <legend className="mb-2 ui-label text-mute">{t("filters.category")}</legend>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={category === "all"}
              onClick={() => selectCategory("all")}
              label={t("templates.catAll")}
            />
            {templateCategorySlugs.map((item) => (
              <Chip
                key={item}
                active={category === item}
                onClick={() => selectCategory(item)}
                label={t("templates.cat" + item.charAt(0).toUpperCase() + item.slice(1))}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p data-template-result-count className="ui-count font-medium text-ink">
          {resultCount}
        </p>
        {isFiltered ? (
          <button
            type="button"
            onClick={clearAll}
            data-clear-template-filters
            className="inline-flex min-h-11 items-center rounded-[10px] px-3 text-[15px] font-medium text-accent hover:bg-accent-soft"
          >
            {browserCopy.clearAll}
          </button>
        ) : null}
      </div>

      <div
        key={templateType + ":" + category + ":" + query.trim()}
        className={cn("mt-8", hasFiltered && !hasQuery && "template-results-reveal")}
      >
        {items.length ? (
          <TemplateList items={items} />
        ) : (
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="ui-body text-ink">
              {hasQuery ? browserCopy.emptySearch : copy.filterEmpty}
            </p>
            <p className="mt-2 ui-body text-mute">{browserCopy.emptySearchHint}</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 inline-flex min-h-11 items-center rounded-[10px] border border-line px-4 text-[15px] font-medium text-ink hover:border-line-strong hover:bg-elevated"
            >
              {browserCopy.clearAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
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
        "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-[15px] font-medium transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-line bg-card text-mute hover:border-line-strong hover:bg-elevated hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
