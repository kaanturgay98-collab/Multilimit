import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AdminPageHeaderProps = {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export function AdminPageHeader({ title, description, actions, className }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 mb-6 border-b border-border/60 pb-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="text-xs text-muted-foreground max-w-xl">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

type HeaderPrimaryActionProps = {
  label: string
  onClick?: () => void
}

export function AdminPrimaryAction({ label, onClick }: HeaderPrimaryActionProps) {
  return (
    <Button
      size="sm"
      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-4 text-xs font-medium"
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

