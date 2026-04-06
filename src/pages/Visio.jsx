import { useState } from 'react'

const doctors = [
  { name: 'Marc Leblond', spec: 'Sport & Performance', price: '75€', stars: 5, reviews: 98, exp: '9 ans', langs: 'Français, Anglais', desc: 'Naturopathe et ancien sportif de haut niveau. Spécialisé dans l\'accompagnement des sportifs : récupération, nutrition sportive et optimisation des performances.', emoji: '👨‍⚕️' },
  { name: 'Pierre Fontaine', spec: 'Phytothérapie & Stress', price: '70€', stars: 5, reviews: 87, exp: '12 ans', langs: 'Français', desc: 'Naturopathe et herboriste depuis 12 ans. Expert en gestion du stress, burn-out et troubles du sommeil via les plantes médicinales.', emoji: '👨‍💼' },
  { name: 'Sophie Marchand', spec: 'Nutrition & Microbiote', price: '65€', stars: 5, reviews: 124, exp: '8 ans', langs: 'Français, Anglais', desc: 'Naturopathe certifiée FENA. Spécialisée en nutrition fonctionnelle, santé digestive et rééquilibrage du microbiote.', emoji: '👩‍⚕️' },
  { name: 'Camille Rousseau', spec: 'Detox & Vitalité', price: '55€', stars: 4, reviews: 62, exp: '6 ans', langs: 'Français, Espagnol', desc: 'Passionnée par la naturopathie depuis 6 ans. Accompagnement dans les cures détox, fatigue chronique et rééquilibrage hormonal.', emoji: '👩‍💼' },
]

export default function Visio() {
  const [tab, setTab] = useState('annuaire')
  const [selectedDoc, setSelectedDoc] = useState(null)

  return (
    <div className="animate-fadeUp">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Consultations Visio</h1>
        <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Prenez rendez-vous avec un naturopathe certifié</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[['annuaire', 'Annuaire'], ['rdv', 'Mes RDV']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: '8px 20px', borderRadius: 20, fontSize: '.875rem', fontWeight: tab === key ? 600 : 500, cursor: 'pointer', border: `1.5px solid ${tab === key ? 'var(--text)' : 'var(--border)'}`, background: tab === key ? 'var(--text)' : '#fff', color: tab === key ? '#fff' : 'var(--text-sub)' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'annuaire' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {doctors.map(doc => (
            <div key={doc.name} style={{ background: '#fff', borderRadius: 16, padding: '20px 22px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#f0f0ec', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                  {doc.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '.975rem', fontWeight: 700 }}>{doc.name}</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>{doc.price}</span>
                  </div>
                  <div style={{ fontSize: '.8rem', color: 'var(--green)', fontWeight: 600, marginBottom: 2 }}>{doc.spec}</div>
                  <div style={{ fontSize: '.85rem', color: '#f59e0b' }}>{'★'.repeat(doc.stars)}<span style={{ color: 'var(--text-muted)', fontSize: '.78rem', marginLeft: 4 }}>({doc.reviews} avis)</span></div>
                </div>
              </div>
              <p style={{ fontSize: '.82rem', color: 'var(--text-sub)', lineHeight: 1.55, marginBottom: 12 }}>{doc.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {[`⏱ ${doc.exp}`, `🌍 ${doc.langs}`, '🎥 Visio'].map(tag => (
                  <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: '.73rem', fontWeight: 500, background: tag.includes('Visio') ? '#e8f3ed' : '#f5f5f0', color: tag.includes('Visio') ? 'var(--green)' : 'var(--text-sub)', border: `1px solid ${tag.includes('Visio') ? '#c8e0d0' : 'var(--border)'}` }}>
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={() => setSelectedDoc(doc)} style={{ width: '100%', padding: 11, background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
                🎥 Prendre rendez-vous
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === 'rdv' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Aucun rendez-vous planifié</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Prenez rendez-vous avec un naturopathe depuis l'annuaire</p>
        </div>
      )}

      {selectedDoc && (
        <div onClick={e => e.target === e.currentTarget && setSelectedDoc(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 440 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', marginBottom: 6 }}>RDV avec {selectedDoc.name}</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', marginBottom: 24 }}>Choisissez un créneau pour votre consultation visio.</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>Date</label>
              <input type="date" style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}/>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>Heure</label>
              <select style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}>
                {['09:00','10:00','11:00','14:00','15:00','16:00','17:00'].map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedDoc(null)} style={{ padding: '10px 18px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer' }}>Annuler</button>
              <button onClick={() => setSelectedDoc(null)} style={{ padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>Confirmer le RDV</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
