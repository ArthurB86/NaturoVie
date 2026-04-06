import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Tableau de bord', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { to: '/profil',    label: 'Mon Profil',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { to: '/nutrition', label: 'Nutrition',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h12M3 18h8"/><circle cx="19" cy="17" r="3"/></svg> },
  { to: '/cures',     label: 'Cures & Détox', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { to: '/activite',  label: 'Activité Physique', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  { to: '/evolution', label: 'Mon Évolution', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { to: '/produits',  label: 'Produits',      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> },
  { to: '/communaute',label: 'Communauté',    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { to: '/carte',     label: 'Carte bio',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { to: '/strava',    label: 'Strava',        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { to: '/visio',     label: 'Consultations Visio', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="15" height="12" rx="2"/><path d="M17 9l5-3v12l-5-3"/></svg> },
]

const s = {
  sidebar: { width: 'var(--sidebar-w)', background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100, animation: 'slideIn .4s cubic-bezier(.22,1,.36,1) both' },
  header: { padding: '20px 18px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' },
  logo: { width: 34, height: 34, background: 'linear-gradient(145deg,#5a9070,#3d7a5a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(61,122,90,.25)', flexShrink: 0 },
  nav: { flex: 1, padding: '12px 10px', overflowY: 'auto' },
  footer: { padding: 16, borderTop: '1px solid var(--border)', textAlign: 'center' },
}

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <aside style={s.sidebar}>
      <div style={s.header}>
        <div style={s.logo}>
          <svg viewBox="0 0 64 64" fill="none" width="18" height="18">
            <path d="M32 6s-4 9-12 11c4 0 6 2 6 2-6 4-12 10-10 20 3-4 6-5 6-5-1 5 0 11 6 17l2-6s1 8 2 13c1-5 2-13 2-13l2 6c6-6 7-12 6-17 0 0 3 1 6 5 2-10-4-16-10-20 0 0 2-2 6-2-8-2-12-11-12-11z" fill="white" opacity=".92"/>
          </svg>
        </div>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1rem', lineHeight: 1.1 }}>NaturoVie</h2>
          <p style={{ fontSize: '.7rem', color: 'var(--text-muted)' }}>Votre santé naturelle</p>
        </div>
      </div>

      <nav style={s.nav}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 10px', borderRadius: 10, cursor: 'pointer',
              transition: 'background .15s, color .15s',
              fontSize: '.865rem', fontWeight: isActive ? 600 : 500,
              color: isActive ? '#fff' : 'var(--text-sub)',
              background: isActive ? 'var(--green)' : 'transparent',
              marginBottom: 2, textDecoration: 'none',
            })}
          >
            <span style={{ width: 17, height: 17, flexShrink: 0, opacity: .85 }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={s.footer}>
        <p style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: 8 }}>
          {user?.email}
        </p>
        <button onClick={handleSignOut} style={{ fontSize: '.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
          Se déconnecter
        </button>
      </div>
    </aside>
  )
}
