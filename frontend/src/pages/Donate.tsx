import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Heart } from 'lucide-react'
import { DonationCard, PaymentCardUI } from '@/components/DonationCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'

const presets = [5, 10, 20]


export default function Donate() {
  const [selected, setSelected] = useState(100)
  const [custom, setCustom] = useState('')
  const [payOpen, setPayOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { isAuthenticated } = useAuth()

  const amount =
    custom.trim() !== '' ? Number(custom) || selected : selected

  function openPay() {
    if (!isAuthenticated) {
      toast.error('Please login to make a donation.')
      return
    }
    setPayOpen(true)
  }

  async function completePay() {
    setSubmitting(true)
    try {
      const res = await api.post('/donations', {
        campaignName: 'General Support',
        amount,
      })
      if (res.data.success) {
        toast.success(`Successfully donated ₹${amount}!`)
        setPayOpen(false)
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Donation failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold">Sponsor someone’s recharge</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Your contributions help those in critical need of connectivity.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Card className="border-border/80 p-8 shadow-soft">
          <h3 className="font-semibold">Choose amount</h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {presets.map((p) => (
              <DonationCard
                key={p}
                amount={p}
                selected={selected === p && custom.trim() === ''}
                onSelect={() => {
                  setSelected(p)
                  setCustom('')
                }}
              />
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <Label htmlFor="custom">Custom amount (₹)</Label>
            <Input
              id="custom"
              type="number"
              min={1}
              placeholder="e.g. 500"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="mt-8 w-full rounded-xl gap-2"
            size="lg"
            variant="accent"
            onClick={openPay}
          >
            <Heart className="h-4 w-4" />
            Continue to pay ₹{amount}
          </Button>
        </Card>

        <PaymentCardUI amount={amount} onPay={completePay} />
      </div>

      <Dialog open={payOpen} onOpenChange={setPayOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Confirm contribution of ₹{amount} for General Support.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setPayOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 rounded-xl"
              variant="accent"
              onClick={completePay}
              disabled={submitting}
            >
              {submitting ? 'Processing...' : `Pay ₹${amount}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
