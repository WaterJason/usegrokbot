import { Grok47View } from "@/components/grok47/Grok47View";
import { grok47Copy } from "@/lib/i18n/grok47";
import { localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = grok47Copy[locale];
  return pageMeta({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: "/grok-4-7",
    urlLocale,
    index: false,
    follow: false,
  });
}

export default function Grok47Page() {
  return <Grok47View />;
}
