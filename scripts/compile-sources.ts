import { parseGameFromSource } from "@/lib/parsers";
import { getSourceGames } from "@/lib/sources";
import { Source, SourceType } from "@/types/source";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
const INPUT_DIR = path.join(process.cwd(), "sources");
const OUTPUT_DIR = path.join(process.cwd(), "compiled-sources");
const OUTPUT_CACHES_DIR = path.join(OUTPUT_DIR, "caches");
const CATALOG_PATH = path.join(INPUT_DIR, "catalog-sources.json");
const DOWNLOAD_PATH = path.join(INPUT_DIR, "download-sources.json");
export async function fetchWithRetry(url: string, retries = 3, timeout = 10000) {
  let lastError

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
        signal: AbortSignal.timeout(timeout),
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept": "application/json,text/plain,*/*",
          "Accept-Encoding": "gzip, deflate",
          "Connection": "close",
        },
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      return res
    } catch (err: any) {
      lastError = err

      if (
        err.code === "ECONNRESET" ||
        err.code === "ETIMEDOUT" ||
        err.name === "AbortError"
      ) {
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)))
        continue
      }

      throw err
    }
  }

  throw lastError
}


async function readJson(filePath: string): Promise<Source[]> {
  const content = await readFile(filePath, "utf-8");
  const type: SourceType = filePath.includes("catalog") ? SourceType.Catalog : SourceType.Download
  return JSON.parse(content).map((source: any) => ({ ...source, type })) as Source[];
}


const parseSourceRawData = (type: SourceType, url: string, sourceRawData: any): Source => {
  const platforms = type === SourceType.Catalog ? [sourceRawData.console.slug] : sourceRawData.downloads.map((d: any) => d.console);
  const uniquePlatforms = Array.from(new Set(platforms)) as string[];
  switch (type) {
    case SourceType.Catalog:
      return {
        type,
        url,
        title: sourceRawData.console.title,
        description: sourceRawData.console.description,
        image: sourceRawData.console.logoUrl,
        gamesCount: sourceRawData.games.length,
        platforms: uniquePlatforms
      };
    case SourceType.Download:
      return {
        type,
        url,
        title: sourceRawData.title,
        description: sourceRawData.description,
        gamesCount: sourceRawData.downloads.length,
        platforms: uniquePlatforms
      };
  }
  return { ...sourceRawData };
};

async function fetchSourceData(source: Source): Promise<Source> {
  try {
    const res = await fetchWithRetry(source.url,4);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const gamesCache = btoa(source.url) + '.json'
    const rawGames = data.downloads || data.games || [];
    const games = rawGames.map((rawGame: any) => parseGameFromSource(source.type, rawGame));
    fs.mkdirSync(OUTPUT_CACHES_DIR, { recursive: true });
    await writeFile(path.join(OUTPUT_CACHES_DIR, gamesCache), JSON.stringify(games), 'utf-8')
    return {
      ...parseSourceRawData(source.type, source.url, data),
      ...source,
      isCached: true
    };


  } catch (error) {
    console.error(`Error fetching ${source.title}:`, error);

    return source;
  }
}

/**
 * Procesa múltiples sources en paralelo (Promise.all)
 */
async function processSources(sources: Source[]): Promise<Source[]> {
  return Promise.all(sources.map(fetchSourceData));
}

async function main() {
  console.log("Reading source files...");

  const [catalogSources, downloadSources] = await Promise.all([
    readJson(CATALOG_PATH),
    readJson(DOWNLOAD_PATH),
  ]);

  const allSources = [...catalogSources, ...downloadSources];

  console.log(`Processing ${allSources.length} sources...`);

  const enrichedSources = await processSources(allSources);

  console.log("Writing compiled file...");
  ["catalog-sources.json", "download-sources.json"].forEach((fileName) => {
    const filteredSources = enrichedSources.filter(source => source.type === (fileName.includes("catalog") ? SourceType.Catalog : SourceType.Download));
    writeFile(
      path.join(OUTPUT_DIR, fileName),
      JSON.stringify(filteredSources, null, 2),
      "utf-8"
    );
  })
  console.log(`Done. Output: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});