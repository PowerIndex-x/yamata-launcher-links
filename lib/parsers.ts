import { SourceType } from "@/types/source";
import { SourceGame } from "@/types/source-game";

export function parseGameFromSource(type: SourceType, data: any): SourceGame | null {
    switch (type) {
        case SourceType.Download:
            return {
                title: data.title,
                console: data.console,
                description: data.fileSize ? `File Size: ${data.fileSize}` : undefined,
                fileSize: data.fileSize
            }
        case SourceType.Catalog:
            return {
                title: data.name,
                console: data.console,
                portraitUrl: data.portrait ?? data.logo ?? data.gameplayCovers[0] ?? undefined,
                description: data.releaseDate ? `Release Date: ${data.releaseDate}` : data.rating ? `Rating: ${data.rating}` : undefined,
            }
        default:
            return null;
    }
}