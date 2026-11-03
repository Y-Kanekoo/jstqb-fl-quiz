import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { glossaryTerms, GLOSSARY_CHAPTERS } from "../src/data/glossary.ts";

const require = createRequire(import.meta.url);
const questions = require("../src/data/questions/jstqb-fl.json");
const chapters = new Set(GLOSSARY_CHAPTERS);
const isText = (value) => typeof value === "string" && value.trim().length > 0;

test("問題IDと解答に必要なデータが有効", () => {
  assert.equal(questions.length, 400);
  const ids = new Set();
  for (const question of questions) {
    assert.ok(isText(question.id));
    assert.ok(!ids.has(question.id), `重複した問題ID: ${question.id}`);
    ids.add(question.id);
    assert.ok(chapters.has(question.category), `${question.id}: 未知の章`);
    assert.ok(isText(question.question), `${question.id}: 問題文が空`);
    assert.ok(Array.isArray(question.choices), `${question.id}: 選択肢が配列ではない`);
    assert.equal(question.choices.length, 4, `${question.id}: 選択肢数`);
    assert.ok(question.choices.every(isText), `${question.id}: 空の選択肢`);
    assert.equal(new Set(question.choices).size, 4, `${question.id}: 重複した選択肢`);
    assert.ok(Number.isInteger(question.answerIndex), `${question.id}: 正答が整数ではない`);
    assert.ok(
      question.answerIndex >= 0 && question.answerIndex < 4,
      `${question.id}: 正答が範囲外`
    );
    assert.ok(isText(question.explanation), `${question.id}: 解説が空`);
  }
});

test("用語とREADMEの件数が実データと一致", () => {
  const terms = new Set();
  for (const entry of glossaryTerms) {
    assert.ok(isText(entry.term));
    assert.ok(!terms.has(entry.term), `重複した用語: ${entry.term}`);
    terms.add(entry.term);
    assert.ok(isText(entry.termEn), `${entry.term}: 英語名が空`);
    assert.ok(isText(entry.definition), `${entry.term}: 定義が空`);
    assert.ok(chapters.has(entry.chapter), `${entry.term}: 未知の章`);
  }
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  assert.ok(readme.includes(`**問題数**: ${questions.length}問`));
  assert.ok(readme.includes(`**用語集**: ${glossaryTerms.length}語収録`));
});
