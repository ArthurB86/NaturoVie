import { useState } from 'react'
import { generateWithClaude, prompts } from '../lib/claude'

export default function Produits() {
  const [tab, setTab] = useState('scanner')
  const [barcode, setBarcode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchProduct = async () => {
    if (!barcode) return
    setLoading(true)
    setResult(null)
    try {
      // Récupère nom produit via Open Food Facts (API publique)
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      const data = await res.json()
      const productName = data?.product?.product_name ?? 'Produit inconnu'

      const analysis = await generateWithClaude(prompts.analyseProduct(barcode, productName))
      setResult({ name: productName, analysis })
    } catch (e) {
      setResult({ name: 'Erreur', analysis: 'Impossible d\'analyser ce produit.' })
    } finally {
      setLoading(false)
    }
  }

  const recommandations = [
    { name: '🌿 Spiruline Bio', desc: 'Riche en protéines végétales et vitamines B. Idéale pour l\'énergie et la prise de masse.', badge: 'Recommandé' },
    { name: '🌊 Magnésium Marin', desc: 'Améliore la qualité du sommeil et réduit la fatigue. Issu des algues marines.', badge: 'Recommandé' },
    { name: '🌙 Mélatonine Naturelle', desc: 'Favorise un endormissement naturel sans accoutumance.', badge: 'Recommandé' },
  ]

  return (
    <div className="animate-fadeUp">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Produits Naturels</h1>
        <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Recommandations personnalisées et analyse IA</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {[['scanner', 'Scanner un produit'], ['recommandations', 'Mes recommandations']].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ padding: '8px 18px', borderRadius: 20, fontSize: '.875rem', fontWeight: tab === key ? 600 : 500, cursor: 'pointer', border: `1.5px solid ${tab === key ? 'var(--text)' : 'var(--border)'}`, background: tab === key ? 'var(--text)' : '#fff', color: tab === key ? '#fff' : 'var(--text-sub)', transition: 'all .15s' }}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'scanner' && (
        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <input value={barcode} onChange={e => setBarcode(e.target.value)} onKeyDown={e => e.key === 'Enter' && searchProduct()} placeholder="Code-barres (ex: 3017620422003)"
              style={{ flex: 1, padding: '11px 14px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 10, fontFamily: 'inherit', fontSize: '.9rem', outline: 'none' }}/>
            <button onClick={searchProduct} disabled={loading || !barcode} style={{ padding: '11px 20px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
              {loading ? '…' : 'Analyser'}
            </button>
          </div>
          {loading && <p style={{ textAlign: 'center', color: 'var(--text-sub)', fontSize: '.875rem', padding: 20 }}>Analyse en cours…</p>}
          {result && (
            <div style={{ background: '#f5f6f8', borderRadius: 12, padding: 20, marginTop: 16 }}>
              <h3 style={{ fontWeight: 600, marginBottom: 8 }}>{result.name}</h3>
              <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>{result.analysis}</p>
            </div>
          )}
        </div>
      )}

      {tab === 'recommandations' && (
        <div>
          {recommandations.map(p => (
            <div key={p.name} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>{p.name}</h3>
                <p style={{ fontSize: '.84rem', color: 'var(--text-sub)', lineHeight: 1.55 }}>{p.desc}</p>
              </div>
              <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '.72rem', fontWeight: 600, background: 'var(--green)', color: '#fff', flexShrink: 0, marginLeft: 16 }}>{p.badge}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
