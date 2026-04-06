import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { generateWithClaude, prompts } from '../lib/claude'

export default function Nutrition() {
  const { user } = useAuth()
  const [plans, setPlans] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [form, setForm] = useState({ titre: '', duree: 7, objectif: 'Énergie & vitalité' })

  useEffect(() => {
    if (!user) return
    supabase.from('nutrition_plans').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      .then(({ data }) => setPlans(data ?? []))
  }, [user])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const profil = { age: 31, objectif: form.objectif, duree: form.duree }
      const content = await generateWithClaude(prompts.nutritionPlan(profil))
      const { data } = await supabase.from('nutrition_plans').insert({
        user_id: user.id, titre: form.titre || `Plan ${form.objectif}`, duree: form.duree, objectif: form.objectif, content, status: 'actif'
      }).select().single()
      if (data) setPlans(p => [data, ...p])
      setShowModal(false)
    } finally {
      setGenerating(false)
    }
  }

  const deletePlan = async (id) => {
    await supabase.from('nutrition_plans').delete().eq('id', id)
    setPlans(p => p.filter(x => x.id !== id))
  }

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Nutrition</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Plans alimentaires générés par IA selon votre profil</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          + Nouveau plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 6 }}>Aucun plan nutritionnel</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Générez votre premier plan avec l'IA Claude</p>
        </div>
      ) : plans.map(plan => (
        <div key={plan.id} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{plan.titre}</h3>
            <p style={{ fontSize: '.84rem', color: 'var(--text-sub)', lineHeight: 1.55 }}>{plan.objectif} · {plan.duree} jours</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '.72rem', fontWeight: 600, background: 'var(--green)', color: '#fff' }}>Actif</span>
            <button onClick={() => deletePlan(plan.id)} style={{ width: 34, height: 34, borderRadius: 8, border: '1.5px solid #fde8e8', background: '#fff8f8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="15" height="15"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
            </button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <div onClick={e => e.target === e.currentTarget && setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', marginBottom: 6 }}>Nouveau plan nutritionnel</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', marginBottom: 24 }}>Généré par Claude IA selon votre profil.</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: 5 }}>Titre</label>
              <input value={form.titre} onChange={e => setForm(f => ({...f, titre: e.target.value}))} placeholder="Ex: Plan détox 14 jours" style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}/>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: 5 }}>Durée (jours)</label>
              <input type="number" value={form.duree} onChange={e => setForm(f => ({...f, duree: +e.target.value}))} style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}/>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: 5 }}>Objectif</label>
              <select value={form.objectif} onChange={e => setForm(f => ({...f, objectif: e.target.value}))} style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}>
                {['Perte de poids','Prise de masse','Énergie & vitalité','Détox','Sommeil'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 18px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer', color: 'var(--text-sub)' }}>Annuler</button>
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
