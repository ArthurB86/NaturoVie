import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateWithClaude, prompts } from '../lib/claude'

const healthItems = [
  { label: 'Énergie', value: 'Bon', colorClass: 'energy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: 'Sommeil', value: 'Bonne', colorClass: 'sleep', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg> },
  { label: 'Hydratation', value: '? L/Jour', colorClass: 'water', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg> },
  { label: 'Mental', value: 'Bon', colorClass: 'mental', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2"><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="12" r="10"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
]

const quickCards = [
  { label: 'Plan Nutrition', desc: 'Créer un régime', to: '/nutrition', color: '#e8f3ed', iconColor: '#3d7a5a', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#3d7a5a" strokeWidth="2"><path d="M3 6h18M3 12h12M3 18h8"/><circle cx="19" cy="17" r="3"/></svg> },
  { label: 'Cures & Détox', desc: 'Programmes', to: '/cures', color: '#fef3e8', iconColor: '#d97706', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Activité Physique', desc: 'Exercices', to: '/activite', color: '#e8f0fb', iconColor: '#3b82f6', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> },
  { label: 'Mon Évolution', desc: 'Suivre mes progrès', to: '/evolution', color: '#fce8f0', iconColor: '#ec4899', icon: <svg viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [conseil, setConseil] = useState('Chargement du conseil du jour…')

  useEffect(() => {
    generateWithClaude(prompts.conseilDuJour({ age: 31, objectifs: 'énergie, muscle, sommeil' }))
      .then(setConseil)
      .catch(() => setConseil('💧 Commencez votre journée avec un verre d\'eau tiède et du citron pour stimuler votre système digestif.'))
  }, [])

  const username = user?.email?.split('@')[0] ?? 'utilisateur'

  return (
    <div className="animate-fadeUp">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#3d7a5a 0%,#2e6048 60%,#265040 100%)', borderRadius: 20, padding: '36px 40px', color: '#fff', position: 'relative', overflow: 'hidden', marginBottom: 24, boxShadow: '0 4px 24px rgba(61,122,90,.3)' }}>
        <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.7)', marginBottom: 10, fontWeight: 500 }}>🌿 NaturoVie</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', fontWeight: 400, marginBottom: 8 }}>Bonjour, {username} 🌿</h1>
        <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,.78)', maxWidth: 480, lineHeight: 1.55, marginBottom: 22 }}>Votre parcours vers une santé naturelle continue. Découvrez vos recommandations personnalisées du jour.</p>
        <button onClick={() => navigate('/nutrition')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'rgba(255,255,255,.18)', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, color: '#fff', fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          Voir mes recommandations →
        </button>
      </div>

      {/* Quick cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
        {quickCards.map(c => (
          <div key={c.label} onClick={() => navigate(c.to)} style={{ background: '#fff', borderRadius: 16, padding: '22px 20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'transform .15s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
              <span style={{ width: 22, height: 22 }}>{c.icon}</span>
            </div>
            <h3 style={{ fontSize: '.9rem', fontWeight: 600, marginBottom: 3 }}>{c.label}</h3>
            <p style={{ fontSize: '.775rem', color: 'var(--text-muted)' }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Aperçu Santé */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '26px 28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', marginBottom: 18 }}>Aperçu Santé</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {healthItems.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', background: '#fafaf8', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: { energy:'#fff4e0', sleep:'#eaf0ff', water:'#e8f6ff', mental:'#f0eaff' }[item.colorClass], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ width: 16, height: 16 }}>{item.icon}</span>
                </div>
                <div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: '.9rem', fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conseil du jour (IA) */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '26px 28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem', marginBottom: 18 }}>Conseil du jour <span style={{ fontSize: '.75rem', background: 'var(--green-light)', color: 'var(--green)', padding: '2px 8px', borderRadius: 20, fontWeight: 600, verticalAlign: 'middle' }}>IA</span></h2>
          <div style={{ background: '#f0f7f3', borderRadius: 12, padding: '16px 18px', borderLeft: '3px solid var(--green)' }}>
            <p style={{ fontSize: '.875rem', lineHeight: 1.6, color: 'var(--text)' }}>{conseil}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
