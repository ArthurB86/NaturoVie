import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Strava() {
  const { user } = useAuth()
  const [imported, setImported] = useState(false)
  const [filename, setFilename] = useState('')

  const handleCSV = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFilename(file.name)
    // En production : parser le CSV et insérer dans Supabase
    await supabase.from('strava_imports').insert({ user_id: user.id, filename: file.name, imported_at: new Date().toISOString() })
    setImported(true)
  }

  return (
    <div className="animate-fadeUp">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>
          <span style={{ width: 28, height: 28, background: '#fc4c02', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.6rem', color: 'white', fontWeight: 900 }}>S</span>
          Strava
        </h1>
        <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Importez vos activités depuis Strava</p>
      </div>

      <div style={{ background: '#fff8f0', borderRadius: 16, padding: '20px 24px', border: '1.5px solid #fde0b0', marginBottom: 20 }}>
        <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: '#d97706', marginBottom: 10 }}>ℹ️ Comment exporter depuis Strava ?</h3>
        <ol style={{ paddingLeft: 20, fontSize: '.855rem', color: 'var(--text-sub)', lineHeight: 2 }}>
          <li>Allez sur <strong style={{ color: 'var(--text)' }}>strava.com</strong> → Mon Compte → Paramètres</li>
          <li>Cliquez sur <strong style={{ color: 'var(--text)' }}>"Mes données"</strong> → <strong style={{ color: 'var(--text)' }}>"Exporter vos données"</strong></li>
          <li>Téléchargez l'archive ZIP et ouvrez le fichier <strong style={{ color: 'var(--text)' }}>activities.csv</strong></li>
          <li>Importez ce fichier ci-dessous</li>
        </ol>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
        {imported ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>✅</div>
            <h3 style={{ color: 'var(--green)', fontWeight: 600, marginBottom: 4 }}>Fichier importé avec succès !</h3>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>{filename}</p>
            <button onClick={() => { setImported(false); setFilename('') }} style={{ marginTop: 16, padding: '8px 16px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer' }}>
              Importer un autre fichier
            </button>
          </div>
        ) : (
          <label style={{ display: 'block', border: '2px dashed #d1d5c8', borderRadius: 12, padding: '50px 24px', textAlign: 'center', cursor: 'pointer', transition: 'border-color .15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--green)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#d1d5c8'}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>📤</div>
            <h3 style={{ fontSize: '.975rem', fontWeight: 600, marginBottom: 4 }}>Cliquez pour importer activities.csv</h3>
            <p style={{ fontSize: '.82rem', color: 'var(--text-muted)' }}>Fichier CSV exporté depuis Strava</p>
            <input type="file" accept=".csv" onChange={handleCSV} style={{ display: 'none' }}/>
          </label>
        )}
      </div>
    </div>
  )
}
