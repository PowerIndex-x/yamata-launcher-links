import path from "path"
import fs from "fs"
import { Source, SourceType } from "@/types/source"
import { SourceList } from "@/components/page-contents/source-list"
import { getSourcesByType } from "@/lib/sources"
interface Params { type: SourceType}

export async function generateStaticParams() {
    let params: Params[] = []
   Object.values(SourceType).map(type => {
        params.push({ type })
   })
  return params;
}

export default async function SourceListPage({ params }: { params: Params }) {
  const type = (await params).type as SourceType
  if (Object.values(SourceType).indexOf(type) === -1) {
    return <div>Invalid source type</div>
  }
  const sources = getSourcesByType(type);


  const title = type === SourceType.Download ? "Download Sources" : "Catalog Sources"
  const description = type === SourceType.Download ?
    "A collection of sources that provide downloadable game files, such as torrents or direct downloads."
    : "A collection of sources that provide game catalog data, including metadata and cover images."


  return <SourceList sources={sources}
    title={title}
    description={description}
    isThirdParty={false}
    searchPlaceholder={type === SourceType.Download ? "Search download sources..." : "Search catalog sources..."}
  ></SourceList>
}
