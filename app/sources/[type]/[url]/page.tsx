import path from 'path'
import fs from "fs";
import { SourceType } from '@/types/source';
import { SourceDetails } from '@/components/page-contents/source-details';
import { getSourceGames, getSourcesByType } from '@/lib/sources';
import { SourceGame } from '@/types/source-game';

export const dynamic = 'force-static'

interface Params { type: SourceType, url: string }

export async function generateStaticParams() {
    let params: Params[] = []
   Object.values(SourceType).map(type => {
        const sources = getSourcesByType(type);
        sources.map(source => {
            params.push({ type, url: btoa(source.url) })
        })
   })
  return params;
}

export default async function SourceDetailsPage({ params }: { params:Params  }) {
    const type = (await params).type as SourceType
    const url = (await params).url as string
    if (Object.values(SourceType).indexOf(type) === -1) {
        return <div>Invalid source type</div>
    }
    if(!url){
        return <div>Invalid source URL</div>
    }
    const sources = getSourcesByType(type);
    const parsedUrl = atob(decodeURIComponent(url));

    const foundSource = sources.find(source => source.url === parsedUrl)
    let games:SourceGame[] = []
    if(foundSource){
        games = getSourceGames(foundSource);
    }
    return (
        <SourceDetails games={games} source={foundSource} />
    )

}
