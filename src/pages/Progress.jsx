import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Modal } from '@/components/ui/dialog'
import { Plus, TrendingUp } from 'lucide-react'

export default function Progress() {
  const [entries, setEntries] = useState([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ poids: '', eau: '', energie: 7, humeur: 7, sommeil: 7, digestion: 7, notes: '' })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = () => {
    setEntries(e => [{ id: Date.now(), date: new Date().toLocaleDateString('fr-FR'), ...form }, ...e])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Mon Évolution</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Suivez votre progression au quotidien</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Nouvelle entrée</Button>
      </div>

      {entries.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent><TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p className="font-semibold mb-1">Commencez votre suivi</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Ajoutez votre première entrée pour suivre votre évolution.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map(e => (
            <Card key={e.id}>
              <CardContent className="pt-4 flex items-center gap-6">
                <div className="text-center min-w-16">
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{e.date}</p>
                  {e.poids && <p className="font-bold">{e.poids} kg</p>}
                </div>
                <div className="flex gap-4">
                  {[['Énergie', e.energie], ['Humeur', e.humeur], ['Sommeil', e.sommeil], ['Digestion', e.digestion]].map(([l, v]) => (
                    <div key={l} className="text-center">
                      <p className="text-xs mb-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{l}</p>
                      <p className="text-sm font-semibold" style={{ color: v >= 7 ? 'hsl(var(--primary))' : v >= 4 ? '#d97706' : '#ef4444' }}>{v}/10</p>
                    </div>
                  ))}
                </div>
                {e.notes && <p className="text-sm flex-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{e.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="Entrée du jour">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Poids (kg)</Label><Input type="number" value={form.poids} onChange={set('poids')} /></div>
            <div className="space-y-1.5"><Label>Eau (L)</Label><Input type="number" step=".1" value={form.eau} onChange={set('eau')} /></div>
          </div>
          {[['energie', 'Énergie'], ['humeur', 'Humeur'], ['sommeil', 'Sommeil'], ['digestion', 'Digestion']].map(([k, l]) => (
            <div key={k} className="space-y-1.5">
              <Label>{l} — {form[k]}/10</Label>
              <input type="range" min="1" max="10" value={form[k]} onChange={set(k)} className="w-full accent-primary" />
            </div>
          ))}
          <div className="space-y-1.5"><Label>Notes</Label><Textarea value={form.notes} onChange={set('notes')} placeholder="Comment vous sentez-vous ?" /></div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
