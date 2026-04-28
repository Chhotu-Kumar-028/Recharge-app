import { motion } from 'framer-motion'
import { MapPin, Navigation, Wifi } from 'lucide-react'
import type { WifiLocation } from '@/data/freeWifiLocations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

export interface WifiLocationCardProps {
  location: WifiLocation
  index?: number
}

export function WifiLocationCard({ location, index = 0 }: WifiLocationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ y: -2 }}
    >
      <Card className="h-full border-border/80 shadow-card transition-shadow hover:shadow-soft">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground">{location.name}</h3>
              <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                {location.type}
              </span>
            </div>
            <Wifi className="h-5 w-5 shrink-0 text-accent" />
          </div>
          <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            {location.address}, {location.city} — {location.pincode}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-muted-foreground">Distance</span>
              <p className="font-semibold">{location.distanceKm} km</p>
            </div>
            <div className="rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-muted-foreground">Speed</span>
              <p className="font-semibold">{location.speedMbps} Mbps</p>
            </div>
            <div className="col-span-2 rounded-lg bg-muted/50 px-3 py-2">
              <span className="text-muted-foreground">Open</span>
              <p className="font-semibold">{location.hours}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0">
          <Button variant="outline" className="w-full rounded-xl gap-2" type="button">
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
