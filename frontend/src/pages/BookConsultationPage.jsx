import { useState } from 'react';
import { consultationAPI } from '../api';
import { CheckCircle, Calendar, Clock, ArrowRight } from 'lucide-react';
import styles from './BookConsultationPage.module.css';

const services = [
  { value: 'supply-chain', label: '🔗 Supply Chain Management' },
  { value: 'vendor-development', label: '🤝 Vendor Development' },
  { value: 'procurement', label: '📋 Procurement & Strategy' },
  { value: 'six-sigma', label: '⚙️ Six Sigma & Process Excellence' },
  { value: 'logistics', label: '🚚 Logistics & Distribution' },
  { value: 'inventory', label: '📦 Inventory Management' },
  { value: 'esg', label: '🌿 ESG Advisory' },
  { value: 'general', label: '💬 General Consultation' },
];

const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

export default function BookConsultationPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', industry: '', message: '', preferredDate: '', preferredTime: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.company || !form.service || !form.message) {
      setError('Please fill in all required fields.'); return;
    }
    setLoading(true); setError('');
    try {
      await consultationAPI.book(form);
      setSuccess(true);
    } catch (e) {
      setError(e.response?.data?.message || 'Booking failed. Please try again.');
    } finally { setLoading(false); }
  };

  if (success) return (
    <div className={styles.successPage}>
      <div className={styles.successCard}>
        <div className={styles.successIcon}><CheckCircle size={48} /></div>
        <h2>Consultation Booked!</h2>
        <p>Thank you, <strong>{form.name}</strong>. We've received your consultation request for <strong>{services.find(s => s.value === form.service)?.label}</strong>.</p>
        <p style={{ marginTop: 12 }}>A senior Nexara consultant will reach out within 24 hours to confirm your session details.</p>
        <div className={styles.confirmDetails}>
          {form.preferredDate && <div><Calendar size={16} /> {new Date(form.preferredDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>}
          {form.preferredTime && <div><Clock size={16} /> {form.preferredTime}</div>}
        </div>
        <a href="/" className="btn btn-primary" style={{ marginTop: 28 }}>Back to Home</a>
      </div>
    </div>
  );

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Free Consultation</span>
          <h1 className={styles.heroTitle}>Book Your Strategy <em>Session</em></h1>
          <p className={styles.heroDesc}>45 minutes with a senior Nexara consultant. No pitch, no obligation — just focused expertise on your specific challenge.</p>
          <div className={styles.heroBenefits}>
            {['Discuss your supply chain challenges', 'Get expert insights & quick wins', 'Understand our engagement approach', 'Completely free, no obligation'].map((b, i) => (
              <div key={i} className={styles.benefit}><CheckCircle size={14} style={{ color: '#10b981' }} /><span>{b}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className={styles.layout}>
            {/* Form */}
            <div className={styles.formCard}>
              <h3>Tell Us About Your Needs</h3>
              <p>Fill in the form and we'll match you with the right specialist.</p>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.formGrid}>
                <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Rajesh Kumar" /></div>
                <div className="form-group"><label className="form-label">Work Email *</label><input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="rajesh@company.com" /></div>
                <div className="form-group"><label className="form-label">Company Name *</label><input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Your Company Ltd" /></div>
                <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" /></div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Service Needed *</label>
                  <select className="form-input form-select" value={form.service} onChange={e => set('service', e.target.value)}>
                    <option value="">Select a service area</option>
                    {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Industry</label>
                  <select className="form-input form-select" value={form.industry} onChange={e => set('industry', e.target.value)}>
                    <option value="">Select industry</option>
                    {['Manufacturing', 'FMCG', 'Pharmaceuticals', 'Automotive', 'Retail', 'E-Commerce', 'Chemicals', 'Logistics', 'Construction', 'Other'].map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Preferred Date</label><input type="date" className="form-input" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Preferred Time Slot</label>
                  <div className={styles.timeGrid}>
                    {times.map(t => (
                      <button key={t} type="button" onClick={() => set('preferredTime', t)} className={`${styles.timeSlot} ${form.preferredTime === t ? styles.timeSlotActive : ''}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Describe Your Challenge *</label>
                  <textarea className="form-input" rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your current supply chain challenges, goals, or areas where you need expert guidance..." style={{ resize: 'vertical' }} />
                </div>
              </div>

              <button onClick={submit} disabled={loading} className="btn btn-primary" style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}>
                {loading ? <><span className="spinner" /> Submitting...</> : <>Book Free Consultation <ArrowRight size={16} /></>}
              </button>
            </div>

            {/* Info sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h4>What to Expect</h4>
                {[['Day 1', 'We review your submission and match you to the right specialist'],
                  ['24 hrs', 'A consultant contacts you to confirm the session'],
                  ['Session Day', '45-min focused discussion on your specific challenge'],
                  ['Follow-up', 'Summary document with key insights and next steps']
                ].map(([t, d]) => (
                  <div key={t} className={styles.expectItem}>
                    <div className={styles.expectTag}>{t}</div>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
              <div className={styles.sideCard}>
                <h4>Why Nexara</h4>
                {['15+ years of industry experience', 'Lean Six Sigma Black Belt certified', 'Served 50+ enterprise clients', 'Average 6-month payback period', 'ISO 9001:2015 certified practices'].map((p, i) => (
                  <div key={i} className={styles.proofItem}><CheckCircle size={14} style={{ color: '#10b981' }} /><span>{p}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
