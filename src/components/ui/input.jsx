import { cn } from '@/lib/utils'

export function Input({ className, ...props }) {
  return (
    <input
      className={cn('flex h-10 w-full rounded-lg border px-3 py-2 text-sm bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50', className)}
      style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
      {...props}
    />
  )
}
