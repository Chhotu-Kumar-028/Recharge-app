import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Building2, Heart } from 'lucide-react'
import { FundingCampaignCard } from '@/components/FundingCampaignCard'
import { DonorLeaderboard } from '@/components/DonorLeaderboard'
import { fundingCampaigns, topDonors } from '@/data/fundingCampaigns'

const partners = ['Hope NGO', 'Digital Bharat Co.', 'Seva Foundation', 'Urban Bank CSR']

export default function RechargeFunding() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold">Recharge funding</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          NGOs, companies, and individuals pool money for packs that keep people online.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {fundingCampaigns.map((c, i) => (
          <FundingCampaignCard
            key={c.id}
            campaign={c}
            index={i}
            onContribute={() =>
              toast.message('Thanks — contribution flow is demo only.')
            }
          />
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <DonorLeaderboard donors={topDonors} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-border bg-card p-8 shadow-soft"
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Building2 className="h-6 w-6 text-primary" />
            Corporate & NGO partners
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Logo placeholders—real partnerships would appear here.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p}
                className="flex h-20 items-center justify-center rounded-xl border border-dashed border-primary/30 bg-primary/5 text-center text-xs font-semibold text-muted-foreground"
              >
                {p}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-sm font-medium text-accent"
            >
              <Heart className="h-4 w-4 fill-current" />
              Together we fund connectivity
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
