import { cn } from '@/lib/utils'

export function Dialog({ open, onOpenChange, children }) {
  return (
    <>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
          <div className="relative z-50 w-full max-w-lg">{null}</div>
        </div>
      )}
    </>
  )
}

export function DialogTrigger({ asChild, children, ...props }) {
  return children
}

export function DialogContent({ className, children, ...props }) {
  return (
    <div className={cn('fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl', className)} {...props}>
      {children}
    </div>
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn('mb-4', className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn('font-heading text-xl font-semibold', className)} {...props} />
}

// Simple modal — wraps everything cleanly
export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {title && <h2 className="font-heading text-xl font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  )
}
