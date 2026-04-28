import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { AlertSeverity } from '@/data/notifications'

export interface AlertCardProps {
  title: string
  description: string
  severity: AlertSeverity
  className?: string
}

const styles: Record<AlertSeverity, string> = {
  urgent: 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/40',
  warning:
    'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/40',
  safe: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/40',
}

const bar: Record<AlertSeverity, string> = {
  urgent: 'bg-red-500',
  warning: 'bg-amber-500',
  safe: 'bg-emerald-500',
}

export function AlertCard({ title, description, severity, className }: AlertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'relative overflow-hidden rounded-2xl border p-5 shadow-card',
        styles[severity],
        className
      )}
    >
      <div
        className={cn('absolute left-0 top-0 h-full w-1 rounded-l-2xl', bar[severity])}
      />
      <h3 className="pl-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 pl-2 text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}
