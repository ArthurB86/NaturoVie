import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Video } from 'lucide-react'

const doctors = [
  { name: 'Marc Leblond', spec: 'Sport & Performance', price: '75€', stars: 5, reviews: 98, exp: '9 ans', desc: "Naturopathe et ancien sportif de haut niveau. Spécialisé dans l'accompagnement des sportifs.", emoji: '👨‍⚕️' },
  { name: 'Pierre Fontaine', spec: 'Phytothérapie & Stress', price: '70€', stars: 5, reviews: 87, exp: '12 ans', desc: 'Expert en gestion du stress, burn-out et troubles du sommeil via les plantes médicinales.', emoji: '👨‍💼' },
  { name: 'Sophie Marchand', spec: 'Nutrition & Microbiote', price: '65€', stars: 5, reviews: 124, exp: '8 ans', desc: 'Spécialisée en nutrition fonctionnelle, santé digestive et rééquilibrage du microbiote.', emoji: '👩‍⚕️' },
  { name: 'Camille Rousseau', spec: 'Detox & Vitalité', price: '55€', stars: 4, reviews: 62, exp: '6 ans', desc: 'Accompagnement dans les cures détox, fatigue chronique et rééquilibrage hormonal.', emoji: '👩‍💼' },
]

export default function Visio() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Consultations Visio</h1>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Prenez rendez-vous avec un naturopathe certifié</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {doctors.map(doc => (
          <Card key={doc.name}>
            <CardContent className="pt-5">
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: 'hsl(var(--muted))' }}>{doc.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm">{doc.name}</p>
                    <span className="font-bold text-sm shrink-0">{doc.price}</span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: 'hsl(var(--primary))' }}>{doc.spec}</p>
                  <p className="text-xs text-amber-400">{'★'.repeat(doc.stars)}<span className="ml-1" style={{ color: 'hsl(var(--muted-foreground))' }}>({doc.reviews})</span></p>
                </div>
              </div>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>{doc.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge variant="outline">⏱ {doc.exp}</Badge>
                <Badge className="bg-emerald-50 text-emerald-700">🎥 Visio</Badge>
              </div>
              <Button className="w-full" onClick={() => setSelected(doc)}>
                <Video className="w-4 h-4" /> Prendre rendez-vous
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`RDV avec ${selected?.name}`}>
        <div className="space-y-4">
          <div className="space-y-1.5"><Label>Date</Label><Input type="date" /></div>
          <div className="space-y-1.5"><Label>Heure</Label>
            <select className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
              {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(h => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => setSelected(null)}>Annuler</Button>
            <Button onClick={() => setSelected(null)}>Confirmer le RDV</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
