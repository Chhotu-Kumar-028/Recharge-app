export interface FamilyMember {
  id: string
  name: string
  mobile: string
  relation: string
  dataBalanceGB: number
}

export const familyMembers: FamilyMember[] = [
  { id: 'f1', name: 'Mother', mobile: '98******10', relation: 'Mother', dataBalanceGB: 0.8 },
  { id: 'f2', name: 'Brother', mobile: '87******33', relation: 'Brother', dataBalanceGB: 1.2 },
  { id: 'f3', name: 'Friend Ankit', mobile: '76******55', relation: 'Friend', dataBalanceGB: 2.1 },
]

export interface DataRequestFromFamily {
  id: string
  requestedFrom: string
  amountMB: number
  reason: string
  status: 'Pending' | 'Accepted' | 'Declined'
}

export const familyDataRequests: DataRequestFromFamily[] = [
  { id: 'fr1', requestedFrom: 'Brother', amountMB: 512, reason: 'Project upload tonight', status: 'Pending' },
  { id: 'fr2', requestedFrom: 'Mother', amountMB: 256, reason: 'Video call with doctor', status: 'Accepted' },
  { id: 'fr3', requestedFrom: 'Friend Ankit', amountMB: 1024, reason: 'Exam form', status: 'Declined' },
]
