import { motion } from 'framer-motion'
import type { EmergencyRequest } from '@/data/emergencyRequests'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const statusStyles: Record<string, string> = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
  Approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200',
  Rejected: 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-200',
}

export interface EmergencyRequestCardProps {
  request: EmergencyRequest
  index?: number
}

export function EmergencyRequestCard({ request, index = 0 }: EmergencyRequestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="border-border/80 shadow-card">
        <CardContent className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{request.name}</h3>
              <p className="text-sm text-muted-foreground">
                {request.mobile} · {request.network}
              </p>
            </div>
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-semibold',
                statusStyles[request.status]
              )}
            >
              {request.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{request.reason}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span>
              Amount: <strong className="text-primary">₹{request.amount}</strong>
            </span>
            <span className="text-muted-foreground">{request.submittedAt}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
