"use client";

import { ArrowLeft } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "../ui/button";
import { GameCard } from "../game-card";
import { GamePagination } from "../game-pagination";
import { SourceSearch } from "../source-search";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/lib/utils";
import { Source } from "@/types/source";
import { SourceGame } from "@/types/source-game";
import { parseGameFromSource } from "@/lib/parsers";
const ITEMS_PER_PAGE = 12;

interface SourceListProps {
    source?: Source;
    games: SourceGame[];
}
export function SourceDetails({ source, games }: SourceListProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [fetchedGames, setFetchedGames] = useState<SourceGame[]>(games);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const filteredGames = useMemo(() => {
        if (!fetchedGames) return [];

        const gamesList = fetchedGames || [];

        if (!searchQuery.trim()) return gamesList;

        const query = searchQuery.toLowerCase();
        return gamesList.filter((game: SourceGame) => game.title.toLowerCase().includes(query) || game.console.toLowerCase().includes(query));
    }, [fetchedGames, searchQuery]);

    const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
    const paginatedGames = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredGames.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredGames, currentPage]);

    useEffect(() => {
        if (games.length == 0) {
            handleFetchSourceData();
        }
    }, []);

    const handleFetchSourceData = async () => {
        if (!source) return;
        setIsLoading(true);
        try {
            const res = await fetch(source?.url || "", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`Failed to fetch source data: ${res.statusText}`);
            }
            const data = await res.json();
            const gamesData = data.downloads || data.games || [];
            setFetchedGames(gamesData.map((game: any) => parseGameFromSource(source.type, game)));
        } catch (error) {
            console.error("Error fetching source data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <div className="xl:container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Loading source data...</h1>
                </div>
            </div>
        );
    }

    if (!source) {
        return (
            <div className="xl:container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Source not found</h1>
                    <Button onClick={() => router.back()} variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Button onClick={() => router.back()} variant="ghost" size="sm" className="mb-4 gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">{source.title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl text-pretty mb-6">{source.description}</p>

                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-muted-foreground">
                        {formatNumber(filteredGames.length)} {filteredGames.length === 1 ? "game" : "games"} available
                    </p>
                </div>

                <SourceSearch
                    value={searchQuery}
                    onChange={(value) => {
                        setSearchQuery(value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search games..."
                />
            </div>

            {paginatedGames.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {paginatedGames.map((game: SourceGame, index: number) => (
                            <GameCard key={`${game.title}-${index}`} portraitUrl={game.portraitUrl} title={game.title} description={game.description ?? game.fileSize} console={game.console} />
                        ))}
                    </div>

                    {totalPages > 1 && <GamePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
                </>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">{searchQuery ? "No games found matching your search." : "No games available."}</p>
                </div>
            )}
        </div>
    );
}
