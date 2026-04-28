import { motion } from 'framer-motion'
import { CreditCard, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface DonationCardProps {
  amount: number
  selected: boolean
  onSelect: () => void
}

export function DonationCard({ amount, selected, onSelect }: DonationCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="text-left"
    >
      <Card
        className={`cursor-pointer border-2 transition-all ${
          selected
            ? 'border-primary bg-primary/5 shadow-soft'
            : 'border-border hover:border-primary/40'
        }`}
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold text-primary">
            ₹{amount}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          One-time demo gift
        </CardContent>
      </Card>
    </motion.button>
  )
}

export function PaymentCardUI({
  onPay,
  amount,
}: {
  onPay: () => void
  amount: number
}) {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 shadow-soft">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CreditCard className="h-5 w-5 text-primary" />
          Secure payment (demo)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          No real charges — this is a UI preview only.
        </div>
        <div className="flex justify-between text-lg font-semibold">
          <span>Amount</span>
          <span className="text-primary">₹{amount}</span>
        </div>
        <Button className="w-full rounded-xl" size="lg" type="button" onClick={onPay}>
          Complete payment
        </Button>
      </CardContent>
    </Card>
  )
}
