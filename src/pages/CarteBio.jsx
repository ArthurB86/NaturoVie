import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const places = [
  { lat: 48.85, lng: 2.35, name: "Bio c'Bon Paris", type: 'bio' },
  { lat: 43.30, lng: 5.38, name: 'Herboristerie Marseille', type: 'herbo' },
  { lat: 45.75, lng: 4.84, name: 'Épicerie Santé Lyon', type: 'epice' },
  { lat: 46.58, lng: 0.34, name: 'Ferme Bio Poitiers', type: 'ferme' },
]

const colors = { bio: '#22c55e', herbo: '#a855f7', ferme: '#f97316', epice: '#3b82f6' }
const labels = { bio: '🌿 Magasin bio', herbo: '🌸 Herboristerie', ferme: '🚜 Ferme', epice: '🫙 Épicerie santé' }

export default function CarteBio() {
  const mapRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (instanceRef.current) return
    instanceRef.current = L.map(mapRef.current).setView([46.5, 2.5], 6)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
    }).addTo(instanceRef.current)

    places.forEach(p => {
      const color = colors[p.type]
      const icon = L.divIcon({
        html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
        className: '', iconSize: [14, 14]
      })
      L.marker([p.lat, p.lng], { icon }).addTo(instanceRef.current).bindPopup(`<strong>${p.name}</strong>`)
    })

    return () => {
      instanceRef.current?.remove()
      instanceRef.current = null
    }
  }, [])

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      pos => instanceRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 12),
      () => instanceRef.current?.setView([48.85, 2.35], 12)
    )
  }

  return (
    <div className="animate-fadeUp">
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Carte des lieux bio</h1>
        <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Magasins bio, herboristeries et fermes près de chez vous</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={locateUser} style={{ padding: '8px 16px', borderRadius: 20, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'var(--green)', color: '#fff' }}>
          📍 Me localiser
        </button>
        {Object.entries(labels).map(([type, label]) => (
          <button key={type} style={{ padding: '8px 16px', borderRadius: 20, fontSize: '.84rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: colors[type], color: '#fff' }}>
            {label}
          </button>
        ))}
      </div>

      <div ref={mapRef} style={{ height: 480, borderRadius: 12, border: '1px solid var(--border)' }} />
    </div>
  )
}
