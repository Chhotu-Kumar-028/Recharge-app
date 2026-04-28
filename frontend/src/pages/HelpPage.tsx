import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { HelpRequestCard } from '@/components/HelpRequestCard'
import type { HelpRequest } from '@/data/helpRequests'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function HelpPage() {
  const [requests, setRequests] = useState<HelpRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const [form, setForm] = useState({
    amountNeeded: '',
    reason: '',
    occupation: '',
    city: '',
  })

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/help-request')
        setRequests(res.data.data || [])
      } catch (err: any) {
        toast.error('Failed to load help requests')
      } finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to submit a help request.')
      return
    }

    const amount = Number(form.amountNeeded)
    if (!amount || !form.reason) {
      toast.error('Please fill amount and reason.')
      return
    }

    setSubmitting(true)
    try {
      const res = await api.post('/help-request', {
        amountNeeded: amount,
        reason: form.reason,
        occupation: form.occupation,
        city: form.city,
      })

      if (res.data.success) {
        setRequests((r) => [res.data.data, ...r])
        setSuccessOpen(true)
        toast.success('Request submitted successfully.')
        setForm({ amountNeeded: '', reason: '', occupation: '', city: '' })
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to submit request')
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
        <h1 className="text-4xl font-bold">Get recharge help</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Share your need. Community donors use this list to sponsor packs.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={submit}
          className="space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="text-xl font-semibold">Submit a request</h2>
          <div className="space-y-2">
            <Label htmlFor="amount">Recharge amount needed (₹)</Label>
            <Input
              id="amount"
              type="number"
              min={1}
              value={form.amountNeeded}
              onChange={(e) => setForm({ ...form, amountNeeded: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Why you need help</Label>
            <Textarea
              id="reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Input
              id="occupation"
              value={form.occupation}
              onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full rounded-xl" size="lg" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit request'}
          </Button>
        </motion.form>

        <div>
          <h2 className="mb-6 text-xl font-semibold">People who need help</h2>
          <div className="space-y-4">
            {loading ? (
              <p className="text-muted-foreground animate-pulse">Loading requests...</p>
            ) : requests.length > 0 ? (
              requests.map((r, i) => (
                <HelpRequestCard
                  key={r.id || (r as any)._id || i}
                  request={r}
                  index={i}
                  onSponsor={() =>
                    toast.message('Thank you — sponsor flow in development.')
                  }
                />
              ))
            ) : (
              <p className="text-muted-foreground">No recent requests.</p>
            )}
          </div>
        </div>
      </div>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request received</DialogTitle>
            <DialogDescription>
              Your recharge help request has been saved. A donor may
              sponsor your pack.
            </DialogDescription>
          </DialogHeader>
          <Button
            className="rounded-xl"
            onClick={() => setSuccessOpen(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
