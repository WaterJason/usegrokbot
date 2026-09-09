"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Download, Trash2 } from "lucide-react";
import {
  extractPromptFromPost,
  parseXStatusUrl,
  type CollectedPrompt,
  type Grok47CategorySlug,
} from "@/data/grok47";
import type { Grok47Copy } from "@/lib/i18n/grok47";

const STORAGE_KEY = "usegrokbot:grok47-prompts";
const PROMPTS_EVENT = "usegrokbot:g47-prompts";
const EMPTY_PROMPTS: CollectedPrompt[] = [];

let promptCacheRaw = "";
let promptCache: CollectedPrompt[] = EMPTY_PROMPTS;

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

export function loadLocalPrompts(): CollectedPrompt[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY) ?? "";
    if (raw === promptCacheRaw) return promptCache;
    const parsed = raw ? (JSON.parse(raw) as CollectedPrompt[]) : [];
    promptCacheRaw = raw;
    promptCache = Array.isArray(parsed) ? parsed.filter((item) => item?.prompt && item.id) : EMPTY_PROMPTS;
    return promptCache;
  } catch {
    return promptCache;
  }
}

export function saveLocalPrompts(items: CollectedPrompt[]) {
  const raw = JSON.stringify(items);
  window.localStorage.setItem(STORAGE_KEY, raw);
  promptCacheRaw = raw;
  promptCache = items;
  window.dispatchEvent(new Event(PROMPTS_EVENT));
}

export function subscribeLocalPrompts(onChange: () => void) {
  window.addEventListener(PROMPTS_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PROMPTS_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function emptyLocalPrompts() {
  return EMPTY_PROMPTS;
}

function PromptRow({
  item,
  copy,
  onRemove,
}: {
  item: CollectedPrompt;
  copy: Grok47Copy;
  onRemove?: (id: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const category =
    item.category === "unspecified" ? copy.promptsChip : copy.categories[item.category as Grok47CategorySlug];

  async function onCopy() {
    await writeClipboard(item.prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <article className="g47-prompt-card">
      <header>
        <span>
          @{item.handle || "local"} · {item.authorName} · {category}
        </span>
        <span>{item.origin === "local" ? copy.savedLocal : copy.postedPrompt}</span>
      </header>
      <pre className="g47-prompt-body">{item.prompt}</pre>
      <div className="g47-prompt-actions" style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 12 }}>
        <button type="button" className="g47-ghost" onClick={onCopy}>
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? copy.copied : copy.copyPrompt}
        </button>
        {item.sourceUrl ? (
          <a className="g47-ghost" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
            {copy.viewOnX} ↗
          </a>
        ) : null}
        {item.origin === "local" && onRemove ? (
          <button type="button" className="g47-ghost" onClick={() => onRemove(item.id)}>
            <Trash2 size={13} />
            {copy.removeLocal}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export function PromptVault({
  copy,
  catalog,
  localItems,
  onLocalChange,
}: {
  copy: Grok47Copy;
  catalog: CollectedPrompt[];
  localItems: CollectedPrompt[];
  onLocalChange: (items: CollectedPrompt[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [post, setPost] = useState("");
  const [author, setAuthor] = useState("");
  const [prompt, setPrompt] = useState("");
  const [notice, setNotice] = useState("");

  const merged = useMemo(() => {
    const ids = new Set(localItems.map((item) => item.sourceId).filter(Boolean));
    const fromCatalog = catalog.filter((item) => !ids.has(item.sourceId));
    const list = [...localItems, ...fromCatalog];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((item) =>
      `${item.prompt} ${item.authorName} ${item.handle} ${item.postText}`.toLowerCase().includes(q),
    );
  }, [catalog, localItems, query]);

  function extract() {
    const found = extractPromptFromPost(post);
    if (found) {
      setPrompt(found);
      setNotice("");
    } else {
      setNotice(copy.extractedEmpty);
    }
    const parsed = parseXStatusUrl(url);
    if (parsed && !author) setAuthor(parsed.handle);
  }

  function save() {
    const parsed = parseXStatusUrl(url);
    const text = prompt.trim() || extractPromptFromPost(post) || "";
    if (!text) {
      setNotice(copy.extractedEmpty);
      return;
    }
    const next: CollectedPrompt = {
      id: `local:${parsed?.id ?? Date.now()}`,
      sourceUrl: url.trim(),
      authorName: author.trim() || parsed?.handle || "local",
      handle: parsed?.handle ?? "local",
      postText: post.trim(),
      prompt: text,
      category: "unspecified",
      savedAt: new Date().toISOString(),
      origin: "local",
    };
    const items = [next, ...localItems.filter((item) => item.id !== next.id)];
    onLocalChange(items);
    saveLocalPrompts(items);
    setNotice(copy.savedLocal);
    setPrompt("");
    setPost("");
    setUrl("");
  }

  function remove(id: string) {
    const items = localItems.filter((item) => item.id !== id);
    onLocalChange(items);
    saveLocalPrompts(items);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(merged, null, 2)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "grok-4-7-prompts.json";
    a.click();
    URL.revokeObjectURL(href);
  }

  return (
    <section className="g47-section" id="prompts">
      <div className="g47-section-head">
        <div>
          <h2 className="g47-h2">{copy.vaultTitle}</h2>
          <p className="g47-lede" style={{ marginTop: 8 }}>
            {copy.vaultBody}
          </p>
        </div>
        <output className="g47-count">
          {merged.length} {copy.vaultCount}
        </output>
      </div>

      {merged.length === 0 ? (
        <div className="g47-empty">
          <p className="g47-empty-title">{copy.vaultEmpty}</p>
        </div>
      ) : (
        <>
          <div className="g47-toolbar">
            <label className="g47-pills" style={{ flex: "1 1 240px", padding: "5px 6px 5px 14px" }}>
              <span className="sr-only">{copy.vaultSearch}</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.vaultSearch}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: 0,
                  color: "inherit",
                  font: "inherit",
                  minHeight: 36,
                  outline: "none",
                }}
              />
            </label>
            <button type="button" className="g47-pill" onClick={exportJson}>
              <Download size={14} />
              {copy.exportJson}
            </button>
          </div>

          <div className="g47-vault-list">
            {merged.map((item) => (
              <PromptRow key={item.id} item={item} copy={copy} onRemove={remove} />
            ))}
          </div>
        </>
      )}

      <div className="g47-collector">
        <h3 className="g47-h2" style={{ fontSize: 20 }}>
          {copy.collectorTitle}
        </h3>
        <p className="g47-lede" style={{ marginTop: 8 }}>
          {copy.collectorBody}
        </p>
        <div className="g47-fields">
          <label>
            {copy.urlLabel}
            <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder={copy.urlPlaceholder} />
          </label>
          <label>
            {copy.authorLabel}
            <input value={author} onChange={(event) => setAuthor(event.target.value)} />
          </label>
          <label>
            {copy.pasteLabel}
            <textarea value={post} onChange={(event) => setPost(event.target.value)} placeholder={copy.pastePlaceholder} />
          </label>
          <label>
            {copy.postedPrompt}
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
          </label>
        </div>
        <div className="g47-prompt-actions" style={{ paddingLeft: 0, paddingTop: 16 }}>
          <button type="button" className="g47-ghost" onClick={extract}>
            {copy.extract}
          </button>
          <button type="button" className="g47-cta" onClick={save} style={{ height: 36, fontSize: 13 }}>
            {copy.saveLocal}
          </button>
        </div>
        {notice ? <p className="g47-note">{notice}</p> : null}
      </div>
      <p className="g47-note">{copy.sampleNote}</p>
    </section>
  );
}
