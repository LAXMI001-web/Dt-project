import { useState } from 'react';
import { esgAPI } from '../api';
import { ArrowRight, ArrowLeft, Leaf, Users, Shield, BarChart3 } from 'lucide-react';
import styles from './ESGCalculatorPage.module.css';

const steps = [
  { title: 'Company Profile', icon: <BarChart3 size={20} /> },
  { title: 'Environmental', icon: <Leaf size={20} /> },
  { title: 'Social', icon: <Users size={20} /> },
  { title: 'Governance', icon: <Shield size={20} /> },
];

const initialForm = {
  company: '', industry: '', employees: '',
  energyConsumption: '', renewableEnergyPct: '', wasteGenerated: '', waterUsage: '', carbonEmissions: '',
  localHiringPct: '', trainingHoursPerEmployee: '', diversityRatio: '', safetyIncidents: '',
  boardDiversityPct: '', auditFrequency: 'annual', codeOfConductExists: false, supplierScreeningPct: '',
  email: '',
};

function ScoreRing({ score, color, label }) {
  const r = 54; const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className={styles.ring}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 65 65)" style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)' }} />
        <text x="65" y="60" textAnchor="middle" fill="#ffffff" fontSize="22" fontFamily="Cormorant Garamond" fontWeight="600">{score}</text>
        <text x="65" y="78" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="DM Sans">/100</text>
      </svg>
      <span className={styles.ringLabel} style={{ color }}>{label}</span>
    </div>
  );
}

export default function ESGCalculatorPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const num = (k, v) => set(k, v === '' ? '' : Number(v));

  const submit = async () => {
    setLoading(true); setError('');
    try {
      const payload = { ...form };
      Object.keys(payload).forEach(k => { if (payload[k] === '') payload[k] = 0; });
      const res = await esgAPI.calculate(payload);
      setResult(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Calculation failed. Please try again.');
    } finally { setLoading(false); }
  };

  const maturityColor = { 'ESG Leader': '#10b981', 'ESG Performer': '#3b82f6', 'ESG Developer': '#c9a84c', 'ESG Initiator': '#f97316', 'ESG Beginner': '#ef4444' };

  if (result) {
    const s = result.scores;
    const mc = maturityColor[s.maturityLevel] || '#c9a84c';
    return (
      <div>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.resultHeader}>
              <Leaf size={32} style={{ color: '#10b981' }} />
              <h1>Your ESG Assessment Results</h1>
              <p>{form.company} · {form.industry}</p>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className={styles.resultGrid}>
              <div>
                {/* Overall */}
                <div className={styles.overallCard} style={{ borderColor: `${mc}40` }}>
                  <div className={styles.overallLeft}>
                    <ScoreRing score={s.total} color={mc} label="Overall ESG" />
                  </div>
                  <div className={styles.overallRight}>
                    <span className={styles.maturityBadge} style={{ background: `${mc}20`, color: mc, borderColor: `${mc}40` }}>{s.maturityLevel}</span>
                    <h2 style={{ fontSize: '1.8rem', margin: '12px 0' }}>ESG Score: {s.total}/100</h2>
                    <p style={{ color: '#64748b' }}>Your company is classified as an <strong style={{ color: mc }}>{s.maturityLevel}</strong> based on Environmental, Social, and Governance metrics.</p>
                  </div>
                </div>
                {/* Sub scores */}
                <div className={styles.subScores}>
                  <ScoreRing score={s.envScore} color="#10b981" label="Environmental" />
                  <ScoreRing score={s.socialScore} color="#3b82f6" label="Social" />
                  <ScoreRing score={s.govScore} color="#a855f7" label="Governance" />
                </div>
              </div>
              <div>
                <h3 className={styles.recoTitle}>Priority Recommendations</h3>
                {result.assessment.recommendations.map((r, i) => (
                  <div key={i} className={styles.recoItem}>
                    <span className={styles.recoNum}>{i + 1}</span>
                    <p>{r}</p>
                  </div>
                ))}
                <div className={styles.ctaBox}>
                  <h4>Get a Full ESG Roadmap</h4>
                  <p>Our ESG consultants can build a detailed 12-month improvement plan with specific initiatives, timelines, and expected score improvements.</p>
                  <a href="/book-consultation" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                    Book ESG Consultation <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <button onClick={() => { setResult(null); setStep(0); setForm(initialForm); }} className="btn btn-outline">
                Run Another Assessment
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">ESG Performance Tool</span>
          <h1 className={styles.heroTitle}>ESG Readiness <em>Calculator</em></h1>
          <p className={styles.heroDesc}>Answer 20 questions to get your Environmental, Social & Governance score with actionable recommendations from our ESG experts.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          {/* Stepper */}
          <div className={styles.stepper}>
            {steps.map((s, i) => (
              <div key={i} className={`${styles.stepItem} ${i === step ? styles.stepActive : i < step ? styles.stepDone : ''}`}>
                <div className={styles.stepCircle}>{i < step ? '✓' : s.icon}</div>
                <span>{s.title}</span>
                {i < steps.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
              </div>
            ))}
          </div>

          <div className={styles.formCard}>
            {step === 0 && (
              <div className={styles.formStep}>
                <h3>Company Profile</h3>
                <p>Basic information about your organization.</p>
                <div className={styles.formGrid}>
                  <div className="form-group"><label className="form-label">Company Name *</label><input className="form-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="e.g. Acme Manufacturing Ltd" /></div>
                  <div className="form-group"><label className="form-label">Industry *</label>
                    <select className="form-input form-select" value={form.industry} onChange={e => set('industry', e.target.value)}>
                      <option value="">Select industry</option>
                      {['Manufacturing', 'FMCG', 'Pharmaceuticals', 'Automotive', 'Chemicals', 'Retail', 'Logistics', 'Construction', 'Food & Beverage', 'Textile'].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Number of Employees *</label><input type="number" className="form-input" value={form.employees} onChange={e => num('employees', e.target.value)} placeholder="e.g. 500" /></div>
                  <div className="form-group"><label className="form-label">Your Email (optional)</label><input type="email" className="form-input" value={form.email} onChange={e => set('email', e.target.value)} placeholder="For receiving your report" /></div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className={styles.formStep}>
                <div className={styles.stepHeader}><Leaf size={24} style={{ color: '#10b981' }} /><h3>Environmental Metrics</h3></div>
                <div className={styles.formGrid}>
                  <div className="form-group"><label className="form-label">Annual Energy Consumption (kWh)</label><input type="number" className="form-input" value={form.energyConsumption} onChange={e => num('energyConsumption', e.target.value)} placeholder="e.g. 500000" /></div>
                  <div className="form-group"><label className="form-label">Renewable Energy % of Total</label><input type="number" min="0" max="100" className="form-input" value={form.renewableEnergyPct} onChange={e => num('renewableEnergyPct', e.target.value)} placeholder="e.g. 15" /></div>
                  <div className="form-group"><label className="form-label">Waste Generated (tonnes/year)</label><input type="number" className="form-input" value={form.wasteGenerated} onChange={e => num('wasteGenerated', e.target.value)} placeholder="e.g. 50" /></div>
                  <div className="form-group"><label className="form-label">Water Usage (litres/year)</label><input type="number" className="form-input" value={form.waterUsage} onChange={e => num('waterUsage', e.target.value)} placeholder="e.g. 1000000" /></div>
                  <div className="form-group"><label className="form-label">Carbon Emissions (tonnes CO₂/year)</label><input type="number" className="form-input" value={form.carbonEmissions} onChange={e => num('carbonEmissions', e.target.value)} placeholder="e.g. 200" /></div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.formStep}>
                <div className={styles.stepHeader}><Users size={24} style={{ color: '#3b82f6' }} /><h3>Social Metrics</h3></div>
                <div className={styles.formGrid}>
                  <div className="form-group"><label className="form-label">Local Hiring % (within region)</label><input type="number" min="0" max="100" className="form-input" value={form.localHiringPct} onChange={e => num('localHiringPct', e.target.value)} placeholder="e.g. 70" /></div>
                  <div className="form-group"><label className="form-label">Training Hours Per Employee/Year</label><input type="number" className="form-input" value={form.trainingHoursPerEmployee} onChange={e => num('trainingHoursPerEmployee', e.target.value)} placeholder="e.g. 24" /></div>
                  <div className="form-group"><label className="form-label">Gender Diversity Ratio (%)</label><input type="number" min="0" max="100" className="form-input" value={form.diversityRatio} onChange={e => num('diversityRatio', e.target.value)} placeholder="e.g. 28" /></div>
                  <div className="form-group"><label className="form-label">Safety Incidents (last year)</label><input type="number" className="form-input" value={form.safetyIncidents} onChange={e => num('safetyIncidents', e.target.value)} placeholder="e.g. 2" /></div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className={styles.formStep}>
                <div className={styles.stepHeader}><Shield size={24} style={{ color: '#a855f7' }} /><h3>Governance Metrics</h3></div>
                <div className={styles.formGrid}>
                  <div className="form-group"><label className="form-label">Board Diversity % (women/minority)</label><input type="number" min="0" max="100" className="form-input" value={form.boardDiversityPct} onChange={e => num('boardDiversityPct', e.target.value)} placeholder="e.g. 25" /></div>
                  <div className="form-group"><label className="form-label">Audit Frequency</label>
                    <select className="form-input form-select" value={form.auditFrequency} onChange={e => set('auditFrequency', e.target.value)}>
                      <option value="annual">Annual</option><option value="biannual">Bi-annual</option><option value="quarterly">Quarterly</option><option value="none">None</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Code of Conduct Exists?</label>
                    <select className="form-input form-select" value={form.codeOfConductExists ? 'yes' : 'no'} onChange={e => set('codeOfConductExists', e.target.value === 'yes')}>
                      <option value="yes">Yes</option><option value="no">No</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Supplier ESG Screening (%)</label><input type="number" min="0" max="100" className="form-input" value={form.supplierScreeningPct} onChange={e => num('supplierScreeningPct', e.target.value)} placeholder="e.g. 40" /></div>
                </div>
              </div>
            )}

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formActions}>
              {step > 0 && <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}><ArrowLeft size={16} /> Previous</button>}
              <div style={{ flex: 1 }} />
              {step < 3
                ? <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>Next Step <ArrowRight size={16} /></button>
                : <button className="btn btn-primary" onClick={submit} disabled={loading}>
                    {loading ? <><span className="spinner" /> Calculating...</> : <>Calculate ESG Score <BarChart3 size={16} /></>}
                  </button>
              }
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
