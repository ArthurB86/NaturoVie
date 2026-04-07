import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/dialog'
import { Plus, Sparkles, Shield } from 'lucide-react'

export default function Detox() {
  const [cures, setCures] = useState([])
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    setCures(c => [...c, { id: Date.now(), nom: 'Cure Détox 14 jours', status: 'actif' }])
    setOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Cures & Détox</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Programmes de purification naturels</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Nouvelle cure</Button>
      </div>

      {cures.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent><Shield className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p className="font-semibold mb-1">Aucune cure en cours</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Créez votre premier programme détox personnalisé</p>
          </CardContent>
        </Card>
      ) : cures.map(cure => (
        <Card key={cure.id}>
          <CardContent className="pt-5 flex items-center justify-between">
            <h3 className="font-semibold">{cure.nom}</h3>
            <Badge>Actif</Badge>
          </CardContent>
        </Card>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title="Nouvelle cure détox">
        <p className="text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>Un programme personnalisé sera créé selon votre profil.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleCreate}><Sparkles className="w-4 h-4" /> Créer la cure</Button>
        </div>
      </Modal>
    </div>
  )
}
