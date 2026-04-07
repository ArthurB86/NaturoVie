import { cn } from '@/lib/utils'

export function Tabs({ value, onValueChange, children, className }) {
  return <div className={cn('space-y-4', className)}>{React.Children.map(children, c => c && React.cloneElement(c, { value, onValueChange }))}</div>
}

import React from 'react'

export function TabsList({ className, children, value, onValueChange }) {
  return (
    <div className={cn('inline-flex rounded-lg p-1 gap-1', className)} style={{ backgroundColor: 'hsl(var(--muted))' }}>
      {React.Children.map(children, c => c && React.cloneElement(c, { currentValue: value, onValueChange }))}
    </div>
  )
}

export function TabsTrigger({ value, currentValue, onValueChange, className, children }) {
  const active = value === currentValue
  return (
    <button onClick={() => onValueChange?.(value)}
      className={cn('px-3 py-1.5 text-sm font-medium rounded-md transition-colors', active ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground', className)}>
      {children}
    </button>
  )
}

export function TabsContent({ value, currentValue, children }) {
  if (value !== currentValue) return null
  return <>{children}</>
}
