import { motion } from 'framer-motion'
import type { FamilyMember } from '@/data/familyMembers'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export interface FamilyMemberCardProps {
  member: FamilyMember
  onSend?: () => void
  index?: number
}

export function FamilyMemberCard({
  member,
  onSend,
  index = 0,
}: FamilyMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="border-border/80 shadow-card transition-all hover:border-primary/30">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.relation}</p>
              <p className="mt-1 font-mono text-sm">{member.mobile}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Balance</p>
              <p className="text-lg font-bold text-primary">
                {member.dataBalanceGB} GB
              </p>
            </div>
          </div>
          <Button
            className="mt-4 w-full rounded-xl"
            variant="secondary"
            type="button"
            onClick={onSend}
          >
            Send Data
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
