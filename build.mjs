// Bundles the split sources into one self-contained page.
//
// Artifacts are served as a single document with a strict CSP and no sibling
// files, so css/ and js/ have to be inlined. The output is a FRAGMENT on
// purpose: the artifact host supplies <!doctype>, <head> and <body> itself.
//
//   node build.mjs
//
import { readFile, writeFile, mkdir } from "node:fs/promises";

const OUT = "dist/match-me-lucky.html";

const html = await readFile("index.html", "utf8");

const pick = (re, what) => {
  const m = html.match(re);
  if (!m) throw new Error(`build: could not find ${what} in index.html`);
  return m;
};

const title = pick(/<title>.*?<\/title>/s, "<title>")[0];
const fonts = [...html.matchAll(/<link [^>]*fonts\.(?:googleapis|gstatic)\.com[^>]*>/g)].map(m => m[0]);
if (!fonts.length) throw new Error("build: no Google Fonts <link> found");

// body markup, minus the <script src> tags we are about to inline
const body = pick(/<body>\n(.*)\n<\/body>/s, "<body>")[1]
  .replace(/^\s*<script src="[^"]+"><\/script>\s*$/gm, "")
  .trim();

const srcs = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
if (!srcs.length) throw new Error("build: no <script src> tags found");

const css = await readFile("css/styles.css", "utf8");
const js = (
  await Promise.all(srcs.map(async s => `/* ---------- ${s} ---------- */\n${await readFile(s, "utf8")}`))
).join("\n");

const out = [
  title,
  ...fonts,
  "",
  `<style>\n${css.trim()}\n</style>`,
  "",
  body,
  "",
  `<script>\n${js.trim()}\n</script>`,
  ""
].join("\n");

// the artifact host adds these; shipping our own would nest documents
for (const tag of ["<!doctype", "<html", "<head", "<body"]) {
  if (out.toLowerCase().includes(tag)) throw new Error(`build: output still contains ${tag}`);
}

await mkdir("dist", { recursive: true });
await writeFile(OUT, out);
console.log(`built ${OUT}  (${(out.length / 1024).toFixed(1)} KB, ${srcs.length} scripts inlined)`);
