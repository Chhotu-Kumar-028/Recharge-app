import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Manage platform resources.
        </p>

        <Card className="mt-8 border-border/80 shadow-soft">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Admin statistics and controls will be populated here.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
