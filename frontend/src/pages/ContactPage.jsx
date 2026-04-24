// ContactPage.jsx
import { useState } from 'react';
import { contactAPI } from '../api';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import styles from './ContactPage.module.css';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) { setError('Please fill required fields.'); return; }
    setLoading(true);
    try { await contactAPI.submit(form); setDone(true); } catch (e) { setError(e.response?.data?.message || 'Failed to send.'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className={styles.heroTitle}>Let's Start a <em>Conversation</em></h1>
          <p className={styles.heroDesc}>Whether you have a specific challenge or just want to explore possibilities, we're here to help.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.formCard}>
              <h3>Send Us a Message</h3>
              {done ? (
                <div className={styles.success}>
                  <CheckCircle size={32} style={{ color: '#10b981' }} />
                  <h4>Message Received!</h4>
                  <p>We'll respond within 24 business hours.</p>
                </div>
              ) : (
                <>
                  {error && <div className={styles.error}>{error}</div>}
                  <div className={styles.formGrid}>
                    <div className="form-group"><label className="form-label">Name *</label><input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" /></div>
                    <div className="form-group"><label className="form-label">Email *</label><input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" /></div>
                    <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Company name" /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 99999 99999" /></div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Subject *</label><input className="form-input" value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="What's this about?" /></div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}><label className="form-label">Message *</label><textarea className="form-input" rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Describe your query or challenge..." style={{ resize: 'vertical' }} /></div>
                  </div>
                  <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>
                    {loading ? <><span className="spinner" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
                  </button>
                </>
              )}
            </div>
            <div className={styles.info}>
              {[
                { icon: <MapPin size={20} />, title: 'Offices', lines: ['Mumbai (HQ): Andheri East', 'Pune: Kharadi IT Park', 'Chennai & Delhi: Coming Soon'] },
                { icon: <Phone size={20} />, title: 'Phone', lines: ['+91 98765 43210', '+91 22 4567 8900'] },
                { icon: <Mail size={20} />, title: 'Email', lines: ['hello@nexara.com', 'projects@nexara.com'] },
                { icon: <Clock size={20} />, title: 'Hours', lines: ['Mon–Fri: 9:00 AM – 6:00 PM IST', 'Sat: 10:00 AM – 2:00 PM IST'] },
              ].map((item, i) => (
                <div key={i} className={styles.infoCard}>
                  <div className={styles.infoIcon}>{item.icon}</div>
                  <div><h5>{item.title}</h5>{item.lines.map((l, j) => <p key={j}>{l}</p>)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
