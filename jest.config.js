/** @format */

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterSetup: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transformIgnorePatterns: [
    "/node_modules/(?!(remark|remark-gfm|remark-html|unified|bail|devlop|is-plain-obj|trough|vfile|unist-util-stringify-position|mdast-util-from-markdown|mdast-util-to-string|micromark|decode-named-character-reference|character-entities|mdast-util-to-hast|mdast-util-phrasing|unist-util-position|unist-util-visit|unist-util-is|hast-util-to-html|hast-util-whitespace|html-void-elements|zwitch|property-information|comma-separated-tokens|space-separated-tokens|stringify-entities|character-entities-html4|ccount|mdast-util-gfm|mdast-util-gfm-table|mdast-util-gfm-strikethrough|mdast-util-gfm-task-list-item|mdast-util-gfm-autolink-literal|mdast-util-gfm-footnote|mdast-util-find-and-replace|escape-string-regexp|micromark-util-combine-extensions|micromark-extension-gfm|micromark-extension-gfm-table|micromark-extension-gfm-strikethrough|micromark-extension-gfm-task-list-item|micromark-extension-gfm-autolink-literal|micromark-extension-gfm-footnote|micromark-util-character|micromark-util-sanitize-uri|micromark-util-encode|micromark-util-symbol|micromark-util-types|micromark-util-chunked|micromark-util-resolve-all|micromark-util-classify-character|micromark-util-normalize-identifier|micromark-util-decode-numeric-character-reference|micromark-util-decode-string|micromark-factory-space|micromark-core-commonmark|micromark-factory-destination|micromark-factory-label|micromark-factory-title|micromark-factory-whitespace|micromark-util-subtokenize|micromark-util-html-tag-name|hast-util-from-html|hast-util-raw|hastscript|web-namespaces|hast-util-from-parse5|vfile-location|parse5|unist-util-visit-parents|trim-lines|mdast-util-newline-to-break|longest-streak)/)",
  ],
};

module.exports = createJestConfig(config);
