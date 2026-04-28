import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { HelpRequest } from '@/data/helpRequests'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export interface HelpRequestCardProps {
  request: HelpRequest
  onSponsor?: () => void
  index?: number
}

export function HelpRequestCard({
  request,
  onSponsor,
  index = 0,
}: HelpRequestCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="overflow-hidden border-border/80 shadow-card transition-all hover:border-primary/30 hover:shadow-soft">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{request.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {request.city}
              </p>
            </div>
            <span className="rounded-lg bg-primary/10 px-2 py-1 text-sm font-bold text-primary">
              ₹{request.amount}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {request.reason}
          </p>
          <Button
            className="mt-4 w-full rounded-xl"
            variant="accent"
            type="button"
            onClick={onSponsor}
          >
            Sponsor Recharge
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
