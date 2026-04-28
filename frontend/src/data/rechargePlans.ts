export type NetworkCompany = 'Jio' | 'Airtel' | 'Vi' | 'BSNL'
export type BestFor = 'students' | 'workers' | 'family'

export interface RechargePlan {
  id: string
  company: NetworkCompany
  price: number
  dataPerDayGB: number
  validityDays: number
  unlimitedCalls: boolean
  smsIncluded: boolean
  bestFor: BestFor
  name: string
}

export const rechargePlans: RechargePlan[] = [
  { id: '1', company: 'Jio', price: 239, dataPerDayGB: 1.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'Jio Popular' },
  { id: '2', company: 'Jio', price: 299, dataPerDayGB: 2, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Jio Work From Home' },
  { id: '3', company: 'Jio', price: 349, dataPerDayGB: 2.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'Jio Max' },
  { id: '4', company: 'Jio', price: 199, dataPerDayGB: 1, validityDays: 28, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'Jio Student Lite' },
  { id: '5', company: 'Jio', price: 479, dataPerDayGB: 3, validityDays: 56, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Jio Long Validity' },
  { id: '6', company: 'Airtel', price: 249, dataPerDayGB: 1.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'Airtel Unlimited' },
  { id: '7', company: 'Airtel', price: 319, dataPerDayGB: 2, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Airtel Pro' },
  { id: '8', company: 'Airtel', price: 179, dataPerDayGB: 1, validityDays: 24, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'Airtel Campus' },
  { id: '9', company: 'Airtel', price: 399, dataPerDayGB: 2.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'Airtel Family Pack' },
  { id: '10', company: 'Airtel', price: 599, dataPerDayGB: 3, validityDays: 84, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Airtel Quarterly' },
  { id: '11', company: 'Vi', price: 229, dataPerDayGB: 1.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'students', name: 'Vi Hero' },
  { id: '12', company: 'Vi', price: 289, dataPerDayGB: 2, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Vi Super' },
  { id: '13', company: 'Vi', price: 359, dataPerDayGB: 2.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'Vi Mega' },
  { id: '14', company: 'Vi', price: 155, dataPerDayGB: 0.5, validityDays: 28, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'Vi Mini' },
  { id: '15', company: 'Vi', price: 449, dataPerDayGB: 3, validityDays: 56, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'Vi Business' },
  { id: '16', company: 'BSNL', price: 199, dataPerDayGB: 1, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'BSNL Bharat Fibre Mobile' },
  { id: '17', company: 'BSNL', price: 147, dataPerDayGB: 0.75, validityDays: 28, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'BSNL Student' },
  { id: '18', company: 'BSNL', price: 239, dataPerDayGB: 1.5, validityDays: 28, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'BSNL Work' },
  { id: '19', company: 'BSNL', price: 299, dataPerDayGB: 2, validityDays: 30, unlimitedCalls: true, smsIncluded: true, bestFor: 'family', name: 'BSNL Value' },
  { id: '20', company: 'Jio', price: 119, dataPerDayGB: 0.5, validityDays: 14, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'Jio Budget' },
  { id: '21', company: 'Airtel', price: 99, dataPerDayGB: 0.3, validityDays: 18, unlimitedCalls: false, smsIncluded: false, bestFor: 'students', name: 'Airtel Starter' },
  { id: '22', company: 'Vi', price: 107, dataPerDayGB: 0.4, validityDays: 14, unlimitedCalls: true, smsIncluded: false, bestFor: 'students', name: 'Vi Pocket' },
  { id: '23', company: 'BSNL', price: 187, dataPerDayGB: 1, validityDays: 24, unlimitedCalls: true, smsIncluded: true, bestFor: 'workers', name: 'BSNL Standard' },
]
