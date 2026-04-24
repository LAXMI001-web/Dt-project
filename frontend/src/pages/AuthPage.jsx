import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import styles from './AuthPage.module.css';

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await login(form); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Login failed. Check your credentials.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}><span className={styles.logoMark}>N</span><span>NEXARA</span></div>
        </Link>
        <h2 className={styles.title}>Welcome back</h2>
        <p className={styles.sub}>Sign in to your Nexara client portal</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={submit} className={styles.form}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@company.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.pwWrap}>
              <input type={showPw ? 'text' : 'password'} className="form-input" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Your password" required />
              <button type="button" className={styles.pwToggle} onClick={() => setShowPw(p => !p)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
            {loading ? <><span className="spinner" /> Signing in...</> : <>Sign In <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className={styles.switchText}>Don't have an account? <Link to="/register" className={styles.switchLink}>Create one →</Link></p>
        <div className={styles.divider}><span>or</span></div>
        <Link to="/book-consultation" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '', phone: '', industry: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await register(form); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed.'); }
    finally { setLoading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card} style={{ maxWidth: 600 }}>
        <Link to="/" className={styles.logoLink}>
          <div className={styles.logo}><span className={styles.logoMark}>N</span><span>NEXARA</span></div>
        </Link>
        <h2 className={styles.title}>Create your account</h2>
        <p className={styles.sub}>Access your client portal, track consultations, and get ESG reports</p>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.grid2}>
            <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rajesh Kumar" required /></div>
            <div className="form-group"><label className="form-label">Work Email *</label><input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@company.com" required /></div>
            <div className="form-group"><label className="form-label">Password *</label><input type="password" className="form-input" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" required /></div>
            <div className="form-group"><label className="form-label">Company Name</label><input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Your Company Ltd" /></div>
            <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 99999 99999" /></div>
            <div className="form-group"><label className="form-label">Industry</label>
              <select className="form-input form-select" value={form.industry} onChange={e => set('industry', e.target.value)}>
                <option value="">Select industry</option>
                {['Manufacturing', 'FMCG', 'Pharmaceuticals', 'Automotive', 'Retail', 'E-Commerce', 'Chemicals', 'Logistics', 'Construction', 'Other'].map(i => <option key={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
            {loading ? <><span className="spinner" /> Creating account...</> : <>Create Account <ArrowRight size={16} /></>}
          </button>
        </form>
        <p className={styles.switchText}>Already have an account? <Link to="/login" className={styles.switchLink}>Sign in →</Link></p>
      </div>
    </div>
  );
}
