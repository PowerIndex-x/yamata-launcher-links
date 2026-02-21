"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Eye, ExternalLink } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface SourceCardProps {
  title: string;
  description: string;
  gamesCount?: number;
  link: string;
  platforms?: string[];
  detailsUrl?: string;
  isThirdParty?: boolean;
  refUrl?: string;
  imageUrl?: string;
}

export function SourceCard({ title, description, link, platforms, detailsUrl, isThirdParty, gamesCount, refUrl, imageUrl }: SourceCardProps) {
  console.log("Rendering SourceCard with link:", isThirdParty, link);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[v0] Failed to copy:", err);
    }
  };

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 bg-card">
      <CardHeader>
        {imageUrl && <img src={imageUrl} alt={title} className="w-full h-30 object-contain mb-4" />}
        <CardTitle className="text-foreground group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
          {refUrl && (
            <div className="mt-2 ">
            <a href={refUrl} target="_blank" className="flex flex-row gap-3 underline" rel="noopener noreferrer">
              Know more <ExternalLink className="h-4 w-4" />
            </a>
            </div>
          )}
          {gamesCount !== undefined && (
            <span className="block mt-2 text-sm text-muted-foreground">
              {formatNumber(gamesCount)} {gamesCount === 1 ? "game" : "games"} available
            </span>
          )}
        </CardDescription>
        {platforms && platforms.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {platforms.slice(0, 6).map((platform) => (
              <Badge key={platform} variant="secondary" className="text-xs bg-muted text-muted-foreground hover:bg-muted/80">
                {platform}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex gap-2 mt-auto">
        {isThirdParty ? (
          <Button onClick={() => window.open(link, "_blank")} variant="default" size="sm" className="flex-1 gap-2">
            <ExternalLink className="h-4 w-4" />
            Visit page
          </Button>
        ) : (
          <Button onClick={handleCopy} variant="default" size="sm" className="flex-1 gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        )}
        {detailsUrl && (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href={detailsUrl}>
              <Eye className="h-4 w-4" />
              View
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
