import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'
import { DataUsageCard } from '@/components/DataUsageCard'
import { MonthlyBillCard } from '@/components/MonthlyBillCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useAuth } from '@/hooks/useAuth'

function CircularProgress({
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
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-28">
        <svg className="-rotate-90 transform" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" className="stroke-muted" strokeWidth="8" />
          <motion.circle
            cx="40" cy="40" r="36" fill="none"
            className={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg font-bold">{value.toFixed(1)}</span>
          <span className="text-[10px] text-muted-foreground">GB</span>
        </div>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-muted-foreground">{label}</p>
    </div>
  )
}

export default function DataWallet() {
  const [w, setWallet] = useState({
    usedGB: 0,
    remainingGB: 0,
    carriedForwardGB: 0,
    todayTotalGB: 0,
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user?._id) return
      try {
        const res = await api.get(`/data-wallet/${user._id}`)
        if (res.data.success) {
          const d = res.data.data
          setWallet({
            usedGB: d.usedData,
            remainingGB: d.remainingData,
            carriedForwardGB: d.carryForwardData,
            todayTotalGB: d.dailyData,
          })
        }
      } catch (error) {
        console.error('Failed to load data wallet', error)
      } finally {
        setLoading(false)
      }
    }
    fetchWallet()
  }, [user])

  const maxRing = w.todayTotalGB + w.carriedForwardGB

  const [settings, setSettings] = useState({
    sms: true, whatsapp: true, app: false, email: true,
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-bold">Data Wallet</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Smart carry-forward and pay-later usage.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <DataUsageCard />
        <Card>
          <CardHeader>
            <CardTitle>Today at a glance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-around gap-8 py-4">
             {loading ? (
               <p className="animate-pulse">Loading wallet info...</p>
             ) : (
               <>
                 <CircularProgress label="Used" value={w.usedGB} max={maxRing} color="stroke-accent" />
                 <CircularProgress label="Remaining" value={w.remainingGB} max={maxRing} color="stroke-emerald-500" />
                 <CircularProgress label="Carry fwd" value={w.carriedForwardGB} max={maxRing} color="stroke-primary" />
               </>
             )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <MonthlyBillCard />
      </div>

      <Card className="mt-12 border-border/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Reminder settings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          {[
            { key: 'sms' as const, label: 'SMS alerts', icon: MessageSquare },
            { key: 'whatsapp' as const, label: 'WhatsApp alerts', icon: Smartphone },
            { key: 'app' as const, label: 'App notifications', icon: Bell },
            { key: 'email' as const, label: 'Email reminders', icon: Mail },
          ].map(({ key, label, icon: Icon }) => (
            <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-muted/20 px-4 py-4">
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                <Label className="cursor-pointer font-medium">{label}</Label>
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={settings[key]}
                onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))}
                className={`relative h-7 w-12 rounded-full transition-colors ${settings[key] ? 'bg-primary' : 'bg-muted'}`}
              >
                <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${settings[key] ? 'left-6' : 'left-0.5'}`} />
              </button>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
