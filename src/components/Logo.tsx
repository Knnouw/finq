
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("font-bold text-2xl text-primary", className)}>
      FinQ
    </div>
  )
}
