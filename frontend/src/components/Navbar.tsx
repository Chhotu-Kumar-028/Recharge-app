import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Smartphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ReminderDropdown } from '@/components/ReminderDropdown'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/compare', label: 'Compare Plans' },
  { to: '/help', label: 'Help' },
  { to: '/donate', label: 'Donate' },
  { to: '/awareness', label: 'Awareness' },
  { to: '/data-wallet', label: 'Data Wallet' },
  { to: '/emergency', label: 'Emergency Recharge' },
  { to: '/funding', label: 'Recharge Funding' },
  { to: '/free-wifi', label: 'Free Wi‑Fi' },
  { to: '/family-sharing', label: 'Family Sharing' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredNavItems = navItems.filter(item => {
    if (isAuthenticated && item.to === '/login') return false;
    return true;
  })

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-bold text-primary"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <Smartphone className="h-5 w-5" />
          </span>
          <span className="hidden text-lg tracking-tight sm:inline">
            Recharge Saathi
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
          {filteredNavItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-primary xl:px-3',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground'
                )
              }
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <Button variant="ghost" onClick={handleLogout} className="rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:text-primary xl:px-3">
              Logout
            </Button>
          )}
        </nav>

        <div className="flex items-center gap-1">
          <ReminderDropdown />
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <nav className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-4">
              {filteredNavItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-base font-medium',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground hover:bg-muted'
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  className="rounded-xl px-4 py-3 text-base font-medium bg-muted/50 text-foreground hover:bg-muted text-left"
                >
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
