export type WifiPlaceType =
  | 'library'
  | 'cafe'
  | 'metro station'
  | 'school'
  | 'NGO center'
  | 'government office'
  | 'railway station'
  | 'community centre'

export interface WifiLocation {
  id: string
  name: string
  address: string
  city: string
  pincode: string
  area: string
  type: WifiPlaceType
  distanceKm: number
  speedMbps: string
  hours: string
  category: string
}

export const freeWifiLocations: WifiLocation[] = [
  { id: 'w1', name: 'District Public Library', address: 'Block A, Civil Lines', city: 'Delhi', pincode: '110054', area: 'Civil Lines', type: 'library', distanceKm: 1.2, speedMbps: '25–40', hours: '10:00–18:00', category: 'Libraries' },
  { id: 'w2', name: 'CSC Digital Seva', address: 'Ward 4, Near Bus Stand', city: 'Lucknow', pincode: '226001', area: 'Hazratganj', type: 'government office', distanceKm: 2.4, speedMbps: '10–20', hours: '09:00–17:00', category: 'Government Centres' },
  { id: 'w3', name: 'Central Railway Waiting Lounge', address: 'Platform 5 side', city: 'Mumbai', pincode: '400001', area: 'CST', type: 'railway station', distanceKm: 3.1, speedMbps: '15–30', hours: '24/7', category: 'Railway Stations' },
  { id: 'w4', name: 'Metro Knowledge Hub', address: 'Exit 2, Blue Line', city: 'Bengaluru', pincode: '560001', area: 'MG Road', type: 'metro station', distanceKm: 0.8, speedMbps: '30–50', hours: '05:30–23:00', category: 'Metro Stations' },
  { id: 'w5', name: 'Chai & Bytes Cafe', address: '12 College Road', city: 'Pune', pincode: '411004', area: 'FC Road', type: 'cafe', distanceKm: 1.5, speedMbps: '20–35', hours: '08:00–22:00', category: 'Cafes' },
  { id: 'w6', name: 'Samaj Kalyan Kendra', address: 'Behind Market', city: 'Patna', pincode: '800001', area: 'Boring Road', type: 'community centre', distanceKm: 2.0, speedMbps: '8–15', hours: '10:00–19:00', category: 'Community Centres' },
  { id: 'w7', name: 'Govt. Higher Secondary School', address: 'NH Bypass', city: 'Kochi', pincode: '682030', area: 'Edapally', type: 'school', distanceKm: 4.2, speedMbps: '12–25', hours: 'School hours', category: 'Community Centres' },
  { id: 'w8', name: 'Youth NGO Connect', address: 'Ring Road', city: 'Jaipur', pincode: '302015', area: 'Malviya Nagar', type: 'NGO center', distanceKm: 2.8, speedMbps: '15–25', hours: '11:00–20:00', category: 'Community Centres' },
]
