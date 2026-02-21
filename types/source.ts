export enum SourceType {
    Download = "download-source",
    ThirdParty = "third-party",
    Catalog = "catalog-source",
}
export interface Source{
    type: SourceType,
    title: string,
    description: string,
    gamesCount?: number,
    ref?: string,
    image?:string
    platforms?: string[],
    url: string
    isCached?: boolean
}