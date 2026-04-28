export interface HelpRequest {
  id: string
  name: string
  city: string
  amount: number
  reason: string
  occupation?: string
}

export const initialHelpRequests: HelpRequest[] = [
  { id: 'h1', name: 'Ravi Kumar', city: 'Patna', amount: 239, reason: 'Need data for online class this month', occupation: 'Student' },
  { id: 'h2', name: 'Sunita Devi', city: 'Lucknow', amount: 199, reason: 'Lost job; need to call hospital', occupation: 'Homemaker' },
  { id: 'h3', name: 'Imran Sheikh', city: 'Hyderabad', amount: 349, reason: 'Delivery work; phone is only income tool', occupation: 'Delivery partner' },
  { id: 'h4', name: 'Meena Joshi', city: 'Indore', amount: 149, reason: 'Exam form deadline; low balance', occupation: 'Student' },
  { id: 'h5', name: 'Harish Nair', city: 'Kochi', amount: 299, reason: 'Fishing season updates on phone', occupation: 'Fisherman' },
]
