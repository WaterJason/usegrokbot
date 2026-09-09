"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Copy } from "lucide-react";
import type { Grok47Creation } from "@/data/grok47";
import type { Grok47Copy } from "@/lib/i18n/grok47";
import type { Locale } from "@/lib/i18n/types";

const AVATAR = ["#3d6d99", "#5b4d8a", "#2f6f64", "#7a4e3b", "#4d6380", "#6a4d6e"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

export function CreationCard({
  item,
  locale,
  copy,
  saved,
  onSave,
}: {
  item: Grok47Creation;
  locale: Locale;
  copy: Grok47Copy;
  saved: boolean;
  onSave: (item: Grok47Creation) => void;
}) {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const category = copy.categories[item.category];
  const href = item.xPostUrl;
  const color = AVATAR[Math.abs(item.handle.length * 13 + item.id.length) % AVATAR.length];

  async function copyPrompt() {
    if (!item.prompt) return;
    await writeClipboard(item.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article className="g47-card">
      <div className="g47-card-top">
        <span>{category}</span>
        {item.featured ? <span>{copy.featured}</span> : null}
      </div>
      <h3 className="g47-card-title">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <span>{item.title[locale]}</span>
            <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden />
          </a>
        ) : (
          <span>{item.title[locale]}</span>
        )}
      </h3>

      <div className="g47-embed">
        <div className="g47-tweet">
          <div className="g47-tweet-head">
            <span className="g47-avatar" style={{ background: color }} aria-hidden>
              {initials(item.authorName)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="g47-tweet-name">
                {item.authorName}
                {item.verified ? " ✓" : ""}
              </div>
              <div className="g47-tweet-meta">
                <span>@{item.handle}</span>
                {href ? (
                  <a className="g47-follow" href={`https://x.com/${item.handle}`} target="_blank" rel="noopener noreferrer">
                    {copy.follow}
                  </a>
                ) : null}
              </div>
            </div>
            <span className="g47-x" aria-hidden>
              𝕏
            </span>
          </div>
          <p className="g47-tweet-body">{item.postText[locale]}</p>
          {item.media ? <div className="g47-media">{item.media.label[locale]}</div> : null}
        </div>
      </div>

      <div className="g47-fold">
        <button type="button" aria-expanded={aboutOpen} onClick={() => setAboutOpen((open) => !open)}>
          {copy.aboutCreation}
          <ChevronDown size={16} style={{ transform: aboutOpen ? "rotate(180deg)" : undefined }} aria-hidden />
        </button>
        {aboutOpen ? <p>{item.summary[locale]}</p> : null}
      </div>

      <div className="g47-fold g47-prompt">
        <button type="button" aria-expanded={promptOpen} onClick={() => setPromptOpen((open) => !open)}>
          {copy.postedPrompt}
          <ChevronDown size={16} style={{ transform: promptOpen ? "rotate(180deg)" : undefined }} aria-hidden />
        </button>
        {promptOpen ? (
          item.prompt ? (
            <>
              <pre className="g47-prompt-body">{item.prompt}</pre>
              <div className="g47-prompt-actions">
                <button type="button" className="g47-ghost" onClick={copyPrompt}>
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? copy.copied : copy.copyPrompt}
                </button>
                <button type="button" className="g47-ghost" onClick={() => onSave(item)} disabled={saved}>
                  {saved ? copy.savedPrompt : copy.savePrompt}
                </button>
              </div>
            </>
          ) : (
            <p>{copy.noPrompt}</p>
          )
        ) : null}
      </div>

      <div className="g47-card-foot">
        <span>{category}</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {copy.viewOnX} ↗
          </a>
        ) : (
          <span>{copy.sampleBadge}</span>
        )}
      </div>
    </article>
  );
}
