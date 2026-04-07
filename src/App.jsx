import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { queryClientInstance } from '@/lib/query-client'
import AppLayout from '@/components/layout/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Profile from '@/pages/Profile'
import Nutrition from '@/pages/Nutrition'
import Detox from '@/pages/Detox'
import Activity from '@/pages/Activity'
import Progress from '@/pages/Progress'
import Products from '@/pages/Products'
import Community from '@/pages/Community'
import CarteBio from '@/pages/CarteBio'
import Strava from '@/pages/Strava'
import Visio from '@/pages/Visio'

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/detox" element={<Detox />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/products" element={<Products />} />
            <Route path="/community" element={<Community />} />
            <Route path="/map" element={<CarteBio />} />
            <Route path="/strava" element={<Strava />} />
            <Route path="/consultations" element={<Visio />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  )
}

export default App
