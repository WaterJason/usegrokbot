"use client";

import { useEffect, useId, useRef } from "react";
import { ExternalLink, X } from "lucide-react";
import { bookmarkUiCopy, type LocalizedBookmarkItem } from "@/data/bookmarks";
import { useI18n } from "@/lib/i18n";

export function YouTubeVideoDialog({
  video,
  videoId,
  returnFocusTo,
  onClose,
}: {
  video: LocalizedBookmarkItem;
  videoId: string;
  returnFocusTo: HTMLElement;
  onClose: () => void;
}) {
  const { locale } = useI18n();
  const copy = bookmarkUiCopy[locale];
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerLocale = locale === "zh-Hant" ? "zh-TW" : locale === "zh-Hans" ? "zh-CN" : locale;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (returnFocusTo.isConnected) {
        returnFocusTo.focus({ preventScroll: true });
      }
    };
  }, [returnFocusTo]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      data-youtube-dialog
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-[960px] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-card p-0 text-ink shadow-2xl backdrop:bg-black/70"
    >
      <div className="flex items-start justify-between gap-3 p-4 sm:px-5">
        <h2 id={titleId} className="ui-card-title min-w-0 self-center">{video.title}</h2>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          aria-label={copy.closeVideo}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-mute hover:bg-elevated hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&hl=${playerLocale}`}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="block aspect-video min-h-[200px] w-full border-0 bg-black"
      />
      <div className="flex justify-end p-4 sm:px-5">
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="ui-button-secondary">
          {copy.openYoutube}
          <ExternalLink aria-hidden className="size-4" strokeWidth={1.75} />
        </a>
      </div>
    </dialog>
  );
}
