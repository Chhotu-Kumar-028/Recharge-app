export type AlertSeverity = 'urgent' | 'warning' | 'safe'

export interface Reminder {
  id: string
  message: string
  severity: AlertSeverity
  time: string
}

export const sampleReminders: Reminder[] = [
  { id: 'r1', message: 'Your Airtel plan will expire in 2 days', severity: 'urgent', time: '2h ago' },
  { id: 'r2', message: 'Only 200 MB data left today', severity: 'warning', time: '5h ago' },
  { id: 'r3', message: 'Your monthly bill of ₹120 is due tomorrow', severity: 'urgent', time: '1d ago' },
  { id: 'r4', message: 'Daily data refreshed — 2 GB available', severity: 'safe', time: 'Today' },
  { id: 'r5', message: 'Jio pack valid for 12 more days', severity: 'safe', time: 'Yesterday' },
]

export interface DashboardAlert {
  id: string
  title: string
  description: string
  severity: AlertSeverity
}

export const dashboardAlerts: DashboardAlert[] = [
  {
    id: 'da1',
    title: 'Validity ending soon',
    description: 'Your recharge ends in 48 hours. Renew to avoid call/data cut.',
    severity: 'urgent',
  },
  {
    id: 'da2',
    title: 'Low data balance',
    description: 'You have used 90% of today’s high-speed data.',
    severity: 'warning',
  },
  {
    id: 'da3',
    title: 'All good',
    description: 'Carry-forward data applied. You are covered for evening usage.',
    severity: 'safe',
  },
]
