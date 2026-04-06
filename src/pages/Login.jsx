import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signInWithEmail, signInWithGoogle, signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = mode === 'login'
        ? await signInWithEmail(email, password)
        : await signUp(email, password)
      if (error) setError(error.message)
      else navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    await signInWithGoogle()
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#eef0f3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="animate-fadeUp" style={{ background: '#fff', borderRadius: 22, boxShadow: '0 2px 4px rgba(0,0,0,.04),0 8px 32px rgba(0,0,0,.08)', padding: '44px 40px 40px', width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(145deg,#7a9060,#556445)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(85,100,69,.3)' }}>
            <svg viewBox="0 0 64 64" fill="none" width="38" height="38">
              <path d="M32 4s-4 10-12 12c4 0 6 2 6 2-6 4-12 10-10 20 3-4 6-5 6-5-1 5 0 11 6 17l2-6s1 8 2 14c1-6 2-14 2-14l2 6c6-6 7-12 6-17 0 0 3 1 6 5 2-10-4-16-10-20 0 0 2-2 6-2-8-2-12-12-12-12z" fill="url(#g1)"/>
              <defs><linearGradient id="g1" x1="16" y1="4" x2="48" y2="58"><stop offset="0%" stopColor="#f0c040"/><stop offset="100%" stopColor="#c07a10"/></linearGradient></defs>
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.75rem', marginBottom: 5 }}>Welcome to Naturavita</h1>
          <p style={{ fontSize: '.875rem', color: 'var(--text-sub)' }}>{mode === 'login' ? 'Sign in to continue' : 'Create your account'}</p>
        </div>

        {/* Google */}
        <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '11px 16px', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: '.9rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .15s' }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.233 17.64 11.925 17.64 9.2z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
          <span style={{ fontSize: '.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }}/>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
              style={{ width: '100%', padding: '11px 14px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 10, fontFamily: 'inherit', fontSize: '.9rem', outline: 'none' }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
              style={{ width: '100%', padding: '11px 14px', background: '#f5f6f8', border: '1.5px solid transparent', borderRadius: 10, fontFamily: 'inherit', fontSize: '.9rem', outline: 'none' }} />
          </div>

          {error && <p style={{ color: '#c0392b', fontSize: '.8rem', marginBottom: 10 }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: '#111318', color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'inherit', fontSize: '.95rem', fontWeight: 600, cursor: 'pointer', marginTop: 6 }}>
            {loading ? 'Chargement…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
          <a href="#" style={{ fontSize: '.8rem', color: 'var(--text-sub)', textDecoration: 'none' }}>Forgot password?</a>
          <button onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')} style={{ fontSize: '.8rem', color: 'var(--text)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
