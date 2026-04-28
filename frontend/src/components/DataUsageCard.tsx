import { motion } from 'framer-motion'
import { Database, TrendingUp } from 'lucide-react'
import { smartDataWallet } from '@/data/monthlyUsage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Bar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value.toFixed(2)} GB</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export function DataUsageCard() {
  const w = smartDataWallet
  const max = Math.max(w.todayTotalGB + w.carriedForwardGB, 0.1)

  return (
    <Card className="overflow-hidden border-border/80 shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Database className="h-6 w-6 text-primary" />
          Smart Data Wallet
        </CardTitle>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
          Carry forward ON
        </span>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <p className="text-sm text-muted-foreground">
          Unused daily data rolls into tomorrow automatically (demo visualization).
        </p>
        <Bar label="Today's total" value={w.todayTotalGB} max={max} color="bg-primary" />
        <Bar label="Used today" value={w.usedGB} max={max} color="bg-accent" />
        <Bar label="Remaining today" value={w.remainingGB} max={max} color="bg-emerald-500" />
        <Bar
          label="Carried from yesterday"
          value={w.carriedForwardGB}
          max={max}
          color="bg-blue-400"
        />
        <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <TrendingUp className="h-8 w-8 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total available tomorrow
            </p>
            <p className="text-2xl font-bold text-primary">
              {w.tomorrowAvailableGB.toFixed(2)} GB
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
