export interface DataTransfer {
  id: string
  date: string
  recipient: string
  amountLabel: string
  status: 'Completed' | 'Failed' | 'Processing'
}

export const dataTransferHistory: DataTransfer[] = [
  { id: 't1', date: '2026-04-01', recipient: 'Mother (98******10)', amountLabel: '500 MB', status: 'Completed' },
  { id: 't2', date: '2026-03-28', recipient: 'Brother (87******33)', amountLabel: '1 GB', status: 'Completed' },
  { id: 't3', date: '2026-03-25', recipient: 'Friend Ankit', amountLabel: '2 GB', status: 'Processing' },
]
