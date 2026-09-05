"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BlobatarAvatar } from "@/components/BlobatarAvatar";
import { LocaleLink } from "@/components/LocaleLink";
import { celebrate } from "@/lib/celebrate";
import { useI18n } from "@/lib/i18n";
import { teamSubmitCopy } from "@/lib/i18n/team-submit-ui";
import { site } from "@/lib/site";

function isPublicXUrl(value: string) {
  try {
    const url = new URL(value);
    return /^(www\.)?(x\.com|twitter\.com)$/i.test(url.hostname) && url.pathname.length > 1;
  } catch {
    return false;
  }
}

function identityFromXUrl(value: string) {
  try {
    const url = new URL(value.trim());
    if (!/^(www\.)?(x\.com|twitter\.com)$/i.test(url.hostname)) return "";
    return decodeURIComponent(url.pathname.split("/").filter(Boolean)[0] ?? "").replace(/^@/, "");
  } catch {
    return "";
  }
}

type IngestResponse = {
  status: "published" | "queued" | "extracted" | "skipped";
  slug?: string;
  url?: string;
  prUrl?: string;
  reason?: string;
  story?: { title?: string; slug?: string };
};

export default function SubmitPage() {
  const { t, locale } = useI18n();
  const copy = teamSubmitCopy(locale);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<IngestResponse | null>(null);
  const [xUrlPreview, setXUrlPreview] = useState("");
  const [prompt, setPrompt] = useState("");
  const [notes, setNotes] = useState("");
  const handle = identityFromXUrl(xUrlPreview);
  const identitySeed = handle || "your-grok-bot";
  const errorId = "submit-error";
  const hintId = "submit-url-hint";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const xUrl = xUrlPreview.trim();
    const promptValue = prompt.trim();
    const notesValue = notes.trim();
    if (!xUrl) {
      setError(copy.missing);
      return;
    }
    if (!isPublicXUrl(xUrl)) {
      setError(copy.invalidUrl);
      return;
    }

    setSending(true);
    setError("");
    setDone(null);
    try {
      const response = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ xUrl, prompt: promptValue, notes: notesValue }),
      });
      const data = (await response.json()) as IngestResponse;
      if (!response.ok) throw new Error("Submission failed");
      if (data.status === "skipped") {
        setError(data.reason || copy.skipped);
        return;
      }
      if (data.status === "extracted") {
        const title = `Ingest use case: ${xUrl}`;
        const body = [
          "## X post URL",
          xUrl,
          "",
          "## Prompt",
          promptValue || "Not provided",
          "",
          "## Notes",
          notesValue || "Not provided",
          "",
          "```json",
          JSON.stringify(data.story ?? {}, null, 2),
          "```",
        ].join("\n");
        window.location.href = `https://github.com/${site.githubRepo}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
        return;
      }
      if (data.status !== "published" && data.status !== "queued") throw new Error("Unexpected submission response");
      setDone(data);
      void celebrate("submit");
    } catch {
      setError(copy.failed);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-[760px] px-5 py-8 md:px-8 md:py-14">
      <h1 className="ui-page-title">{copy.submitTitle}</h1>
      <p className="mt-3 text-[15px] leading-6 text-mute">{copy.submitLead}</p>
      <p className="mt-2 text-[15px] leading-6 text-mute">{copy.submitHelp}</p>
      <p className="mt-2 text-[12px] leading-5 text-faint">{copy.submitReview}</p>

      {done ? (
        <div className="mt-8 rounded-2xl border border-line bg-card px-5 py-8">
          <div className="flex items-center gap-4">
            <BlobatarAvatar name={identitySeed} size={56} expression="love" />
            <div>
              <p className="text-[18px] font-medium text-ink">
                {done.status === "published" ? t("submit.published") : t("submit.queued")}
              </p>
              {handle ? <p className="mt-1 text-[12px] text-faint">@{handle}</p> : null}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {done.url ? (
              <LocaleLink
                href={done.url}
                className="accent-gradient inline-flex h-11 items-center rounded-[10px] px-4 text-[15px] font-medium"
              >
                {t("submit.viewStory")}
              </LocaleLink>
            ) : null}
            {done.prUrl ? (
              <a
                href={done.prUrl}
                className="inline-flex h-11 items-center rounded-[10px] border border-line px-4 text-[15px] text-ink"
                target="_blank"
                rel="noreferrer"
              >
                {t("submit.viewPr")}
              </a>
            ) : null}
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <section className="rounded-2xl border border-line bg-card p-4 md:p-5">
            <p className="text-[16px] font-medium text-ink">{copy.stepOne}</p>
            <label className="mt-3 block">
              <span className="mb-1.5 block text-[12px] font-medium text-faint">{copy.xUrl}</span>
              <input
                name="xUrl"
                required
                inputMode="url"
                autoComplete="url"
                placeholder="https://x.com/..."
                value={xUrlPreview}
                onChange={(event) => { setXUrlPreview(event.target.value); setError(""); }}
                aria-describedby={error ? `${hintId} ${errorId}` : hintId}
                aria-invalid={error ? true : undefined}
                className="h-11 w-full rounded-[10px] border border-line bg-input px-3 text-[15px] text-ink placeholder:text-faint"
              />
            </label>
            <p id={hintId} className="mt-2 text-[12px] leading-5 text-faint">
              {copy.xUrlHint}
            </p>

            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-elevated px-4 py-4">
              <BlobatarAvatar name={identitySeed} size={72} expression={handle ? "happy" : "thinking"} />
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-ink">{copy.previewTitle}</p>
                <p className="mt-1 truncate text-[15px] text-mute">
                  {handle ? `@${handle}` : copy.previewPlaceholder}
                </p>
                <p className="mt-1 text-[12px] leading-5 text-faint">{copy.previewBody}</p>
              </div>
            </div>
          </section>

          <details className="group rounded-2xl border border-line bg-card" data-submit-optional>
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block">{copy.optionalTitle}</span>
                <span className="mt-1 block text-[12px] font-normal leading-5 text-faint">{copy.optionalHint}</span>
              </span>
              <ChevronDown
                className="size-4 shrink-0 text-faint transition-transform group-open:rotate-180"
                strokeWidth={1.8}
                aria-hidden
              />
            </summary>
            <div className="space-y-4 border-t border-line px-4 py-4">
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-faint">{copy.prompt}</span>
                <textarea
                  name="prompt"
                  rows={8}
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 font-mono text-[15px] text-ink"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[12px] font-medium text-faint">{copy.notes}</span>
                <textarea
                  name="notes"
                  rows={4}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder={copy.notesHint}
                  className="w-full rounded-[10px] border border-line bg-input px-3 py-2.5 text-[15px] text-ink placeholder:text-faint"
                />
              </label>
            </div>
          </details>

          {error ? (
            <p id={errorId} className="text-[15px] text-danger" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={sending}
            className="accent-gradient h-11 rounded-[10px] px-5 text-[15px] font-medium text-inverse disabled:opacity-60"
          >
            {sending ? t("submit.sending") : copy.send}
          </button>
        </form>
      )}
    </div>
  );
}
