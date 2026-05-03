import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { RechargePlanCard } from '@/components/RechargePlanCard'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/services/api'
import { toast } from 'sonner'
import { rechargePlans as defaultPlans } from '@/data/rechargePlans'

export type NetworkCompany = 'Jio' | 'Airtel' | 'Vi' | 'BSNL' | 'Recharge Saathi'

export default function ComparePlans() {
  const [search, setSearch] = useState('')
  const [company, setCompany] = useState<NetworkCompany | 'all'>('all')
  const [maxPrice, setMaxPrice] = useState(9999)
  const [minValidity, setMinValidity] = useState(0)
  const [minData, setMinData] = useState(0)
  const [sortBy, setSortBy] = useState<'none' | 'lowest_price' | 'highest_data' | 'best_value'>('none')
  
  const [rechargePlans, setRechargePlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/plans')
        if (res.data.success) {
          // Map backend schema to what the frontend card expects
          const mappedPlans = res.data.data.map((p: any) => ({
             id: p._id,
             name: p.category || 'Recharge Plan',
             company: p.network,
             price: p.price,
             validityDays: p.validity,
             dataPerDayGB: p.dataPerDay,
             perks: [p.description]
          }))
          if (mappedPlans.length > 0) {
            setRechargePlans(mappedPlans)
          } else {
            setRechargePlans(defaultPlans)
          }
        } else {
          setRechargePlans(defaultPlans)
        }
      } catch(err) {
        setRechargePlans(defaultPlans)
        toast.error('Showing sample recharge plans')
      } finally {
        setLoading(false)
      }
    }
    fetchPlans()
  }, [])

  const filtered = useMemo(() => {
    return rechargePlans.filter((p) => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q)
      const matchCompany = company === 'all' || p.company === company
      const matchPrice = p.price <= maxPrice
      const matchVal = p.validityDays >= minValidity
      const matchData = p.dataPerDayGB >= minData
      return matchSearch && matchCompany && matchPrice && matchVal && matchData
    })
  }, [search, company, maxPrice, minValidity, minData, rechargePlans])

  const sortedAndFiltered = useMemo(() => {
    const plans = [...filtered]
    if (sortBy === 'lowest_price') {
      plans.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'highest_data') {
      plans.sort((a, b) => b.dataPerDayGB - a.dataPerDayGB)
    } else if (sortBy === 'best_value') {
      // Best value: Highest (Data * Validity) / Price
      plans.sort((a, b) => {
        const valA = (a.dataPerDayGB * a.validityDays) / (a.price || 1)
        const valB = (b.dataPerDayGB * b.validityDays) / (b.price || 1)
        return valB - valA
      })
    }
    return plans
  }, [filtered, sortBy])

  const cheapestPlanId = useMemo(() => {
    if (sortedAndFiltered.length === 0) return null
    return sortedAndFiltered.reduce((prev, curr) => (prev.price < curr.price ? prev : curr)).id
  }, [sortedAndFiltered])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-4xl font-bold text-foreground">Compare recharge plans</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
          Real packs for Jio, Airtel, Vi, and BSNL—filter instantly.
        </p>
      </motion.div>

      <Card className="mt-10 border-border/80 p-6 shadow-soft">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          Search & filters
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <div className="relative lg:col-span-2 xl:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search plan or company..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <label htmlFor="compare-network" className="mb-1 block text-xs font-medium text-muted-foreground">Company name</label>
            <select id="compare-network" className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={company} onChange={(e) => setCompany(e.target.value as NetworkCompany | 'all')}>
              <option value="all">All Networks</option>
              <option value="Airtel">Bharti Airtel</option>
              <option value="BSNL">BSNL</option>
              <option value="Jio">Reliance Jio</option>
              <option value="Vi">Vodafone Idea (Vi)</option>
              <option value="Recharge Saathi">Recharge Saathi</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Sort By</label>
            <select className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
              <option value="none">Relevance</option>
              <option value="lowest_price">Lowest Price</option>
              <option value="highest_data">Highest Data</option>
              <option value="best_value">Best Value</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Max price (₹)</label>
            <select className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))}>
              <option value={9999}>Any price</option>
              <option value={100}>Up to ₹100</option>
              <option value={200}>Up to ₹200</option>
              <option value={500}>Up to ₹500</option>
              <option value={1000}>Up to ₹1000</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Min validity (days)</label>
            <select className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={minValidity} onChange={(e) => setMinValidity(Number(e.target.value))}>
              <option value={0}>Any</option>
              <option value={14}>14+</option>
              <option value={28}>28+</option>
              <option value={84}>84+</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Min data / day (GB)</label>
            <select className="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" value={minData} onChange={(e) => setMinData(Number(e.target.value))}>
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={1.5}>1.5+</option>
              <option value={2}>2+</option>
            </select>
          </div>
        </div>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">Showing {sortedAndFiltered.length} plan{sortedAndFiltered.length === 1 ? '' : 's'}</p> 

      {loading ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAndFiltered.map((plan, i) => (
            <RechargePlanCard key={plan.id} plan={plan} index={i} isCheapest={plan.id === cheapestPlanId} />
          ))}
        </div>
      )}

      {!loading && sortedAndFiltered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No plans available. Please try different filters.
        </p>
      )}
    </div>
  )
}
