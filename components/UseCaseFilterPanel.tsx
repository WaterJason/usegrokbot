"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { useCaseBrowserCopy } from "@/lib/i18n/use-case-browser";

export type UseCaseFilterOption = {
  value: string;
  label: string;
};

function subscribeMobile(onChange: () => void) {
  const media = window.matchMedia("(max-width: 767px)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}
const getMobile = () => window.matchMedia("(max-width: 767px)").matches;
const getServerMobile = () => false;

export function UseCaseFilterPanel({
  open,
  onOpenChange,
  evidence,
  structure,
  evidenceLabel,
  structureLabel,
  evidenceOptions,
  structureOptions,
  resultCount,
  onEvidenceChange,
  onStructureChange,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evidence: string;
  structure: string;
  evidenceLabel: string;
  structureLabel: string;
  evidenceOptions: readonly UseCaseFilterOption[];
  structureOptions: readonly UseCaseFilterOption[];
  resultCount: number;
  onEvidenceChange: (value: string) => void;
  onStructureChange: (value: string) => void;
  onClear: () => void;
}) {
  const { locale } = useI18n();
  const copy = useCaseBrowserCopy(locale);
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const extraCount = Number(evidence !== "all") + Number(structure !== "all");
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, getServerMobile);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    if (isMobile) {
      dialog?.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      dialog?.close();
      if (isMobile) document.body.style.overflow = previousOverflow;
      if (getMobile() && previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [isMobile, open]);

  if (!open && !isMobile) return null;

  const content = (
    <>
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line md:hidden" aria-hidden />

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id={titleId} className="ui-card-title">
              {copy.filtersTitle}
            </h2>
            {extraCount > 0 ? (
              <p className="mt-1 text-[16px] text-mute">{copy.filterCount(extraCount)}</p>
            ) : null}
          </div>
          <button
            autoFocus={isMobile}
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-mute hover:border-line-strong hover:text-ink"
            aria-label={copy.closeFilters}
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-5 grid gap-6">
          <FilterChoiceGroup
            label={evidenceLabel}
            value={evidence}
            options={evidenceOptions}
            onChange={onEvidenceChange}
          />
          <FilterChoiceGroup
            label={structureLabel}
            value={structure}
            options={structureOptions}
            onChange={onStructureChange}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="spring-press inline-flex min-h-11 flex-1 items-center justify-center rounded-[10px] bg-ink px-4 text-[16px] font-medium text-inverse hover:opacity-90 sm:flex-none"
          >
            {copy.showResults(resultCount)}
          </button>
          {extraCount > 0 ? (
            <button
              type="button"
              data-clear-use-case-filters
              onClick={onClear}
              className="inline-flex min-h-11 items-center justify-center rounded-[10px] border border-line px-4 text-[15px] font-medium text-ink hover:border-line-strong"
            >
              {copy.clearFilters}
            </button>
          ) : null}
        </div>
    </>
  );

  return isMobile ? (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      data-use-case-filter-panel
      onCancel={() => onOpenChange(false)}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientY < rect.top || event.clientY > rect.bottom || event.clientX < rect.left || event.clientX > rect.right) onOpenChange(false);
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-[20px] border border-line bg-card px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-ink backdrop:bg-black/40"
    >
      {content}
    </dialog>
  ) : (
    <section data-use-case-filter-panel aria-labelledby={titleId} className="mt-4 rounded-2xl border border-line bg-card p-5">
      {content}
    </section>
  );
}

function FilterChoiceGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly UseCaseFilterOption[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-2 ui-label text-mute">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              data-filter-value={option.value}
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-3.5 text-[15px] font-medium transition-colors",
                active
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line bg-card text-mute hover:border-line-strong hover:text-ink",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

