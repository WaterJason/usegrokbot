import assert from "node:assert/strict";
import {
  getTemplateIdentity,
  templateGroupsForIdentity,
  templateIdentitySlugs,
} from "../data/template-identities";
import { templates, templatesForFilters } from "../data/templates";
import {
  filterTemplatesByQuery,
  interpolateTemplateBrowserCopy,
  localizedTemplateFields,
  matchFocusToGroup,
  templateBrowserCopy,
  templateCardCopy,
} from "../lib/i18n/template-browser";

const locales = ["en", "zh-Hant", "zh-Hans", "ja"] as const;

for (const locale of locales) {
  const copy = templateBrowserCopy[locale];
  assert.ok(copy.openInGrokBot.trim(), locale + " needs Open in Grok Bot copy");
  assert.ok(copy.searchPlaceholder.trim(), locale + " needs search placeholder");
  assert.ok(copy.clearAll.trim(), locale + " needs clear copy");
  assert.ok(copy.clusterJumpLabel.trim(), locale + " needs cluster jump copy");
  assert.ok(copy.sectionJumpLabel.trim(), locale + " needs section jump copy");
}

assert.equal(
  interpolateTemplateBrowserCopy(templateBrowserCopy.en.resultCount, { n: 12 }),
  "12 templates",
);
assert.equal(
  interpolateTemplateBrowserCopy(templateBrowserCopy["zh-Hant"].resultCount, { n: 12 }),
  "12 個模板",
);

const filtered = templatesForFilters("all", "all");
assert.equal(filterTemplatesByQuery(filtered, "   ", "en").length, filtered.length);
assert.deepEqual(
  filterTemplatesByQuery(filtered, "", "en").map((item) => item.id),
  filtered.map((item) => item.id),
  "empty search must keep ranking order",
);

const engineerId = "sQDD87Gp6VLT0m99tFpzu";
const engineer = templates.find((item) => item.id === engineerId);
assert.ok(engineer, "expected known engineer template");
const zhFields = localizedTemplateFields(engineer, "zh-Hant");
assert.match(zhFields.title, /產品工程師/);
assert.ok(
  filterTemplatesByQuery(filtered, "產品工程師", "zh-Hant").some((item) => item.id === engineerId),
  "localized title should match",
);
assert.ok(
  filterTemplatesByQuery(filtered, "product engineer", "zh-Hant").some((item) => item.id === engineerId),
  "English fallback should match while locale is zh-Hant",
);
assert.ok(
  filterTemplatesByQuery(filtered, engineer.authorName, "ja").some((item) => item.id === engineerId),
  "author name should match across locales",
);

const missing = filterTemplatesByQuery(filtered, "no-such-template-query-8d6f4f", "en");
assert.deepEqual(missing, []);

const rankedIds = filterTemplatesByQuery(filtered, "bot", "en").map((item) => item.id);
const originalOrder = filtered.map((item) => item.id).filter((id) => rankedIds.includes(id));
assert.deepEqual(rankedIds, originalOrder, "search must not reorder ranked results");

const parent = getTemplateIdentity("parent");
assert.ok(parent);
const parentGroups = templateGroupsForIdentity("parent", "zh-Hant");
const parentEnglish = templateGroupsForIdentity("parent", "en");
assert.equal(
  matchFocusToGroup(parent.focus[0], parentGroups, parentEnglish)?.slug,
  "school",
);
assert.equal(
  matchFocusToGroup(parent.focus[2], parentGroups, parentEnglish)?.slug,
  "family-day",
);

const engineerIdentity = getTemplateIdentity("engineer");
assert.ok(engineerIdentity);
const engineerGroups = templateGroupsForIdentity("engineer", "en");
assert.equal(matchFocusToGroup(engineerIdentity.focus[0], engineerGroups)?.slug, "ship");
assert.equal(matchFocusToGroup(engineerIdentity.focus[1], engineerGroups)?.slug, "review");
assert.equal(matchFocusToGroup(engineerIdentity.focus[2], engineerGroups)?.slug, "agents");

const student = getTemplateIdentity("student");
assert.ok(student);
const studentGroups = templateGroupsForIdentity("student", "en");
assert.equal(
  matchFocusToGroup(student.focus[0], studentGroups),
  undefined,
  "generic recommended groups must not become fake destinations",
);

assert.equal(templateIdentitySlugs.length, 29);

const excerpt = "You can actually create an agent in Grok Bot that exclusively uses Grok Build in CLI with the latest Grok models at the highest thinking level.";
assert.deepEqual(templateCardCopy("You can actually create an agent in Grok Bot that exclusively uses...", excerpt), {title: excerpt, description: ""});
assert.deepEqual(templateCardCopy("提醒事項", "提醒事項。"), {title: "提醒事項", description: ""});
assert.deepEqual(templateCardCopy("Researchy（研究助手）", "幫你使用 Grok Build CLI 做研究。"), {title: "Researchy（研究助手）", description: "幫你使用 Grok Build CLI 做研究。"});
for (const locale of ["zh-Hant", "zh-Hans"] as const) {
  for (const template of templates) {
    assert.match(localizedTemplateFields(template, locale).oneLiner, /[\u3400-\u9fff]/u, `${locale} needs Chinese purpose copy for ${template.id}`);
  }
}
console.log("Validated template search, unique card copy, Chinese coverage, and identity jumps.");
