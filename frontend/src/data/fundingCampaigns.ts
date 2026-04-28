export interface FundingCampaign {
  id: string
  title: string
  description: string
  collected: number
  goal: number
  peopleHelped: number
}

export const fundingCampaigns: FundingCampaign[] = [
  {
    id: 'c1',
    title: 'Help 100 Students Stay Online',
    description: 'Sponsor monthly packs so students can attend classes without skipping meals.',
    collected: 312000,
    goal: 500000,
    peopleHelped: 67,
  },
  {
    id: 'c2',
    title: 'Support Workers with Emergency Recharge',
    description: 'Quick top-ups for gig workers when balance runs out mid-shift.',
    collected: 189000,
    goal: 300000,
    peopleHelped: 412,
  },
  {
    id: 'c3',
    title: 'Donate Internet Packs for Rural Families',
    description: 'Community packs for villages where broadband is still a dream.',
    collected: 94500,
    goal: 200000,
    peopleHelped: 128,
  },
]

export interface TopDonor {
  rank: number
  name: string
  amount: number
  peopleHelped: number
  anonymous?: boolean
}

export const topDonors: TopDonor[] = [
  { rank: 1, name: 'Rahul M.', amount: 25000, peopleHelped: 42 },
  { rank: 2, name: 'Anonymous Angel', amount: 18000, peopleHelped: 36, anonymous: true },
  { rank: 3, name: 'TechForGood NGO', amount: 15000, peopleHelped: 120 },
  { rank: 4, name: 'Priya S.', amount: 12000, peopleHelped: 24 },
  { rank: 5, name: 'Metro Retail Ltd', amount: 10000, peopleHelped: 55 },
]
