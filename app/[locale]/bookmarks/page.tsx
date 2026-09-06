import { BookmarksView } from "@/components/BookmarksView";
import { JsonLd } from "@/components/JsonLd";
import {
  bookmarkUiCopy,
  bookmarksForLocale,
  githubBookmarks,
  localizeBookmark,
  youtubeBookmarks,
} from "@/data/bookmarks";
import {
  chineseTeachingArticlesByViews,
  englishArticlesByViews,
  japaneseArticlesByViews,
} from "@/lib/articles";
import { absoluteUrl, localeFromParams } from "@/lib/i18n/paths";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { getYouTubeViews } from "@/lib/youtube-views";
import { getGithubResourceStars } from "@/lib/github-resource-stars";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = bookmarkUiCopy[locale];
  return pageMeta({
    title: copy.title,
    description: copy.intro,
    path: "/bookmarks",
    urlLocale,
  });
}

export default async function BookmarksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { urlLocale, locale } = localeFromParams((await params).locale);
  const copy = bookmarkUiCopy[locale];
  const github = bookmarksForLocale(githubBookmarks, locale).map((item) =>
    localizeBookmark(item, locale),
  );
  const youtube = bookmarksForLocale(youtubeBookmarks, locale).map((item) =>
    localizeBookmark(item, locale),
  );
  const chineseArticles = chineseTeachingArticlesByViews();
  const englishArticles = englishArticlesByViews(20);
  const japaneseArticles = japaneseArticlesByViews(20);
  const [githubStars, youtubeViews] = await Promise.all([
    getGithubResourceStars(github.map((item) => item.url)),
    getYouTubeViews(youtube.map((item) => item.url)),
  ]);
  const rankedGithub = [...github].sort(
    (a, b) => (githubStars[b.url]?.count ?? -1) - (githubStars[a.url]?.count ?? -1),
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: copy.title,
          description: copy.intro,
          url: absoluteUrl("/bookmarks", urlLocale),
          numberOfItems:
            github.length +
            youtube.length +
            chineseArticles.length +
            englishArticles.length +
            japaneseArticles.length,
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <BookmarksView
        github={rankedGithub}
        githubStars={githubStars}
        youtube={youtube}
        youtubeViews={youtubeViews}
        chineseArticles={chineseArticles}
        englishArticles={englishArticles}
        japaneseArticles={japaneseArticles}
      />
    </>
  );
}
