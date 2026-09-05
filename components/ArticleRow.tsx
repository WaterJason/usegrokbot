import { AuthorAvatar } from "@/components/AuthorAvatar";
import { articleExternalUrl } from "@/lib/articles";
import { formatCardDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { localizeDiscoverStory } from "@/lib/i18n/discover";
import type { Locale } from "@/lib/i18n/types";
import { formatViewCount, type RankedStory } from "@/lib/x-metrics";

export function ArticleRow({
  item,
  locale,
  viewsLabel,
  rank,
}: {
  item: RankedStory;
  locale: Locale;
  viewsLabel: string;
  rank?: number;
}) {
  const story = localizeDiscoverStory(item.story, locale);
  const href = articleExternalUrl(item.story);

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-2 py-5 transition-colors hover:bg-card-hover sm:flex sm:gap-4 md:gap-5"
      >
        {rank != null ? (
          <span className="col-start-1 row-start-1 w-6 shrink-0 pt-0.5 text-right text-[16px] font-medium tabular-nums text-mute sm:w-8 sm:pt-1">
            {rank}
          </span>
        ) : null}
        <span className="hidden shrink-0 sm:block">
          <AuthorAvatar name={story.authorName} handle={item.story.handle} size={40} />
        </span>
        <div className={cn("row-start-1 min-w-0 flex-1", rank != null ? "col-start-2" : "col-span-2")}>
          <p className="truncate text-[13px] font-medium text-ink">
            {story.authorName}
            {item.story.handle ? (
              <span className="ml-1 font-normal text-mute">@{item.story.handle}</span>
            ) : null}
          </p>
          <p className="mt-1 text-[16px] leading-6 text-ink sm:text-[15px]">{story.title}</p>
          <p className="mt-2 text-[12px] text-mute">{formatCardDate(item.story.publishedAt, locale)}</p>
        </div>
        <div className={cn("row-start-2 flex shrink-0 items-baseline gap-1.5 sm:block sm:pt-1 sm:text-right", rank != null ? "col-start-2" : "col-span-2")}>
          <p className="text-[18px] font-medium tabular-nums tracking-tight text-ink">
            {item.views > 0 ? formatViewCount(item.views, locale) : "—"}
          </p>
          <p className="text-[12px] text-mute sm:mt-0.5">{viewsLabel}</p>
        </div>
      </a>
    </li>
  );
}
