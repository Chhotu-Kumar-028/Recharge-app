import { motion } from 'framer-motion'
import { Medal } from 'lucide-react'
import type { TopDonor } from '@/data/fundingCampaigns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface DonorLeaderboardProps {
  donors: TopDonor[]
}

export function DonorLeaderboard({ donors }: DonorLeaderboardProps) {
  return (
    <Card className="border-border/80 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Medal className="h-6 w-6 text-accent" />
          Top donors this month
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {donors.map((d, i) => (
          <motion.div
            key={d.rank}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                {d.rank}
              </span>
              <div>
                <p className="font-medium">
                  {d.anonymous ? 'Kind donor' : d.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Helped {d.peopleHelped} people
                </p>
              </div>
            </div>
            <span className="font-bold text-accent">₹{(d.amount / 1000).toFixed(1)}k</span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
