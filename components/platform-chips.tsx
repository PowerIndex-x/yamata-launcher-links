'use client'

import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

interface PlatformChipsProps {
    platforms: string[]
    maxVisible?: number
}

export function PlatformChips({ platforms, maxVisible = 6 }: PlatformChipsProps) {
    const [showTooltip, setShowTooltip] = useState(false)

    if (!platforms || platforms.length === 0) return null

    const visiblePlatforms = platforms.slice(0, maxVisible)
    const hiddenPlatforms = platforms.slice(maxVisible)
    const hasMore = hiddenPlatforms.length > 0

    return (
        <div className="flex flex-wrap gap-1.5 mt-3">
            {visiblePlatforms.map((platform) => (
                <Badge
                    key={platform}
                    variant="secondary"
                    className="text-xs bg-muted text-muted-foreground hover:bg-muted/80"
                >
                    {platform}
                </Badge>
            ))}
            {hasMore && (
                <div
                    className="relative inline-block"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <Badge
                        variant="secondary"
                        className="text-xs bg-primary/20 text-primary hover:bg-primary/30 cursor-help"
                    >
                        +{hiddenPlatforms.length} more
                    </Badge>
                    {showTooltip && (
                        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground rounded-md shadow-lg border border-border min-w-max">
                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                                {hiddenPlatforms.map((platform) => (
                                    <Badge
                                        key={platform}
                                        variant="secondary"
                                        className="text-xs bg-muted text-muted-foreground"
                                    >
                                        {platform}
                                    </Badge>
                                ))}
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-border">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-4 border-transparent border-t-popover" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
