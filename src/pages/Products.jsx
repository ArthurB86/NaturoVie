import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const recommandations = [
  { name: '🌿 Spiruline Bio', desc: 'Riche en protéines végétales et vitamines B. Idéale pour l\'énergie et la prise de masse.' },
  { name: '🌊 Magnésium Marin', desc: 'Améliore la qualité du sommeil et réduit la fatigue. Issu des algues marines.' },
  { name: '🌙 Mélatonine Naturelle', desc: 'Favorise un endormissement naturel sans accoutumance.' },
]

export default function Products() {
  const [tab, setTab] = useState('recommandations')
  const [barcode, setBarcode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!barcode) return
    setLoading(true)
    setTimeout(() => {
      setResult({ name: 'Produit analysé', note: '⚠️ Contient du sucre raffiné. Non recommandé pour votre profil santé naturelle.' })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Produits Naturels</h1>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Recommandations personnalisées et analyse de produits</p>
      </div>

      <div className="flex gap-2">
        {[['recommandations', 'Mes recommandations'], ['scanner', 'Scanner un produit']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${tab === k ? 'bg-foreground text-background border-foreground' : 'border-border text-muted-foreground hover:text-foreground'}`} style={tab === k ? { backgroundColor: 'hsl(var(--foreground))', color: 'hsl(var(--background))' } : { borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted-foreground))' }}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'recommandations' && recommandations.map(p => (
        <Card key={p.name}>
          <CardContent className="pt-4 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold mb-1">{p.name}</p>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.desc}</p>
            </div>
            <Badge className="shrink-0">Recommandé</Badge>
          </CardContent>
        </Card>
      ))}

      {tab === 'scanner' && (
        <Card>
          <CardContent className="pt-5">
            <div className="flex gap-2 mb-4">
              <Input value={barcode} onChange={e => setBarcode(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} placeholder="Code-barres (ex: 3017620422003)" />
              <Button onClick={search} disabled={loading || !barcode}><Search className="w-4 h-4" /></Button>
            </div>
            {loading && <p className="text-sm text-center py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Analyse en cours…</p>}
            {result && (
              <div className="rounded-lg p-4" style={{ backgroundColor: 'hsl(var(--muted))' }}>
                <p className="font-semibold mb-1">{result.name}</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{result.note}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
