"use client";

import { useState } from "react";
import { TemplateList } from "@/components/TemplateList";
import type { BotTemplate } from "@/data/templates";
import {
  interpolateTemplateHubCopy,
  templateHubUiCopy,
  type TemplateTeamMode,
} from "@/data/template-types";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n/types";

export function TemplateTeamBrowser({
  builders,
  orchestrators,
  locale,
}: {
  builders: readonly BotTemplate[];
  orchestrators: readonly BotTemplate[];
  locale: Locale;
}) {
  const copy = templateHubUiCopy[locale];
  const [mode, setMode] = useState<TemplateTeamMode>("builder");
  const [hasChanged, setHasChanged] = useState(false);
  const items = mode === "builder" ? builders : orchestrators;
  const resultCount = interpolateTemplateHubCopy(copy.categoryCount, { n: items.length });
  const resultTitle = mode === "builder" ? copy.builderListTitle : copy.orchestratorListTitle;
  const selectedBody = mode === "builder" ? copy.builderBody : copy.orchestratorBody;

  function selectMode(next: TemplateTeamMode) {
    setMode(next);
    setHasChanged(true);
  }

  return (
    <>
      <section className="pt-4 md:pt-6">
        <div
          className="min-w-0"
          data-team-mode-picker
          data-active-mode={mode}
          role="group"
          aria-label={copy.categoryLabel}
        >
          <p className="ui-label mb-2 text-ink">{copy.categoryLabel}</p>
          <div className="grid grid-cols-2 gap-2">
            <ModeOption
              checked={mode === "builder"}
              value="builder"
              title={copy.builderTitle}
              count={builders.length}
              countLabel={copy.categoryCount}
              onSelect={selectMode}
            />
            <ModeOption
              checked={mode === "orchestrator"}
              value="orchestrator"
              title={copy.orchestratorTitle}
              count={orchestrators.length}
              countLabel={copy.categoryCount}
              onSelect={selectMode}
            />
          </div>
          <p className="ui-body mt-3 text-mute" aria-live="polite">
            {selectedBody}
          </p>
        </div>
      </section>

      <section id="team-template-results" className="mt-4" aria-labelledby="team-template-list">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="team-template-list" className="ui-section-title">
            {resultTitle}
          </h2>
          <p className="ui-count font-medium text-ink" aria-live="polite">
            {resultCount}
          </p>
        </div>
        <div key={mode} className={cn(hasChanged && "template-results-reveal")}>
          <TemplateList items={items} variant="team" pager={false} heading="h3" />
        </div>
      </section>
    </>
  );
}

function ModeOption({
  checked,
  value,
  title,
  count,
  countLabel,
  onSelect,
}: {
  checked: boolean;
  value: TemplateTeamMode;
  title: string;
  count: number;
  countLabel: string;
  onSelect: (mode: TemplateTeamMode) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      aria-controls="team-template-results"
      data-team-mode={value}
      onClick={() => onSelect(value)}
      className={cn(
        "flex min-h-11 min-w-0 flex-col justify-center rounded-xl border px-3 py-2.5 text-left transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-4",
        checked
          ? "border-accent bg-accent-soft"
          : "border-line bg-card hover:border-line-strong",
      )}
    >
      <span className="ui-card-title">{title}</span>
      <span
        className={cn(
          "ui-count mt-1 block font-medium",
          checked ? "text-accent" : "text-ink",
        )}
      >
        {interpolateTemplateHubCopy(countLabel, { n: count })}
      </span>
    </button>
  );
}
