import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Leaf, Zap, Moon, Droplets, Brain, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const quickCards = [
  { label: 'Plan Nutrition', desc: 'Créer un régime', to: '/nutrition', icon: '🥗', color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Cures & Détox', desc: 'Programmes', to: '/detox', icon: '🛡️', color: 'bg-amber-50 text-amber-700' },
  { label: 'Activité Physique', desc: 'Exercices', to: '/activity', icon: '⏱️', color: 'bg-blue-50 text-blue-700' },
  { label: 'Mon Évolution', desc: 'Suivre mes progrès', to: '/progress', icon: '📈', color: 'bg-pink-50 text-pink-700' },
]

const healthItems = [
  { label: 'Énergie', value: 'Bon', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Sommeil', value: 'Bonne', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { label: 'Hydratation', value: '? L/Jour', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-50' },
  { label: 'Mental', value: 'Bon', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-50' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3d7a5a 0%, #2e6048 60%, #265040 100%)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 bg-white -translate-y-1/4 translate-x-1/4" />
        <p className="text-sm text-white/70 mb-2 flex items-center gap-1"><Leaf className="w-3.5 h-3.5" /> NaturoVie</p>
        <h1 className="font-heading text-3xl font-semibold mb-2">Bonjour 🌿</h1>
        <p className="text-white/80 text-sm max-w-md mb-5 leading-relaxed">
          Votre parcours vers une santé naturelle continue. Découvrez vos recommandations personnalisées du jour.
        </p>
        <Button onClick={() => navigate('/nutrition')}
          className="bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
          Voir mes recommandations <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick cards */}
      <div className="grid grid-cols-4 gap-4">
        {quickCards.map(c => (
          <Card key={c.label} className="cursor-pointer hover:-translate-y-1 transition-transform"
            onClick={() => navigate(c.to)}>
            <CardContent className="pt-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${c.color}`}>
                {c.icon}
              </div>
              <p className="font-semibold text-sm mb-0.5">{c.label}</p>
              <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-5">
            <h2 className="font-heading text-lg font-semibold mb-4">Aperçu Santé</h2>
            <div className="grid grid-cols-2 gap-3">
              {healthItems.map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="flex items-center gap-2.5 p-3 rounded-xl border"
                  style={{ backgroundColor: 'hsl(var(--muted))', borderColor: 'hsl(var(--border))' }}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</p>
                    <p className="text-sm font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Conseil du jour <Badge className="ml-1 text-xs">IA</Badge>
            </h2>
            <div className="rounded-xl p-4 border-l-4 border-primary"
              style={{ backgroundColor: 'hsl(152 45% 38% / 0.05)' }}>
              <p className="text-sm leading-relaxed">
                💧 <strong>Hydratation matinale :</strong> Commencez votre journée avec un verre d'eau tiède et du citron.
                Cette habitude stimule votre système digestif et booste votre métabolisme dès le réveil.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
