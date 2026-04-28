import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Zap } from 'lucide-react'

import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'

const quick = [
  { label: '₹10 Talktime', amount: 10 },
  { label: '₹19 Data Pack', amount: 19 },
  { label: '₹49 Emergency Recharge', amount: 49 },
]

export default function EmergencyRecharge() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [form, setForm] = useState({ network: 'Jio', amount: '', reason: '' })
  
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id) return
      try {
        const res = await api.get(`/emergency-recharge/${user._id}`)
        if (res.data.success) {
          setList(res.data.data)
        }
      } catch (err) {
        toast.error('Failed to load emergency history')
      } finally {
        setFetching(false)
      }
    }
    fetchHistory()
  }, [user])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error('Please login to request emergency recharge.')
      return
    }

    const amount = Number(form.amount)
    if (!amount || !form.reason) {
      toast.error('Fill all required fields.')
      return
    }

    setLoading(true)
    try {
      const res = await api.post('/emergency-recharge', {
        network: form.network,
        amount,
        reason: form.reason
      })

      if (res.data.success) {
        setList((l) => [res.data.data, ...l])
        toast.success('Your emergency recharge request has been sent.')
        setForm({ network: 'Jio', amount: '', reason: '' })
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Emergency request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600">
          <Zap className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-4xl font-bold">Emergency recharge</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Small top-ups when you have zero balance.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Card className="border-2 border-red-200/80 bg-red-50/30 p-8 dark:border-red-900/40 dark:bg-red-950/20">
          <CardContent className="p-0">
            <h2 className="text-xl font-semibold">Request form</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {quick.map((q) => (
                <Button key={q.label} type="button" variant="outline" size="sm" className="rounded-full border-red-200" onClick={() => setForm({ ...form, amount: String(q.amount) })}>
                  {q.label}
                </Button>
              ))}
            </div>
            <form className="mt-8 space-y-4" onSubmit={submit}>
              <div className="space-y-2">
                <Label htmlFor="e-net">Network company</Label>
                <select id="e-net" className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={form.network} onChange={(e) => setForm({ ...form, network: e.target.value })}>
                  <option>Jio</option>
                  <option>Airtel</option>
                  <option>Vi</option>
                  <option>BSNL</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-amt">Emergency amount (₹)</Label>
                <Input id="e-amt" type="number" min={1} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-reason">Reason</Label>
                <Textarea id="e-reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send emergency request'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-semibold">Emergency requests history</h2>
           <div className="mt-6 space-y-4">
             {fetching ? (
               <p className="animate-pulse">Loading history...</p>
             ) : list.length > 0 ? (
               list.map((r, i) => (
                 <div key={r._id || i} className="rounded-xl border p-4 shadow-sm bg-card">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">₹{r.amount} ({r.network})</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{r.status}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.reason}</p>
                 </div>
               ))
             ) : (
               <p className="text-muted-foreground">No recent requests.</p>
             )}
           </div>
        </div>
      </div>
    </div>
  )
}
