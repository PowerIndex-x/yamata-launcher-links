import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameCardProps {
  title: string
  description?: string
  portraitUrl?: string
  console: string
}

export function GameCard({ title, description, portraitUrl,  console: consoleName }: GameCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 bg-card">
      <CardHeader>
        <div className="flex items-start gap-4">
             {portraitUrl && (
            <img src={portraitUrl} alt={`${title} portrait`} className="w-16 h-16 object-cover rounded-md self-center" />
          )}
          <div className='flex flex-col items-start justify-between gap-2'>
          <CardTitle className="text-foreground group-hover:text-primary transition-colors text-lg">
            {title}
          </CardTitle>
          <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground shrink-0">
            {consoleName}
          </Badge>
          {description && (
          <CardDescription className="text-muted-foreground text-sm">
            {description}
          </CardDescription>
        )}
          </div>
        </div>
        
      </CardHeader>
    </Card>
  )
}
