import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, User, Salad, Shield, Activity, TrendingUp, ShoppingBag, Users, Map, Zap, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/',              label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/profile',       label: 'Mon Profil',       icon: User },
  { to: '/nutrition',     label: 'Nutrition',         icon: Salad },
  { to: '/detox',         label: 'Cures & Détox',     icon: Shield },
  { to: '/activity',      label: 'Activité Physique', icon: Activity },
  { to: '/progress',      label: 'Mon Évolution',     icon: TrendingUp },
  { to: '/products',      label: 'Produits',           icon: ShoppingBag },
  { to: '/community',     label: 'Communauté',         icon: Users },
  { to: '/map',           label: 'Carte bio',          icon: Map },
  { to: '/strava',        label: 'Strava',             icon: Zap },
  { to: '/consultations', label: 'Consultations Visio',icon: Video },
]

export default function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-56 flex flex-col border-r z-30"
        style={{ backgroundColor: 'hsl(var(--sidebar-background))', borderColor: 'hsl(var(--sidebar-border))' }}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
            style={{ background: 'linear-gradient(145deg, #5a9070, #3d7a5a)' }}>
            🌿
          </div>
          <div>
            <p className="font-heading font-semibold text-sm leading-tight">NaturoVie</p>
            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>Santé naturelle</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'}
              className={({ isActive }) => cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'text-white'
                  : 'hover:bg-white/60',
              )}
              style={({ isActive }) => isActive
                ? { backgroundColor: 'hsl(var(--primary))', color: 'white' }
                : { color: 'hsl(var(--sidebar-foreground))' }
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t text-center" style={{ borderColor: 'hsl(var(--sidebar-border))' }}>
          <p className="text-xs italic" style={{ color: 'hsl(var(--muted-foreground))' }}>
            La nature est votre meilleure alliée
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 min-h-screen p-8">
        <Outlet />
      </main>
    </div>
  )
}
