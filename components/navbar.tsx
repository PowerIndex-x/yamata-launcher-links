'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {  BookOpen, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SourceType } from '@/types/source'

const navItems = [
  { href: `/sources/${SourceType.Download}`, label: 'Download Sources' },
  { href: `/sources/${SourceType.Catalog}`, label: 'Catalog Sources' },
  { href: `/sources/${SourceType.ThirdParty}`, label: 'Third Party' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="xl:container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://github.com/Gr3gorywolf/Yamata-launcher/blob/master/assets/images/logo.png?raw=true" alt="Yamata Launcher" width={60} height={60} className="object-contain" />
            <span className="text-xl font-bold text-foreground">Yamata Launcher Sources</span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary  hover:border-primary"
            >
              <a
                href="https://github.com/Gr3gorywolf/Yamata-launcher/wiki/External-sources"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden lg:inline">Guide</span>
              </a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 hover:bg-primary  hover:border-primary"
            >
              <a
                href="https://github.com/PowerIndex-x/yamata-launcher-links?tab=readme-ov-file#how-to-contribute"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Upload className="h-4 w-4" />
                <span className="hidden lg:inline">Submit Source</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-1 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 px-3 py-2 rounded-md text-xs font-medium text-center transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
