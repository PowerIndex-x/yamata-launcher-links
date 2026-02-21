import { Source, SourceType } from "@/types/source";
import path from "path";
import fs from "fs";
import { SourceGame } from "@/types/source-game";

export function getSourcesByType(type: SourceType): Source[] {
    const sourceFile = type === SourceType.Download ? 'download-sources.json' : 'catalog-sources.json'
    const compiledFilePath = path.join(process.cwd(), 'compiled-sources', sourceFile)
    let sourceFileContent = null;
    const isSourceCached = fs.existsSync(compiledFilePath)
    if (isSourceCached) {
        sourceFileContent = fs.readFileSync(compiledFilePath, 'utf-8')
    } else {
        sourceFileContent = fs.readFileSync(path.join(process.cwd(), 'sources', sourceFile), 'utf-8')
    }

    const sources = JSON.parse(sourceFileContent).map((source: Source) => {
        return { ...source, isCached: isSourceCached, type } as Source
    });
    return sources;
}

export function getSourceGames(source: Source): SourceGame[] {
      const sourceCacheFilename =  btoa(source.url) + '.json'
    const compiledFilePath = path.join(process.cwd(), 'compiled-sources/caches', sourceCacheFilename)
    let sourceFileContent = null;
    const isSourceCached = fs.existsSync(compiledFilePath)
    if (!isSourceCached) {
        return [];
    }
    sourceFileContent = fs.readFileSync(compiledFilePath, 'utf-8')
    const games = JSON.parse(sourceFileContent) as SourceGame[];
    return games;
}