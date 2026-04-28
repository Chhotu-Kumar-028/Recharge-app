import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Share2 } from 'lucide-react'

import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const quickTransfer = [
  { label: 'Send 500 MB', mb: 500 },
  { label: 'Send 1 GB', mb: 1024 },
]

export default function FamilySharing() {
  const balanceGB = 3.2
  const [form, setForm] = useState({ mobile: '', relation: 'Friend', amountMB: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [successOpen, setSuccessOpen] = useState(false)
  const [history, setHistory] = useState<any[]>([])
  
  const { user } = useAuth()

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?._id) return
      try {
        const res = await api.get(`/family-sharing/${user._id}`)
        if (res.data.success) {
          setHistory(res.data.data)
        }
      } catch (err) {
        toast.error('Failed to retrieve sharing history')
      } finally {
        setFetching(false)
      }
    }
    fetchHistory()
  }, [user])

  async function submitTransfer(e: React.FormEvent) {
    e.preventDefault()
    const mb = Number(form.amountMB)
    if (!form.mobile || !mb) {
      toast.error('Fill recipient mobile and data amount.')
      return
    }
    
    setLoading(true)
    try {
      const res = await api.post('/family-sharing', {
        receiverMobile: form.mobile,
        relation: form.relation,
        dataAmount: mb,
      })
      
      if (res.data.success) {
        setHistory((h) => [res.data.data, ...h])
        setSuccessOpen(true)
        setForm({ mobile: '', relation: 'Friend', amountMB: '' })
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Transfer failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Share2 className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-4xl font-bold">Family data sharing</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Move unused data to someone who needs it.
        </p>
      </motion.div>

      <Card className="mx-auto mt-10 max-w-xl border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-soft">
        <CardHeader>
          <CardTitle>Your remaining balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary">{balanceGB} GB</p>
          <p className="text-sm text-muted-foreground">Available data for sharing</p>
        </CardContent>
      </Card>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={submitTransfer}
          className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="text-xl font-semibold">Transfer data</h2>
          <div className="flex flex-wrap gap-2">
            {quickTransfer.map((q) => (
               <Button
                key={q.label} type="button" variant="outline" size="sm" className="rounded-full"
                onClick={() => setForm({ ...form, amountMB: String(q.mb) })}
               >
                 {q.label}
               </Button>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="fs-mobile">Receiver Mobile</Label>
            <Input id="fs-mobile" value={form.mobile} onChange={(e) => setForm({...form, mobile: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fs-rel">Relation</Label>
            <select id="fs-rel" className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={form.relation} onChange={(e) => setForm({...form, relation: e.target.value})}>
              {['Father', 'Mother', 'Brother', 'Sister', 'Friend', 'Other'].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fs-amt">Amount (MB)</Label>
            <Input id="fs-amt" type="number" min={1} value={form.amountMB} onChange={(e) => setForm({...form, amountMB: e.target.value})} required />
          </div>
          <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
            {loading ? 'Processing...' : 'Transfer data'}
          </Button>
        </motion.form>

        <div className="space-y-8">
           <Card>
             <CardHeader>
               <CardTitle>Transfer History</CardTitle>
             </CardHeader>
             <CardContent>
               {fetching ? (
                 <p className="animate-pulse">Loading...</p>
               ) : history.length > 0 ? (
                 <div className="space-y-3">
                   {history.map((h, i) => (
                     <div key={i} className="flex justify-between border-b pb-2 text-sm">
                       <span>{h.receiverMobile} ({h.relation})</span>
                       <span className="font-semibold text-primary">{h.dataAmount} MB</span>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-muted-foreground">No transfers yet.</p>
               )}
             </CardContent>
           </Card>
        </div>
      </div>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
           <DialogHeader>
             <DialogTitle>Transfer successful</DialogTitle>
             <DialogDescription>Your data has been effectively shared.</DialogDescription>
           </DialogHeader>
           <Button onClick={() => setSuccessOpen(false)}>OK</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
