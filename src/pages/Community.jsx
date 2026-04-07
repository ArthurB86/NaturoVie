import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Modal } from '@/components/ui/dialog'
import { Plus, Heart, Users } from 'lucide-react'

const cats = { experience: 'bg-emerald-50 text-emerald-700', question: 'bg-blue-50 text-blue-700', conseil: 'bg-amber-50 text-amber-700', temoignage: 'bg-purple-50 text-purple-700', recette: 'bg-pink-50 text-pink-700' }
const catLabels = { experience: 'Expérience', question: 'Question', conseil: 'Conseil', temoignage: 'Témoignage', recette: 'Recette' }

export default function Community() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ titre: '', categorie: 'experience', contenu: '' })

  const publish = () => {
    setPosts(p => [{ id: Date.now(), author: 'Moi', ...form, likes: 0 }, ...p])
    setOpen(false)
    setForm({ titre: '', categorie: 'experience', contenu: '' })
  }

  const filtered = filter === 'all' ? posts : posts.filter(p => p.categorie === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Communauté</h1>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Partagez vos expériences</p>
        </div>
        <Button onClick={() => setOpen(true)}><Plus className="w-4 h-4" /> Nouveau post</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[['all', 'Tout'], ...Object.entries(catLabels)].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className="px-3 py-1 rounded-full text-sm font-medium border transition-colors"
            style={filter === k ? { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))', borderColor: 'hsl(var(--foreground))' } : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            {l}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent><Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p className="font-semibold mb-1">Aucun post pour le moment</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Soyez le premier à partager votre expérience !</p>
          </CardContent>
        </Card>
      ) : filtered.map(post => (
        <Card key={post.id}>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                {post.author[0]}
              </div>
              <span className="text-sm font-medium">{post.author}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cats[post.categorie]}`}>{catLabels[post.categorie]}</span>
            </div>
            <p className="font-semibold mb-1">{post.titre}</p>
            <p className="text-sm mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>{post.contenu}</p>
            <button onClick={() => setPosts(p => p.map(x => x.id === post.id ? { ...x, likes: x.likes + 1 } : x))}
              className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <Heart className="w-3.5 h-3.5" /> {post.likes}
            </button>
          </CardContent>
        </Card>
      ))}

      <Modal open={open} onClose={() => setOpen(false)} title="Nouveau post">
        <div className="space-y-4">
          <div className="space-y-1.5"><Label>Titre</Label><Input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} placeholder="Titre de votre post…" /></div>
          <div className="space-y-1.5"><Label>Catégorie</Label>
            <select value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))} className="flex h-10 w-full rounded-lg border px-3 text-sm" style={{ borderColor: 'hsl(var(--border))' }}>
              {Object.entries(catLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </div>
          <div className="space-y-1.5"><Label>Contenu</Label><Textarea value={form.contenu} onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))} className="h-24" /></div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={publish} disabled={!form.titre || !form.contenu}>Publier</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
