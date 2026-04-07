import { cn } from '@/lib/utils'

export function Select({ value, onValueChange, children }) {
  return <SelectRoot value={value} onValueChange={onValueChange}>{children}</SelectRoot>
}

function SelectRoot({ value, onValueChange, children }) {
  return <div className="relative">{React.Children.map(children, c => React.cloneElement(c, { value, onValueChange }))}</div>
}

import React from 'react'

export function SelectTrigger({ className, children, value, ...props }) {
  return (
    <button className={cn('flex h-10 w-full items-center justify-between rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2', className)}
      style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))' }} {...props}>
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children, className }) {
  return <div className={cn('absolute z-50 min-w-full rounded-lg border bg-white shadow-lg mt-1', className)} style={{ borderColor: 'hsl(var(--border))' }}>{children}</div>
}

export function SelectItem({ value, children, onValueChange }) {
  return (
    <div className="px-3 py-2 text-sm cursor-pointer hover:bg-accent" style={{ '--tw-bg-opacity': 1 }}
      onClick={() => onValueChange?.(value)}>
      {children}
    </div>
  )
}

// Simplified native select wrapper (more reliable)
export function NativeSelect({ value, onChange, children, className }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={cn('flex h-10 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-background', className)}
      style={{ borderColor: 'hsl(var(--border))' }}>
      {children}
    </select>
  )
}
