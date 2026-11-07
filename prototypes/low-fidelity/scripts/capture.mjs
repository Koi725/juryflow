// Saves a full-page PNG of every screen listed on the index page into ../screenshots/.
// Expects the static export to be served at BASE_URL (default http://localhost:4173).
import { mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:4173";
const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "screenshots");
const pad = (n) => String(n).padStart(2, "0");

await mkdir(outDir, { recursive: true });
for (const file of await readdir(outDir)) {
  if (file.endsWith(".png")) await rm(path.join(outDir, file));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
const screens = await page.$$eval("a[data-screen]", (links) =>
  links.map((link) => ({
    number: Number(link.getAttribute("data-number")),
    slug: link.getAttribute("data-screen"),
    href: link.getAttribute("href"),
  })),
);

const saved = [];
const capture = async (name, url) => {
  await page.goto(url, { waitUntil: "networkidle" });
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  saved.push(file);
  console.log(`saved ${path.relative(process.cwd(), file)}`);
};

await capture("00-index", `${baseUrl}/`);
for (const screen of screens) {
  await capture(`${pad(screen.number)}-${screen.slug}`, `${baseUrl}${screen.href}`);
}

await browser.close();
console.log(`${saved.length} screenshots saved to ${outDir}`);
