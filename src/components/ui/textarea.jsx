import { cn } from '@/lib/utils'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn('flex min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 resize-vertical', className)}
      style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }}
      {...props}
    />
  )
}
