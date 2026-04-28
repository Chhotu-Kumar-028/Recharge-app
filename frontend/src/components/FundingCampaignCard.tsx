import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import type { FundingCampaign } from '@/data/fundingCampaigns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export interface FundingCampaignCardProps {
  campaign: FundingCampaign
  index?: number
  onContribute?: () => void
}

export function FundingCampaignCard({
  campaign,
  index = 0,
  onContribute,
}: FundingCampaignCardProps) {
  const pct = Math.min(100, (campaign.collected / campaign.goal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full overflow-hidden border-border/80 shadow-card transition-shadow hover:shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl leading-snug">{campaign.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{campaign.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Raised</span>
            <span className="font-bold text-primary">
              ₹{(campaign.collected / 1000).toFixed(0)}k / ₹
              {(campaign.goal / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              whileInView={{ width: `${pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            {campaign.peopleHelped} people helped
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-xl"
            variant="accent"
            type="button"
            onClick={onContribute}
          >
            Contribute
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
