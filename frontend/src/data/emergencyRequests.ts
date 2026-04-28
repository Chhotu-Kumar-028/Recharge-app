export type EmergencyStatus = 'Pending' | 'Approved' | 'Rejected'

export interface EmergencyRequest {
  id: string
  name: string
  mobile: string
  network: string
  amount: number
  reason: string
  status: EmergencyStatus
  submittedAt: string
}

export const initialEmergencyRequests: EmergencyRequest[] = [
  { id: 'e1', name: 'Asha K.', mobile: '98******21', network: 'Airtel', amount: 19, reason: 'Need OTP for ration card', status: 'Approved', submittedAt: '2026-03-28' },
  { id: 'e2', name: 'Vikram S.', mobile: '87******44', network: 'Jio', amount: 49, reason: 'Job interview call', status: 'Pending', submittedAt: '2026-04-02' },
  { id: 'e3', name: 'Lakshmi P.', mobile: '76******90', network: 'Vi', amount: 10, reason: 'Emergency family call', status: 'Rejected', submittedAt: '2026-03-15' },
]
