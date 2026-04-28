import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  IndianRupee,
  ShieldAlert,
  Sparkles,
  Users,
  WifiOff,
} from 'lucide-react'
import { HeroSection } from '@/components/HeroSection'
import { FAQ } from '@/components/FAQ'
import { AlertCard } from '@/components/AlertCard'
import { dashboardAlerts } from '@/data/notifications'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const testimonials = [
  {
    quote:
      'I could join online classes again after someone sponsored my pack. Recharge Saathi made it simple.',
    name: 'Student, Bihar',
    role: 'Got online class access',
  },
  {
    quote:
      'When my balance died mid-shift, emergency help got me ₹49 data to contact my family.',
    name: 'Delivery worker, Pune',
    role: 'Contacted family safely',
  },
  {
    quote:
      'I learned which BSNL pack fits my usage. Saved enough for seeds this season.',
    name: 'Farmer, Karnataka',
    role: 'Used internet for government schemes',
  },
]

function useInViewOnce() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

/** Mount only when visible so counter state starts at 0 without effect setState. */
function ImpactStats() {
  const users = useAnimatedCounter(10000, 2200, true)
  const saved = useAnimatedCounter(50, 2200, true)
  const solved = useAnimatedCounter(5000, 2200, true)

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-3">
      <div className="text-center">
        <Users className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-4 text-4xl font-bold text-primary">
          {users.toLocaleString('en-IN')}+
        </p>
        <p className="mt-1 text-muted-foreground">Users helped</p>
      </div>
      <div className="text-center">
        <IndianRupee className="mx-auto h-10 w-10 text-accent" />
        <p className="mt-4 text-4xl font-bold text-accent">
          ₹{saved} Lakh saved
        </p>
        <p className="mt-1 text-muted-foreground">Estimated community savings</p>
      </div>
      <div className="text-center">
        <HeartHandshake className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-4 text-4xl font-bold text-primary">
          {solved.toLocaleString('en-IN')}+
        </p>
        <p className="mt-1 text-muted-foreground">Recharge requests solved</p>
      </div>
    </div>
  )
}

export default function Home() {
  const { ref: statsRef, visible: statsVisible } = useInViewOnce()
  const [tIndex, setTIndex] = useState(0)
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="space-y-20 pb-20">
      <HeroSection />

      {showSkeleton ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Why this matters
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Many students, workers, and families cannot afford expensive
            recharges. Staying connected is basic dignity—not a premium add-on.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Expensive plans',
              text: 'Pack prices keep rising while incomes stay flat. One bad month can cut you off from work and school.',
              icon: IndianRupee,
            },
            {
              title: 'No internet access',
              text: 'Without data, forms, classes, and job alerts slip away—widening the gap for poor and middle-class homes.',
              icon: WifiOff,
            },
            {
              title: 'Hidden charges',
              text: 'VAS, auto-renew traps, and confusing offers drain balance when people least expect it.',
              icon: ShieldAlert,
            },
          ].map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-border/80 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-muted-foreground">{c.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          How Recharge Saathi helps
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Compare cheapest plans',
              text: 'Side-by-side packs from Jio, Airtel, Vi, and BSNL.',
              icon: Sparkles,
            },
            {
              title: 'Recharge sponsorship',
              text: 'Community donors can back people who cannot pay today.',
              icon: HeartHandshake,
            },
            {
              title: 'Track best offers',
              text: 'Alerts and reminders so validity and data never surprise you.',
              icon: AlertTriangle,
            },
            {
              title: 'Digital awareness',
              text: 'Simple guides to avoid fraud and stretch every rupee.',
              icon: BookOpen,
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-2 border-transparent bg-gradient-to-br from-card to-primary/5 shadow-card hover:border-primary/20">
                <CardContent className="p-6">
                  <f.icon className="h-8 w-8 text-accent" />
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        ref={statsRef}
        className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-primary/10 via-background to-accent/10 px-6 py-16 sm:px-10"
      >
        <h2 className="text-center text-3xl font-bold">Our impact (demo)</h2>
        {statsVisible ? <ImpactStats /> : (
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="h-24 animate-pulse rounded-xl bg-muted/60" />
            <div className="h-24 animate-pulse rounded-xl bg-muted/60" />
            <div className="h-24 animate-pulse rounded-xl bg-muted/60" />
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Recharge alerts preview</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
          Colour-coded reminders: red urgent, yellow warning, green safe.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {dashboardAlerts.map((a) => (
            <AlertCard
              key={a.id}
              title={a.title}
              description={a.description}
              severity={a.severity}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold">Stories from people like you</h2>
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
          <motion.div
            key={tIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              “{testimonials[tIndex].quote}”
            </p>
            <p className="mt-6 font-semibold text-primary">
              {testimonials[tIndex].name}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonials[tIndex].role}
            </p>
          </motion.div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
              }
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === tIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                  }`}
                  onClick={() => setTIndex(i)}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setTIndex((i) => (i + 1) % testimonials.length)}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <FAQ />

      <section className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-bold">Ready to save or get help?</h2>
        <p className="mt-2 text-muted-foreground">
          Compare plans, request support, or explore free Wi‑Fi near you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="rounded-xl gap-2">
            <Link to="/compare">
              Compare plans <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl">
            <Link to="/free-wifi">Find free Wi‑Fi</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
