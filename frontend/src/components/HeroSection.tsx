import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import heroIllustration from '@/assets/illustrations/hero-recharge.svg'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-accent/90 px-6 py-16 text-primary-foreground shadow-soft sm:px-10 lg:py-20">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/30 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground/90">
            For every student, worker & family
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Mobile Recharge Should Not Be a Luxury
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/95 sm:text-xl">
            Find cheaper recharge plans, compare telecom prices, and get help if
            you cannot afford a recharge.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-xl bg-white text-primary shadow-lg hover:bg-white/90"
            >
              <Link to="/compare">Compare Plans</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-xl border-2 border-white bg-transparent text-white hover:bg-white/10"
            >
              <Link to="/help">Get Recharge Help</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <img
            src={heroIllustration}
            alt="Student checking phone with low balance"
            className="max-h-[320px] w-full max-w-md drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}
