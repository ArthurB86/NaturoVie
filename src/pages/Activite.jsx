import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { generateWithClaude, prompts } from '../lib/claude'

const activitesDefault = [
  { titre: 'Entraînement en force', desc: 'Exercices de musculation avec poids libres pour augmenter la masse musculaire.', freq: '3x/semaine', duree: '60 min', intensite: 'Élevée', intensiteColor: '#fce8e8', intensiteText: '#c0392b', bienfaits: ['Augmentation de la masse musculaire', 'Amélioration de la force', 'Stimulation du métabolisme'], conseil: 'Concentrez-vous sur des mouvements composés : squats, soulevés de terre, développés.' },
  { titre: 'Yoga', desc: 'Séance de yoga pour la flexibilité, la relaxation et la réduction du stress.', freq: '2x/semaine', duree: '45 min', intensite: 'Basse', intensiteColor: '#e8f3ed', intensiteText: '#3d7a5a', bienfaits: ['Amélioration de la flexibilité', 'Réduction du stress', 'Meilleur sommeil'], conseil: 'Pratiquez en fin de journée pour favoriser la relaxation.' },
  { titre: 'Cardio (course/vélo)', desc: "Activité cardio pour améliorer l'endurance et la santé cardiovasculaire.", freq: '2x/semaine', duree: '30-45 min', intensite: 'Modérée', intensiteColor: '#fef3e8', intensiteText: '#d97706', bienfaits: ['Amélioration de l\'endurance', 'Boost d\'énergie', 'Aide au sommeil'], conseil: 'Choisissez un rythme permettant de parler tout en faisant effort.' },
  { titre: 'Qi Gong', desc: 'Séance de Qi Gong pour le bien-être mental et physique en plein air.', freq: '1-2x/semaine', duree: '30 min', intensite: 'Basse', intensiteColor: '#e8f3ed', intensiteText: '#3d7a5a', bienfaits: ['Amélioration de la circulation', 'Réduction du stress', 'Meilleure concentration'], conseil: 'Visualisez votre respiration pour vous concentrer.' },
  { titre: 'Étirements actifs', desc: "Routine d'étirements pour la souplesse et la prévention des blessures.", freq: 'Après chaque séance', duree: '10-15 min', intensite: 'Basse', intensiteColor: '#e8f3ed', intensiteText: '#3d7a5a', bienfaits: ['Prévention des blessures', 'Meilleure souplesse', 'Récupération rapide'], conseil: 'Étirements dynamiques au début, statiques à la fin.' },
]

export default function Activite() {
  const { user } = useAuth()
  const [activites, setActivites] = useState(activitesDefault)
  const [generating, setGenerating] = useState(false)

  const regenerer = async () => {
    setGenerating(true)
    try {
      const profil = { age: 31, objectifs: 'énergie, muscle, sommeil', niveau: 'modéré' }
      await generateWithClaude(prompts.activitePhysique(profil))
      // Garde les défauts pour la démo, en production parser le JSON retourné
    } catch (e) {
      console.error(e)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Activité Physique</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Programme adapté à votre profil</p>
        </div>
        <button onClick={regenerer} disabled={generating} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          {generating ? 'Génération…' : '↻ Régénérer'}
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', marginBottom: 20 }}>
        <p style={{ fontSize: '.9rem', lineHeight: 1.6, marginBottom: 10 }}>Programme d'activité physique personnalisé pour un homme de 31 ans visant à augmenter l'énergie, prendre du muscle et améliorer le sommeil.</p>
        <span style={{ display: 'inline-block', padding: '6px 14px', background: 'var(--green)', color: '#fff', borderRadius: 20, fontSize: '.8rem', fontWeight: 600 }}>5 jours d'activités variées par semaine</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {activites.map(a => (
          <div key={a.titre} style={{ background: '#fff', borderRadius: 16, padding: 22, boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '.975rem', fontWeight: 700, marginBottom: 6 }}>{a.titre}</h3>
            <p style={{ fontSize: '.825rem', color: 'var(--text-sub)', lineHeight: 1.5, marginBottom: 14 }}>{a.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: '.73rem', fontWeight: 500, background: '#f0f0ec', color: 'var(--text-sub)', border: '1px solid var(--border)' }}>📅 {a.freq}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: '.73rem', fontWeight: 500, background: '#f0f0ec', color: 'var(--text-sub)', border: '1px solid var(--border)' }}>⏱ {a.duree}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: 20, fontSize: '.73rem', fontWeight: 500, background: a.intensiteColor, color: a.intensiteText, border: `1px solid ${a.intensiteColor}` }}>{a.intensite}</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              {a.bienfaits.map(b => <div key={b} style={{ fontSize: '.8rem', color: 'var(--text-sub)', lineHeight: 1.8 }}>• {b}</div>)}
            </div>
            <div style={{ background: '#fffbf0', borderRadius: 9, padding: '10px 12px', borderLeft: '2px solid var(--gold)' }}>
              <p style={{ fontSize: '.78rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>💡 {a.conseil}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
