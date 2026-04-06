import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import Nutrition from './pages/Nutrition'
import Cures from './pages/Cures'
import Activite from './pages/Activite'
import Evolution from './pages/Evolution'
import Produits from './pages/Produits'
import Communaute from './pages/Communaute'
import CarteBio from './pages/CarteBio'
import Strava from './pages/Strava'
import Visio from './pages/Visio'

function ProtectedLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        flex: 1,
        padding: '36px 40px',
        maxWidth: 'calc(100vw - var(--sidebar-w))',
        animation: 'fadeUp .4s cubic-bezier(.22,1,.36,1) both'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/cures" element={<Cures />} />
          <Route path="/activite" element={<Activite />} />
          <Route path="/evolution" element={<Evolution />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/communaute" element={<Communaute />} />
          <Route path="/carte" element={<CarteBio />} />
          <Route path="/strava" element={<Strava />} />
          <Route path="/visio" element={<Visio />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'var(--bg)' }}>
      <div style={{ width:32, height:32, border:'3px solid var(--border)', borderTopColor:'var(--green)', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/*" element={user ? <ProtectedLayout /> : <Navigate to="/login" replace />} />
    </Routes>
  )
}
