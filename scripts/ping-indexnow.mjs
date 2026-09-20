#!/usr/bin/env node
/**
 * Ping IndexNow (Bing, Yandex, Naver, Seznam) with published site URLs.
 * Specification: https://www.indexnow.org/documentation
 *
 * Usage:
 *   node scripts/ping-indexnow.mjs
 *   node scripts/ping-indexnow.mjs --dry-run
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sitemapPath = path.join(rootDir, "dist", "sitemap-0.xml");

const HOST = "karim-bhalwani.github.io";
const KEY = "7c9a8e2b1f4d45a980e61d8f1e5c3b2a";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const isDryRun = process.argv.includes("--dry-run");
const daysArg = process.argv.find((a) => a.startsWith("--since-days="));
const sinceDays = daysArg ? parseInt(daysArg.split("=")[1], 10) : null;

async function main() {
  console.log(`[IndexNow] Starting automated submission for ${HOST}...`);

  let urlList = [];

  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    
    if (sinceDays && !isNaN(sinceDays)) {
      const cutoffTime = Date.now() - sinceDays * 24 * 60 * 60 * 1000;
      const urlBlocks = sitemapContent.match(/<url>[\s\S]*?<\/url>/g) || [];
      urlBlocks.forEach((block) => {
        const locMatch = block.match(/<loc>(https:\/\/[^<]+)<\/loc>/);
        const modMatch = block.match(/<lastmod>([^<]+)<\/lastmod>/);
        if (locMatch) {
          if (modMatch) {
            const modTime = new Date(modMatch[1]).getTime();
            if (modTime >= cutoffTime) {
              urlList.push(locMatch[1]);
            }
          } else {
            urlList.push(locMatch[1]);
          }
        }
      });
      console.log(`[IndexNow] Filtered ${urlList.length} URLs modified in the last ${sinceDays} days.`);
    } else {
      const locMatches = sitemapContent.match(/<loc>(https:\/\/[^<]+)<\/loc>/g);
      if (locMatches) {
        urlList = locMatches.map((m) => m.replace(/<\/?loc>/g, ""));
      }
    }
  }

  if (urlList.length === 0) {
    console.warn(`[IndexNow] Warning: sitemap not found or empty at ${sitemapPath}. Using base URLs fallback.`);
    urlList = [
      `https://${HOST}/`,
      `https://${HOST}/writing/`,
      `https://${HOST}/research/`,
      `https://${HOST}/topics/`,
      `https://${HOST}/about/`,
    ];
  }

  console.log(`[IndexNow] Extracted ${urlList.length} URLs to submit.`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
  };

  if (isDryRun) {
    console.log("[IndexNow] DRY RUN MODE: Payload to submit:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("[IndexNow] Dry run complete. No network request sent.");
    return;
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "KarimBhalwani-SiteDeploy/1.0",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`[IndexNow] SUCCESS! URLs successfully submitted to IndexNow (Status: ${response.status}).`);
    } else {
      const respText = await response.text();
      console.warn(`[IndexNow] Server responded with status ${response.status}: ${respText}`);
    }
  } catch (err) {
    // Non-fatal warning so builds do not fail if external API is unreachable or offline
    console.warn(`[IndexNow] Network notice: Unable to contact IndexNow endpoint (${err.message}). Submission skipped.`);
  }
}

main();
