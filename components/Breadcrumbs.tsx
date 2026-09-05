"use client";

import { LocaleLink } from "@/components/LocaleLink";
import { useI18n } from "@/lib/i18n";
import { readingUiCopy } from "@/lib/i18n/reading-ui";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { locale } = useI18n();
  return (
    <nav aria-label={readingUiCopy[locale].breadcrumbLabel} className="ui-meta text-mute">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex min-w-0 items-start gap-2">
            {index > 0 ? <span className="shrink-0" aria-hidden>→</span> : null}
            {item.href ? (
              <LocaleLink href={item.href} className="hover:text-ink">
                {item.label}
              </LocaleLink>
            ) : (
              <span className="text-mute">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
