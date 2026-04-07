import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Profile() {
  const [profil, setProfil] = useState({ age: 31, genre: 'Homme', taille: 188, poids: 74, activite: 'Modéré', sommeil: 'Bonne', problemes: '', allergies: '', objectifs: "plus d'énergie, prise de muscle, meilleur sommeil" })
  const [saved, setSaved] = useState(false)
  const set = k => e => setProfil(p => ({ ...p, [k]: e.target.value }))
  const imc = (profil.poids / (profil.taille / 100) ** 2).toFixed(1)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Mon Profil Santé</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Gérez vos informations personnelles</p>
        </div>
        <Button onClick={handleSave}>{saved ? '✓ Sauvegardé' : 'Sauvegarder'}</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{ l: 'Âge', v: profil.age }, { l: 'Poids', v: `${profil.poids} kg` }, { l: 'Taille', v: `${profil.taille} cm` }, { l: 'IMC', v: imc, badge: 'Normal' }].map(s => (
          <Card key={s.l}>
            <CardContent className="pt-4 text-center">
              <p className="text-xs font-medium mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{s.l}</p>
              <p className="text-2xl font-bold">{s.v}</p>
              {s.badge && <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'hsl(var(--primary) / 0.1)', color: 'hsl(var(--primary))' }}>{s.badge}</span>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card>
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-semibold">Informations personnelles</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Âge</Label><Input type="number" value={profil.age} onChange={set('age')} /></div>
              <div className="space-y-1.5"><Label>Genre</Label>
                <select value={profil.genre} onChange={set('genre')} className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
                  {['Homme', 'Femme', 'Autre'].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Taille (cm)</Label><Input type="number" value={profil.taille} onChange={set('taille')} /></div>
              <div className="space-y-1.5"><Label>Poids (kg)</Label><Input type="number" value={profil.poids} onChange={set('poids')} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Niveau d'activité</Label>
                <select value={profil.activite} onChange={set('activite')} className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
                  {['Sédentaire', 'Léger', 'Modéré', 'Actif', 'Très actif'].map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="space-y-1.5"><Label>Sommeil</Label>
                <select value={profil.sommeil} onChange={set('sommeil')} className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
                  {['Très mauvaise', 'Mauvaise', 'Moyenne', 'Bonne', 'Excellente'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 space-y-4">
            <h3 className="font-semibold">Santé & Objectifs</h3>
            <div className="space-y-1.5"><Label>Problèmes de santé</Label><Textarea value={profil.problemes} onChange={set('problemes')} placeholder="Décrivez vos problèmes actuels…" /></div>
            <div className="space-y-1.5"><Label>Allergies</Label><Textarea value={profil.allergies} onChange={set('allergies')} placeholder="Allergies connues…" /></div>
            <div className="space-y-1.5"><Label>Objectifs</Label><Textarea value={profil.objectifs} onChange={set('objectifs')} /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
