import { TemplateTeamBrowser } from "@/components/TemplateTeamBrowser";
import { TemplatesModeNav } from "@/components/TemplatesModeNav";
import { teamTemplates } from "@/data/templates";
import { interpolateTemplateHubCopy, templateHubUiCopy } from "@/data/template-types";
import { teamSubmitCopy } from "@/lib/i18n/team-submit-ui";
import type { UrlLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/types";

export function TemplatesTeamIndex({
  locale,
  urlLocale,
}: {
  locale: Locale;
  urlLocale: UrlLocale;
}) {
  const copy = templateHubUiCopy[locale];
  const allItems = teamTemplates();
  const builders = teamTemplates("builder");
  const orchestrators = teamTemplates("orchestrator");
  const countLabel = interpolateTemplateHubCopy(copy.teamCount, { n: allItems.length });

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-5 md:px-8 md:py-10" data-template-team-index>
      <TemplatesModeNav active="teams" locale={locale} urlLocale={urlLocale} />

      <header className="border-b border-line pb-4 pt-5 md:pb-5 md:pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h1 className="ui-page-title">
            {copy.teamTitle}
          </h1>
          <p className="ui-count font-medium text-ink">{countLabel}</p>
        </div>
        <p className="ui-page-intro mt-3">{teamSubmitCopy(locale).teamIntro}</p>
      </header>

      <TemplateTeamBrowser builders={builders} orchestrators={orchestrators} locale={locale} />

      <p className="ui-body mt-8 border-t border-line pt-4 text-mute">
        {copy.evidenceNote}
      </p>
    </div>
  );
}
