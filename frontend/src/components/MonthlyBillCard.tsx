import { motion } from 'framer-motion'
import { Calendar, IndianRupee, Wifi } from 'lucide-react'
import { payLaterDetails, monthlyUsageSummary } from '@/data/monthlyUsage'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function MonthlyBillCard() {
  const p = payLaterDetails
  const m = monthlyUsageSummary

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-2 border-accent/30 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wifi className="h-6 w-6 text-accent" />
            Pay Later for Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-muted-foreground">Extra data (month)</p>
              <p className="text-2xl font-bold text-foreground">{p.extraDataUsedGB} GB</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4">
              <p className="text-muted-foreground">Cost / GB</p>
              <p className="text-2xl font-bold text-primary">
                ₹{p.costPerGB}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 p-5">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Total bill</span>
            </div>
            <span className="text-3xl font-bold text-primary">₹{p.totalBill}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Due date: <strong className="text-foreground">{p.dueDate}</strong>
          </div>
          <Button className="w-full rounded-xl" size="lg" type="button">
            Pay Monthly Bill
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly usage summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[
            { label: 'Total data used', value: `${m.totalDataUsedGB} GB` },
            { label: 'Unused data carried forward', value: `${m.totalUnusedCarriedGB} GB` },
            { label: 'Extra data consumed', value: `${m.totalExtraConsumedGB} GB` },
            {
              label: 'Estimated payment',
              value: `₹${m.estimatedMonthlyPayment}`,
              highlight: true,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0"
            >
              <span className="text-muted-foreground">{row.label}</span>
              <motion.span
                className={`font-semibold ${row.highlight ? 'text-lg text-primary' : ''}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {row.value}
              </motion.span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
