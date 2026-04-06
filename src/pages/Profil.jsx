import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const fieldStyle = { width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', color: 'var(--text)', outline: 'none' }
const labelStyle = { display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: 5 }

export default function Profil() {
  const { user } = useAuth()
  const [profil, setProfil] = useState({ age: 31, genre: 'Homme', taille: 188, poids: 74, activite: 'Modéré', sommeil: 'Bonne', problemes: '', allergies: '', objectifs: 'plus d\'énergie, prise de muscle, meilleur sommeil' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from('profils').select('*').eq('user_id', user.id).single()
      .then(({ data }) => { if (data) setProfil(p => ({ ...p, ...data })) })
  }, [user])

  const imc = (profil.poids / ((profil.taille / 100) ** 2)).toFixed(1)

  const handleSave = async () => {
    await supabase.from('profils').upsert({ user_id: user.id, ...profil, updated_at: new Date().toISOString() })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const set = (key) => (e) => setProfil(p => ({ ...p, [key]: e.target.value }))

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Mon Profil Santé</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Gérez vos informations personnelles</p>
        </div>
        <button onClick={handleSave} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: saved ? '#22c55e' : 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          {saved ? '✓ Sauvegardé' : 'Sauvegarder'}
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[{ label: 'Âge', value: profil.age }, { label: 'Poids', value: `${profil.poids} kg` }, { label: 'Taille', value: `${profil.taille} cm` }, { label: 'IMC', value: imc, badge: 'Normal' }].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 16, padding: '18px 20px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700 }}>{s.value}</div>
            {s.badge && <span style={{ display: 'inline-block', marginTop: 4, fontSize: '.72rem', padding: '2px 8px', borderRadius: 20, background: 'var(--green-light)', color: 'var(--green)', fontWeight: 600 }}>{s.badge}</span>}
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: '26px 28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 18 }}>Informations personnelles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={labelStyle}>Âge</label><input style={fieldStyle} type="number" value={profil.age} onChange={set('age')}/></div>
            <div><label style={labelStyle}>Genre</label>
              <select style={fieldStyle} value={profil.genre} onChange={set('genre')}>
                {['Homme','Femme','Autre'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={labelStyle}>Taille (cm)</label><input style={fieldStyle} type="number" value={profil.taille} onChange={set('taille')}/></div>
            <div><label style={labelStyle}>Poids (kg)</label><input style={fieldStyle} type="number" value={profil.poids} onChange={set('poids')}/></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div><label style={labelStyle}>Niveau d'activité</label>
              <select style={fieldStyle} value={profil.activite} onChange={set('activite')}>
                {['Sédentaire','Léger','Modéré','Actif','Très actif'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Qualité du sommeil</label>
              <select style={fieldStyle} value={profil.sommeil} onChange={set('sommeil')}>
                {['Très mauvaise','Mauvaise','Moyenne','Bonne','Excellente'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '26px 28px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 18 }}>Santé</h3>
          {[
            { label: 'Problèmes de santé', key: 'problemes', placeholder: 'Décrivez vos problèmes actuels…' },
            { label: 'Allergies', key: 'allergies', placeholder: 'Allergies connues…' },
            { label: 'Objectifs', key: 'objectifs', placeholder: 'Vos objectifs santé…' },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <label style={labelStyle}>{f.label}</label>
              <textarea style={{ ...fieldStyle, minHeight: 70, resize: 'vertical' }} value={profil[f.key]} onChange={set(f.key)} placeholder={f.placeholder}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
