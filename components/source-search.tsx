'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SourceSearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SourceSearch({ value, onChange, placeholder = "Search sources..." }: SourceSearchProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 bg-card border-border focus-visible:ring-primary"
      />
    </div>
  )
}
