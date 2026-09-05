"use client";

import { useI18n } from "@/lib/i18n";
import { CopyButton } from "./CopyButton";

export function PromptBox({ prompt, title, showTitle = true }: { prompt: string; title?: string; showTitle?: boolean }) {
  const { t } = useI18n();

  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-elevated">
      <div className={`flex items-center ${showTitle ? "justify-between" : "justify-end"} border-b border-line bg-card px-4 py-2.5`}>
        {showTitle ? <span className="ui-label font-mono text-mute uppercase">
          {title ?? t("detail.promptTitle")}
        </span> : null}
        <CopyButton text={prompt} label={t("copy.short")} variant="inline" className="h-10 text-[15px]" />
      </div>
      <pre className="prompt-scroll ui-body max-h-[480px] overflow-auto bg-input px-5 py-5 font-mono whitespace-pre-wrap text-ink">
        {prompt}
      </pre>
    </div>
  );
}
