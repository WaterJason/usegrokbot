import assert from "node:assert/strict";
import { templates } from "../data/templates";
import { messages } from "../lib/i18n/messages";
import { localizedTemplateFields, filterTemplatesByQuery } from "../lib/i18n/template-browser";
import { isImportedStoryExplanation, repeatsReadingCopy } from "../lib/reading-copy";

assert.equal(repeatsReadingCopy("整理收件匣。", ["整理收件匣"]), true);
assert.equal(repeatsReadingCopy(" Draft a reply. ", ["draft a reply"]), true);
assert.equal(repeatsReadingCopy("Draft a reply, then wait for approval.", ["Draft a reply"]), false);
assert.equal(repeatsReadingCopy("起草回覆，等你批准才寄出。", ["起草回覆"]), false);
assert.equal(isImportedStoryExplanation("GrokCases ingested this public X post. The source is linked below."), true);
assert.equal(isImportedStoryExplanation("Reads call notes and drafts a follow-up for approval."), false);

const researchy = templates.find(item => item.id === "rQt4W2zO2Gx9lfcBjd1lj");
assert.ok(researchy);
assert.equal(localizedTemplateFields(researchy, "en").title, "Researchy");
for (const locale of ["en", "zh-Hant", "zh-Hans", "ja"] as const) {
  assert.ok(filterTemplatesByQuery(templates, "Researchy", locale).some(item => item.id === researchy.id));
  for (const template of templates) {
    const copy = localizedTemplateFields(template, locale);
    assert.ok(copy.title.trim(), `${locale}: ${template.id} needs a title`);
    assert.ok(copy.oneLiner.trim(), `${locale}: ${template.id} needs a purpose`);
    if (locale !== "en") {
      assert.match(copy.oneLiner, /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u,
        `${locale}: ${template.id} has an untranslated purpose`);
    }
  }
}

function strings(value: unknown, path = "", output: Record<string, string> = {}) {
  if (typeof value === "string") output[path] = value;
  else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) strings(child, `${path}.${key}`, output);
  }
  return output;
}
const english = strings(messages.en);
const placeholders = (value: string) => [...value.matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
for (const locale of ["zh-Hant", "zh-Hans", "ja"] as const) {
  const translated = strings(messages[locale]);
  assert.deepEqual(Object.keys(translated).sort(), Object.keys(english).sort(), `${locale}: UI keys must match`);
  for (const [key, text] of Object.entries(english)) {
    assert.deepEqual(placeholders(translated[key]), placeholders(text), `${locale}: ${key} placeholders differ`);
  }
}

console.log(`Validated duplicate suppression, approval conditions, ${templates.length} templates in four languages, and UI placeholders.`);
