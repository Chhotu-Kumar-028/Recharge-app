import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { RechargePlan } from '@/data/rechargePlans'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import jioLogo from '@/assets/logos/jio.svg'
import airtelLogo from '@/assets/logos/airtel.svg'
import viLogo from '@/assets/logos/vi.svg'
import bsnlLogo from '@/assets/logos/bsnl.svg'

const logos: Record<string, string> = {
  Jio: jioLogo,
  Airtel: airtelLogo,
  Vi: viLogo,
  BSNL: bsnlLogo,
}

const bestForLabel: Record<string, string> = {
  students: 'Best for students',
  workers: 'Best for workers',
  family: 'Best for family',
}

export interface RechargePlanCardProps {
  plan: RechargePlan
  index?: number
}

export function RechargePlanCard({ plan, index = 0 }: RechargePlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-soft">
        <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
          <img
            src={logos[plan.company]}
            alt=""
            className="h-12 w-12 rounded-xl object-cover ring-2 ring-border transition-transform group-hover:scale-105"
          />
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            {bestForLabel[plan.bestFor]}
          </span>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <p className="text-3xl font-bold text-primary">
            ₹{plan.price}
            <span className="text-sm font-normal text-muted-foreground">
              {' '}
              / {plan.validityDays} days
            </span>
          </p>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">{plan.dataPerDayGB} GB</strong>{' '}
              / day
            </li>
            <li className="flex items-center gap-2">
              Unlimited calls:{' '}
              {plan.unlimitedCalls ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </li>
            <li className="flex items-center gap-2">
              SMS included:{' '}
              {plan.smsIncluded ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <X className="h-4 w-4 text-red-500" />
              )}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className={cn('w-full rounded-xl')} variant="outline">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
