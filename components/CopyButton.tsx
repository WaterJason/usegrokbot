"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import { celebrate } from "@/lib/celebrate";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/i18n";
import { readingUiCopy } from "@/lib/i18n/reading-ui";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
  variant?: "ghost" | "solid" | "inline" | "inverse";
};

const COPY_CELEBRATION_KEY = "usegrokbot:copy-celebrated";

export function CopyButton({ text, label, className, variant = "ghost" }: CopyButtonProps) {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const copying = useRef(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);
  const idleLabel = label ?? t("copy.prompt");

  async function onCopy() {
    if (copying.current) return;
    copying.current = true;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const focused = document.activeElement;
        const area = document.createElement("textarea");
        area.value = text;
        area.style.cssText = "position:fixed;inset:0 auto auto 0;opacity:0;pointer-events:none";
        document.body.appendChild(area);
        try {
          area.select();
          if (!document.execCommand("copy")) throw new Error("Copy failed");
        } finally {
          area.remove();
          if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
        }
      }
      setStatus("copied");
      try {
        if (!window.sessionStorage.getItem(COPY_CELEBRATION_KEY)) {
          window.sessionStorage.setItem(COPY_CELEBRATION_KEY, "1");
          void celebrate("copy");
        }
      } catch {
        // Storage is optional; it must not affect copying.
      }
    } catch {
      setStatus("error");
    } finally {
      copying.current = false;
      resetTimer.current = setTimeout(() => setStatus("idle"), 2200);
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        "spring-press inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2 text-[15px] leading-5 font-medium transition-colors",
        variant === "ghost" &&
          "border border-line bg-transparent text-mute hover:border-line-strong hover:text-ink",
        variant === "solid" && "bg-ink px-5 text-inverse hover:opacity-90",
        variant === "inline" && "px-2.5 text-mute hover:bg-elevated hover:text-ink",
        variant === "inverse" && "px-2.5 text-inverse/80 hover:text-inverse",
        className,
      )}
    >
      {status === "copied" ? (
        <Check aria-hidden className="size-4 shrink-0 text-ok" strokeWidth={2} />
      ) : status === "error" ? (
        <RotateCcw aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
      ) : (
        <Copy aria-hidden className="size-4 shrink-0" strokeWidth={1.75} />
      )}
      <span aria-live="polite">{status === "copied" ? t("copy.copied") : status === "error" ? readingUiCopy[locale].copyFailed : idleLabel}</span>
    </button>
  );
}
