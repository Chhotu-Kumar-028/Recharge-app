import { Link } from 'react-router-dom'
import {
  Image as ImageIcon,
  MessageCircle,
  Share2,
  Smartphone,
  Video,
} from 'lucide-react'

const footerLinks = [
  { to: '/awareness', label: 'About' },
  { to: '/help', label: 'Contact' },
  { to: '/donate', label: 'Donate' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link to="/" className="flex items-center gap-2 font-bold text-primary">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Smartphone className="h-5 w-5" />
              </span>
              <span className="text-xl">Recharge Saathi</span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Made to help people stay connected. Compare plans, find help, and
              learn how to save on mobile recharge—no one should lose access
              because of cost.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => {}}
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Social
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Twitter / X"
              >
                <Share2 className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <ImageIcon className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="YouTube"
              >
                <Video className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Recharge Saathi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
