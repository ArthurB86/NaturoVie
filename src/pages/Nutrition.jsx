import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Modal } from '@/components/ui/dialog'
import { Plus, Sparkles, Trash2, Salad } from 'lucide-react'

export default function Nutrition() {
  const [plans, setPlans] = useState([
    { id: 1, titre: 'Plan Nutritionnel 7 Jours', objectif: 'Énergie & vitalité', duree: 7 }
  ])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ titre: '', duree: 7, objectif: 'Énergie & vitalité' })

  const handleCreate = () => {
    setPlans(p => [...p, { id: Date.now(), ...form }])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Nutrition</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Plans alimentaires personnalisés selon votre profil</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Nouveau plan</Button>
      </div>

      {plans.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent><Salad className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p className="font-semibold mb-1">Aucun plan nutritionnel</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Générez votre premier plan avec l'IA Claude</p>
          </CardContent>
        </Card>
      ) : plans.map(plan => (
        <Card key={plan.id}>
          <CardContent className="pt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">{plan.titre}</h3>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{plan.objectif} · {plan.duree} jours</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge>Actif</Badge>
              <Button variant="ghost" size="icon" onClick={() => setPlans(p => p.filter(x => x.id !== plan.id))}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title="Nouveau plan nutritionnel">
        <div className="space-y-4">
          <div className="space-y-1.5"><Label>Titre</Label>
            <Input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} placeholder="Ex: Plan détox 14 jours" />
          </div>
          <div className="space-y-1.5"><Label>Durée (jours)</Label>
            <Input type="number" value={form.duree} onChange={e => setForm(f => ({ ...f, duree: +e.target.value }))} />
          </div>
          <div className="space-y-1.5"><Label>Objectif</Label>
            <select value={form.objectif} onChange={e => setForm(f => ({ ...f, objectif: e.target.value }))} className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
              {['Perte de poids', 'Prise de masse', 'Énergie & vitalité', 'Détox', 'Sommeil'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleCreate}><Sparkles className="w-4 h-4" /> Créer le plan</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
