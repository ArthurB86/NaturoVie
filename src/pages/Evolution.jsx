import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Evolution() {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ poids: '', eau: '', energie: 7, humeur: 7, sommeil: 7, digestion: 7, notes: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from('evolution').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(30)
      .then(({ data }) => setEntries(data ?? []))
  }, [user])

  const handleSave = async () => {
    const { data } = await supabase.from('evolution').insert({ user_id: user.id, ...form, date: new Date().toISOString().split('T')[0] }).select().single()
    if (data) setEntries(e => [data, ...e])
    setSaved(true)
    setShowModal(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Mon Évolution</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Suivez votre progression au quotidien</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          + Nouvelle entrée
        </button>
      </div>

      {entries.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 6 }}>Commencez votre suivi</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Ajoutez votre première entrée pour suivre votre évolution.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {entries.map(entry => (
            <div key={entry.id} style={{ background: '#fff', borderRadius: 16, padding: '18px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ flex: '0 0 auto', textAlign: 'center', minWidth: 80 }}>
                <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{new Date(entry.date).toLocaleDateString('fr-FR', { day:'numeric', month:'short' })}</div>
                {entry.poids && <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{entry.poids} kg</div>}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[['Énergie', entry.energie], ['Humeur', entry.humeur], ['Sommeil', entry.sommeil], ['Digestion', entry.digestion]].map(([label, val]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 600, color: val >= 7 ? 'var(--green)' : val >= 4 ? '#d97706' : '#ef4444' }}>{val}/10</div>
                  </div>
                ))}
              </div>
              {entry.notes && <p style={{ fontSize: '.82rem', color: 'var(--text-sub)', flex: 1 }}>{entry.notes}</p>}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div onClick={e => e.target === e.currentTarget && setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', marginBottom: 6 }}>Entrée du jour</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', marginBottom: 24 }}>Enregistrez votre état de santé.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {[['Poids (kg)', 'poids', 'number'], ['Eau (litres)', 'eau', 'number']].map(([label, key, type]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>{label}</label>
                  <input type={type} value={form[key]} onChange={set(key)} step={key === 'eau' ? .1 : 1}
                    style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}/>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {[['Énergie', 'energie'], ['Humeur', 'humeur'], ['Sommeil', 'sommeil'], ['Digestion', 'digestion']].map(([label, key]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>{label} — {form[key]}/10</label>
                  <input type="range" min="1" max="10" value={form[key]} onChange={set(key)} style={{ width: '100%', accentColor: 'var(--green)' }}/>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>Notes</label>
              <textarea value={form.notes} onChange={set('notes')} placeholder="Comment vous sentez-vous aujourd'hui ?" style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none', minHeight: 70, resize: 'vertical' }}/>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 18px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleSave} style={{ padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
