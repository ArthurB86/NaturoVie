import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const categories = ['Tout', 'Expérience', 'Question', 'Conseil', 'Témoignage', 'Recette']

export default function Communaute() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('Tout')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ titre: '', categorie: 'Expérience', contenu: '' })

  useEffect(() => {
    supabase.from('posts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setPosts(data ?? []))
  }, [])

  const publish = async () => {
    if (!form.titre || !form.contenu) return
    const { data } = await supabase.from('posts').insert({
      user_id: user.id, author: user.email?.split('@')[0], ...form, likes: 0
    }).select().single()
    if (data) setPosts(p => [data, ...p])
    setShowModal(false)
    setForm({ titre: '', categorie: 'Expérience', contenu: '' })
  }

  const like = async (post) => {
    await supabase.from('posts').update({ likes: post.likes + 1 }).eq('id', post.id)
    setPosts(p => p.map(x => x.id === post.id ? { ...x, likes: x.likes + 1 } : x))
  }

  const filtered = filter === 'Tout' ? posts : posts.filter(p => p.categorie === filter)

  return (
    <div className="animate-fadeUp">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.8rem', marginBottom: 3 }}>Communauté</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Partagez vos expériences</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>
          + Nouveau post
        </button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '6px 16px', borderRadius: 20, fontSize: '.84rem', fontWeight: filter === c ? 600 : 500, cursor: 'pointer', border: `1.5px solid ${filter === c ? 'var(--text)' : 'var(--border)'}`, background: filter === c ? 'var(--text)' : '#fff', color: filter === c ? '#fff' : 'var(--text-sub)' }}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 16, padding: 60, textAlign: 'center', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>Aucun post pour le moment</p>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>Soyez le premier à partager votre expérience !</p>
        </div>
      ) : filtered.map(post => (
        <div key={post.id} style={{ background: '#fff', borderRadius: 16, padding: '20px 24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.8rem', fontWeight: 600, color: 'var(--green)' }}>
              {post.author?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '.875rem', fontWeight: 600 }}>{post.author}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{post.categorie}</div>
            </div>
          </div>
          <div style={{ fontSize: '.975rem', fontWeight: 600, marginBottom: 6 }}>{post.titre}</div>
          <div style={{ fontSize: '.855rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: 12 }}>{post.contenu}</div>
          <button onClick={() => like(post)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '.8rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}>
            ♥ {post.likes}
          </button>
        </div>
      ))}

      {showModal && (
        <div onClick={e => e.target === e.currentTarget && setShowModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 32, width: '100%', maxWidth: 480 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.4rem', marginBottom: 6 }}>Nouveau post</h2>
            <p style={{ fontSize: '.875rem', color: 'var(--text-sub)', marginBottom: 24 }}>Partagez votre expérience avec la communauté.</p>
            {[{ label: 'Titre', key: 'titre', type: 'input', placeholder: 'Titre de votre post…' }].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(fm => ({ ...fm, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}/>
              </div>
            ))}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>Catégorie</label>
              <select value={form.categorie} onChange={e => setForm(f => ({ ...f, categorie: e.target.value }))} style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none' }}>
                {categories.filter(c => c !== 'Tout').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: '.78rem', fontWeight: 600, marginBottom: 5 }}>Contenu</label>
              <textarea value={form.contenu} onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))} placeholder="Partagez votre expérience…"
                style={{ width: '100%', padding: '9px 12px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 9, fontFamily: 'inherit', fontSize: '.875rem', outline: 'none', minHeight: 100, resize: 'vertical' }}/>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '10px 18px', background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', cursor: 'pointer' }}>Annuler</button>
              <button onClick={publish} style={{ padding: '10px 18px', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.875rem', fontWeight: 600, cursor: 'pointer' }}>Publier</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
