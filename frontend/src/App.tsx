import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const Home = lazy(() => import('@/pages/Home'))
const ComparePlans = lazy(() => import('@/pages/ComparePlans'))
const HelpPage = lazy(() => import('@/pages/HelpPage'))
const Donate = lazy(() => import('@/pages/Donate'))
const Awareness = lazy(() => import('@/pages/Awareness'))
const DataWallet = lazy(() => import('@/pages/DataWallet'))
const EmergencyRecharge = lazy(() => import('@/pages/EmergencyRecharge'))
const RechargeFunding = lazy(() => import('@/pages/RechargeFunding'))
const FreeWifi = lazy(() => import('@/pages/FreeWifi'))
const FamilySharing = lazy(() => import('@/pages/FamilySharing'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const DonationHistory = lazy(() => import('@/pages/DonationHistory'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <motion.div
        className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<ComparePlans />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/emergency" element={<EmergencyRecharge />} />
            <Route path="/funding" element={<RechargeFunding />} />
            <Route path="/free-wifi" element={<FreeWifi />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/data-wallet" element={<DataWallet />} />
              <Route path="/family-sharing" element={<FamilySharing />} />
              <Route path="/donation-history" element={<DonationHistory />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <Toaster richColors position="top-center" closeButton />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
