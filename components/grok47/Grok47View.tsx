"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import "./grok47.css";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GrokLogo } from "./GrokLogo";
import {
  collectedFromCreation,
  grok47CategorySlugs,
  grok47Creations,
  grok47PromptCount,
  type CollectedPrompt,
  type Grok47CategorySlug,
  type Grok47Creation,
} from "@/data/grok47";
import { grok47Copy } from "@/lib/i18n/grok47";
import { useI18n } from "@/lib/i18n";
import { CreationCard } from "./CreationCard";
import {
  emptyLocalPrompts,
  loadLocalPrompts,
  PromptVault,
  saveLocalPrompts,
  subscribeLocalPrompts,
} from "./PromptVault";

type Filter = "all" | "prompts" | Grok47CategorySlug;
type Sort = "featured" | "latest";

export function Grok47View() {
  const { locale } = useI18n();
  const copy = grok47Copy[locale];
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const localPrompts = useSyncExternalStore(subscribeLocalPrompts, loadLocalPrompts, emptyLocalPrompts);

  const catalogPrompts = useMemo(
    () => grok47Creations.map((item) => collectedFromCreation(item, locale)).filter((item): item is CollectedPrompt => Boolean(item)),
    [locale],
  );

  const savedIds = useMemo(() => new Set(localPrompts.map((item) => item.sourceId).filter(Boolean)), [localPrompts]);

  const filtered = useMemo(() => {
    let list: Grok47Creation[] = grok47Creations;
    if (filter === "prompts") list = list.filter((item) => Boolean(item.prompt));
    else if (filter !== "all") list = list.filter((item) => item.category === filter);
    if (sort === "latest") {
      return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt));
  }, [filter, sort]);

  const counts = useMemo(() => {
    const next: Record<string, number> = { all: grok47Creations.length, prompts: grok47PromptCount() };
    for (const slug of grok47CategorySlugs) {
      next[slug] = grok47Creations.filter((item) => item.category === slug).length;
    }
    return next;
  }, []);

  function saveFromCard(item: Grok47Creation) {
    const collected = collectedFromCreation(item, locale);
    if (!collected) return;
    const localItem: CollectedPrompt = {
      ...collected,
      id: `local:${item.id}`,
      origin: "local",
      savedAt: new Date().toISOString(),
    };
    const next = [localItem, ...localPrompts.filter((entry) => entry.sourceId !== item.id && entry.id !== localItem.id)];
    saveLocalPrompts(next);
  }

  const hasCatalog = grok47Creations.length > 0;

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: copy.all, count: counts.all },
    ...grok47CategorySlugs.map((slug) => ({
      id: slug,
      label: copy.categories[slug],
      count: counts[slug],
    })),
    { id: "prompts", label: copy.promptsChip, count: counts.prompts },
  ];

  return (
    <div className="g47">
      <a className="g47-skip" href="#collection">
        {copy.skip}
      </a>

      <section className="g47-hero" aria-label={copy.builtWith}>
        <div className="g47-hero-grid">
          <p className="g47-eyebrow">
            {copy.unofficial}{" "}
            <a href="https://grok.com" target="_blank" rel="noopener noreferrer">
              {copy.about} <ArrowUpRight size={12} aria-hidden />
            </a>
          </p>
          <h1 className="g47-display g47-display-left">{copy.builtWith}</h1>
          <div className="g47-hero-bot" role="img" aria-label="Grok">
            <div className="g47-hero-bot-mark">
              <GrokLogo className="g47-hero-bot-svg" />
            </div>
          </div>
          <p className="g47-display g47-display-right">{copy.modelName}</p>
          <p className="g47-kicker">{copy.discover}</p>
          <div className="g47-hero-cta">
            <a className="g47-cta" href="#collection">
              {copy.exploreCollection} <ArrowDown size={16} aria-hidden />
            </a>
          </div>
        </div>
      </section>

      <section className="g47-section" id="collection">
        <div className="g47-section-head">
          <div style={{ display: "grid", gap: 8 }}>
            <h2 className="g47-h2">{copy.everyone}</h2>
            {hasCatalog ? <p className="g47-lede">{copy.originalPosts}</p> : null}
          </div>
          <output className="g47-count">
            {filtered.length} {copy.creations}
          </output>
        </div>

        {hasCatalog ? (
          <>
            <div className="g47-toolbar">
              <div className="g47-pills" role="group" aria-label={copy.filterAria}>
                {filters.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="g47-pill"
                    aria-pressed={filter === item.id}
                    onClick={() => setFilter(item.id)}
                  >
                    {item.label}
                    <small>{item.count}</small>
                  </button>
                ))}
              </div>
              <div className="g47-pills" role="group" aria-label={copy.sortAria}>
                <button type="button" className="g47-pill" aria-pressed={sort === "featured"} onClick={() => setSort("featured")}>
                  {copy.featured}
                </button>
                <button type="button" className="g47-pill" aria-pressed={sort === "latest"} onClick={() => setSort("latest")}>
                  {copy.latest}
                </button>
              </div>
            </div>

            <div className="g47-grid">
              {filtered.map((item) => (
                <CreationCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  copy={copy}
                  saved={savedIds.has(item.id)}
                  onSave={saveFromCard}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="g47-empty">
            <p className="g47-empty-title">{copy.collectionEmpty}</p>
            <p>{copy.collectionEmptyHint}</p>
            <a href="#prompts">{copy.collectorTitle}</a>
          </div>
        )}
      </section>

      <PromptVault copy={copy} catalog={catalogPrompts} localItems={localPrompts} onLocalChange={saveLocalPrompts} />

      <p className="g47-note g47-legal">{copy.footerLegal}</p>
    </div>
  );
}
