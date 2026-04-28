import { motion } from 'framer-motion'
import type { DataTransfer } from '@/data/dataTransferHistory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const statusColor: Record<string, string> = {
  Completed: 'text-emerald-600 dark:text-emerald-400',
  Failed: 'text-red-600 dark:text-red-400',
  Processing: 'text-amber-600 dark:text-amber-400',
}

export interface DataTransferHistoryProps {
  items: DataTransfer[]
}

export function DataTransferHistory({ items }: DataTransferHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer history</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-muted/20 px-4 py-3"
          >
            <div>
              <p className="font-medium text-foreground">{t.recipient}</p>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">{t.amountLabel}</p>
              <p className={cn('text-xs font-medium', statusColor[t.status])}>
                {t.status}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
