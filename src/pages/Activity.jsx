import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

const activities = [
  { name: 'Entraînement en force', desc: 'Exercices de musculation avec poids libres pour augmenter la masse musculaire.', freq: '3x/semaine', duree: '60 min', intensite: 'Élevée', intensiteClass: 'bg-red-50 text-red-700', bienfaits: ['Augmentation de la masse musculaire', 'Amélioration de la force', 'Stimulation du métabolisme'], tips: 'Concentrez-vous sur des mouvements composés : squats, soulevés de terre, développés.' },
  { name: 'Yoga', desc: "Séance de yoga pour la flexibilité, la relaxation et la réduction du stress.", freq: '2x/semaine', duree: '45 min', intensite: 'Basse', intensiteClass: 'bg-emerald-50 text-emerald-700', bienfaits: ['Amélioration de la flexibilité', 'Réduction du stress', 'Meilleur sommeil'], tips: 'Pratiquez en fin de journée pour favoriser la relaxation.' },
  { name: 'Cardio (course/vélo)', desc: "Activité cardio pour améliorer l'endurance et la santé cardiovasculaire.", freq: '2x/semaine', duree: '30-45 min', intensite: 'Modérée', intensiteClass: 'bg-amber-50 text-amber-700', bienfaits: ["Amélioration de l'endurance", "Boost d'énergie", 'Aide au sommeil'], tips: 'Choisissez un rythme permettant de parler tout en faisant effort.' },
  { name: 'Qi Gong', desc: 'Séance de Qi Gong pour le bien-être mental et physique en plein air.', freq: '1-2x/semaine', duree: '30 min', intensite: 'Basse', intensiteClass: 'bg-emerald-50 text-emerald-700', bienfaits: ['Amélioration de la circulation', 'Réduction du stress', 'Meilleure concentration'], tips: 'Visualisez votre respiration pour vous concentrer.' },
  { name: 'Étirements actifs', desc: "Routine d'étirements pour la souplesse et la prévention des blessures.", freq: 'Après chaque séance', duree: '10-15 min', intensite: 'Basse', intensiteClass: 'bg-emerald-50 text-emerald-700', bienfaits: ['Prévention des blessures', 'Meilleure souplesse', 'Récupération rapide'], tips: 'Étirements dynamiques au début, statiques à la fin.' },
]

export default function Activity() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Activité Physique</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Programme adapté à votre profil</p>
        </div>
        <Button variant="outline"><RefreshCw className="w-4 h-4" /> Régénérer</Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          <p className="text-sm mb-3 leading-relaxed">Programme d'activité physique personnalisé pour un homme de 31 ans visant à augmenter l'énergie, prendre du muscle et améliorer le sommeil.</p>
          <Badge>5 jours d'activités variées par semaine</Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {activities.map(a => (
          <Card key={a.name}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{a.name}</CardTitle>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{a.desc}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline">📅 {a.freq}</Badge>
                <Badge variant="outline">⏱ {a.duree}</Badge>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.intensiteClass}`}>{a.intensite}</span>
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Bienfaits :</p>
                <ul className="text-xs space-y-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {a.bienfaits.map(b => <li key={b}>• {b}</li>)}
                </ul>
              </div>
              <div className="rounded-lg p-2.5 text-xs" style={{ backgroundColor: 'hsl(var(--accent))' }}>
                💡 {a.tips}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
