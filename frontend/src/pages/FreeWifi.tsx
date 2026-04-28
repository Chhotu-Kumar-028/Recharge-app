import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Wifi } from 'lucide-react'
import { WifiLocationCard } from '@/components/WifiLocationCard'
import { freeWifiLocations } from '@/data/freeWifiLocations'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const categories = [
  'All',
  'Libraries',
  'Government Centres',
  'Railway Stations',
  'Metro Stations',
  'Cafes',
  'Community Centres',
]

export default function FreeWifi() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')

  const filtered = useMemo(() => {
    return freeWifiLocations.filter((loc) => {
      const text = `${loc.city} ${loc.area} ${loc.pincode} ${loc.name} ${loc.address}`.toLowerCase()
      const matchQ = !q.trim() || text.includes(q.toLowerCase().trim())
      const matchCat =
        cat === 'All' || loc.category === cat
      return matchQ && matchCat
    })
  }, [q, cat])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold">Free Wi‑Fi near you</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Sample locations—search by city, area, or pincode. Always verify on site.
        </p>
      </motion.div>

      <Card className="mt-10 border-border/80 p-6 shadow-soft">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search city, area, or pincode..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat === c
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-10 overflow-hidden rounded-3xl border-2 border-dashed border-primary/25 bg-gradient-to-br from-primary/5 to-accent/5 p-8">
        <div className="flex items-center gap-2 text-primary">
          <Wifi className="h-6 w-6" />
          <h2 className="text-lg font-semibold">Map preview</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Marker placeholders for nearby free hotspots (demo).
        </p>
        <div className="relative mt-6 h-56 rounded-2xl bg-muted/50">
          {filtered.slice(0, 5).map((loc, i) => (
            <motion.span
              key={loc.id}
              className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-lg"
              style={{
                left: `${15 + i * 16}%`,
                top: `${20 + (i % 3) * 22}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
              title={loc.name}
            >
              {i + 1}
            </motion.span>
          ))}
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold">Nearby locations</h2>
      <p className="text-sm text-muted-foreground">
        {filtered.length} result{filtered.length === 1 ? '' : 's'}
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((loc, i) => (
          <WifiLocationCard key={loc.id} location={loc} index={i} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          No matches. Try another city or category.
        </p>
      )}
    </div>
  )
}
