import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { generateWithClaude, prompts } from '../lib/claude'

export default function Cures() {
  const { user } = useAuth()
  const [cures, setCures] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from('cures').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => setCures(data ?? []))
  }, [user])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const profil = { age: 31, objectif: 'détox & vitalité' }
      const content = await generateWithClaude(prompts.cureDetox(profil))
      const { data } = await supabase.from('cures').insert({ user_id: user.id, nom: 'Cure Détox 14 jours', content, status: 'actif' }).select().single()
      if (data) setCures(c => [data, ...c])
      setShowModal(false)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Cures & Détox</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Programmes de purification naturels</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          + Nouvelle cure
        </button>
      </div>

      {cures.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 6 }}>Aucune cure en cours</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Créez votre premier programme détox personnalisé avec l'IA</p>
        </div>
      ) : cures.map(cure => (
        <div key={cure.id} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', marginBottom: 14 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{cure.nom}</h3>
          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '.72rem', fontWeight: 600, background: 'var(--green)', color: '#fff' }}>Actif</span>
        </div>
      ))}

      {showModal && (
        <div onClick={e => e.target === e.currentTarget && setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', marginBottom: 6 }}>Nouvelle cure détox</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', marginBottom: 24 }}>Claude IA va créer un programme personnalisé selon votre profil.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 18px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer' }}>Annuler</button>
              <button onClick={handleGenerate} disabled={generating} style={{ padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
                {generating ? 'Génération…' : '✨ Générer avec l\'IA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
