"use client"
import { useState, useMemo } from "react"
import { SourceCard } from "../source-card"
import { SourceSearch } from "../source-search"
import { Source } from "@/types/source"

interface SourceListProps {
  title: string,
  searchPlaceholder?: string,
  description: string,
  isThirdParty?: boolean,
  sources: Source[]
}

export function SourceList({ title, description, sources, isThirdParty, searchPlaceholder }: SourceListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSources = useMemo(() => {
    if (!searchQuery.trim()) return sources

    const query = searchQuery.toLowerCase()
    return sources.filter(
      (source) =>
        source.title.toLowerCase().includes(query) ||
        source.description.toLowerCase().includes(query)
    )
  }, [searchQuery, sources])




  return (
    <div className="xl:container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-pretty mb-6">
          {description}
        </p>
        {sources.length > 5 && (
          <SourceSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={searchPlaceholder || "Search for sources..."}
          />)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSources.map((source) => (
          <SourceCard
            key={source.title}
            title={source.title}
            isThirdParty={isThirdParty}
            description={`${source.description}`}
            platforms={source.platforms || []}
            gamesCount={source.gamesCount}
            link={source.url}
            refUrl={source.ref}
            imageUrl={source.image}
            detailsUrl={isThirdParty ? undefined : `/sources/${source.type.toLowerCase()}/${btoa(source.url)}`}
          />
        ))}
      </div>

      {filteredSources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No sources found matching your search.</p>
        </div>
      )}
    </div>
  )
}