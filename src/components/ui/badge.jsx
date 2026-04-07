import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border text-foreground',
  destructive: 'bg-destructive text-white',
}

export function Badge({ className, variant = 'default', ...props }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors', variants[variant], className)}
      style={variant === 'default' ? { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' } : {}}
      {...props} />
  )
}
