import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { consultationAPI, esgAPI } from '../api';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Leaf, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css';

const statusIcon = { pending: <AlertCircle size={14} style={{ color: '#f59e0b' }} />, confirmed: <CheckCircle size={14} style={{ color: '#3b82f6' }} />, completed: <CheckCircle size={14} style={{ color: '#10b981' }} />, cancelled: <XCircle size={14} style={{ color: '#ef4444' }} /> };
const statusColor = { pending: '#f59e0b', confirmed: '#3b82f6', completed: '#10b981', cancelled: '#ef4444' };

const serviceLabels = { 'supply-chain': 'Supply Chain', 'vendor-development': 'Vendor Development', 'procurement': 'Procurement', 'six-sigma': 'Six Sigma', 'logistics': 'Logistics', 'inventory': 'Inventory', 'esg': 'ESG Advisory', 'general': 'General' };

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [consultations, setConsultations] = useState([]);
  const [esgHistory, setEsgHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const load = async () => {
      try {
        const [cRes, eRes] = await Promise.all([consultationAPI.getMy(), esgAPI.getMy()]);
        setConsultations(cRes.data.consultations || []);
        setEsgHistory(eRes.data.assessments || []);
      } catch {}
      finally { setLoading(false); }
    };
    load();
  }, [user]);

  if (!user) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'consultations', label: 'My Consultations' },
    { id: 'esg', label: 'ESG History' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div className={styles.sideTop}>
          <Link to="/" className={styles.logo}>
            <div className={styles.logoMark}>N</div>
            <span>NEXARA</span>
          </Link>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.name[0]}</div>
            <div>
              <strong className={styles.userName}>{user.name}</strong>
              <span className={styles.userCompany}>{user.company || 'No company'}</span>
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`${styles.navItem} ${activeTab === t.id ? styles.navActive : ''}`}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className={styles.sideBottom}>
          <Link to="/book-consultation" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '12px 16px' }}>
            Book Consultation
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>Sign Out</button>
        </div>
      </div>

      <main className={styles.main}>
        {activeTab === 'overview' && (
          <div>
            <h2 className={styles.pageTitle}>Welcome back, {user.name.split(' ')[0]}</h2>
            <p style={{ color: '#64748b', marginBottom: 32 }}>Here's a summary of your Nexara engagement.</p>
            <div className={styles.statCards}>
              <div className={styles.statCard}><div className={styles.statN}>{consultations.length}</div><div className={styles.statL}>Total Consultations</div></div>
              <div className={styles.statCard}><div className={styles.statN}>{consultations.filter(c => c.status === 'completed').length}</div><div className={styles.statL}>Completed</div></div>
              <div className={styles.statCard}><div className={styles.statN}>{consultations.filter(c => c.status === 'pending').length}</div><div className={styles.statL}>Pending</div></div>
              <div className={styles.statCard}><div className={styles.statN}>{esgHistory.length}</div><div className={styles.statL}>ESG Assessments</div></div>
            </div>
            {consultations.length === 0 && (
              <div className={styles.emptyCard}>
                <Calendar size={40} style={{ color: '#475569', marginBottom: 16 }} />
                <h3>No consultations yet</h3>
                <p>Book your first free strategy session with a Nexara specialist.</p>
                <Link to="/book-consultation" className="btn btn-primary" style={{ marginTop: 20 }}>Book Now <ArrowRight size={16} /></Link>
              </div>
            )}
            {consultations.slice(0, 3).map(c => (
              <div key={c._id} className={styles.consultCard}>
                <div className={styles.consultTop}>
                  <span className={styles.consultService}>{serviceLabels[c.service] || c.service}</span>
                  <span className={styles.consultStatus} style={{ color: statusColor[c.status] }}>
                    {statusIcon[c.status]} {c.status}
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '8px 0' }}>{c.message?.substring(0, 100)}...</p>
                <div className={styles.consultMeta}>
                  {c.preferredDate && <span><Calendar size={13} /> {new Date(c.preferredDate).toLocaleDateString('en-IN')}</span>}
                  {c.preferredTime && <span><Clock size={13} /> {c.preferredTime}</span>}
                  <span>Booked {new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
                {c.meetingLink && <a href={c.meetingLink} target="_blank" rel="noreferrer" className={styles.meetLink}>Join Meeting →</a>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'consultations' && (
          <div>
            <h2 className={styles.pageTitle}>My Consultations</h2>
            {loading ? <div className={styles.loading}><span className="spinner" /></div> :
              consultations.length === 0 ? (
                <div className={styles.emptyCard}><p>No consultations booked yet.</p><Link to="/book-consultation" className="btn btn-primary" style={{ marginTop: 16 }}>Book Now</Link></div>
              ) : consultations.map(c => (
                <div key={c._id} className={styles.consultCard}>
                  <div className={styles.consultTop}>
                    <strong>{serviceLabels[c.service] || c.service}</strong>
                    <span style={{ color: statusColor[c.status], display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>{statusIcon[c.status]} {c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '10px 0' }}>{c.message}</p>
                  {c.consultantNotes && <div className={styles.notes}><strong>Consultant Notes:</strong> {c.consultantNotes}</div>}
                  <div className={styles.consultMeta}>
                    {c.preferredDate && <span><Calendar size={12} /> {new Date(c.preferredDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
                    {c.preferredTime && <span><Clock size={12} /> {c.preferredTime}</span>}
                  </div>
                  {c.meetingLink && <a href={c.meetingLink} target="_blank" rel="noreferrer" className={styles.meetLink}>Join Meeting →</a>}
                </div>
              ))
            }
          </div>
        )}

        {activeTab === 'esg' && (
          <div>
            <h2 className={styles.pageTitle}>ESG Assessment History</h2>
            {esgHistory.length === 0 ? (
              <div className={styles.emptyCard}>
                <Leaf size={40} style={{ color: '#475569', marginBottom: 16 }} />
                <p>No ESG assessments yet.</p>
                <Link to="/esg-calculator" className="btn btn-primary" style={{ marginTop: 16 }}>Take Assessment</Link>
              </div>
            ) : esgHistory.map(a => (
              <div key={a._id} className={styles.esgCard}>
                <div className={styles.esgTop}>
                  <strong>{a.company}</strong>
                  <span className={styles.esgScore}>{a.totalESGScore}/100</span>
                </div>
                <div className={styles.esgBars}>
                  {[['Environmental', a.environmentalScore, '#10b981'], ['Social', a.socialScore, '#3b82f6'], ['Governance', a.governanceScore, '#a855f7']].map(([l, v, c]) => (
                    <div key={l} className={styles.esgBar}>
                      <span>{l}</span>
                      <div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${v}%`, background: c }} /></div>
                      <span style={{ color: c }}>{v}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{new Date(a.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className={styles.pageTitle}>My Profile</h2>
            <div className={styles.profileCard}>
              <div className={styles.profileAvatar}>{user.name[0]}</div>
              <div className={styles.profileGrid}>
                <div><label>Name</label><p>{user.name}</p></div>
                <div><label>Email</label><p>{user.email}</p></div>
                <div><label>Company</label><p>{user.company || '—'}</p></div>
                <div><label>Industry</label><p>{user.industry || '—'}</p></div>
                <div><label>Phone</label><p>{user.phone || '—'}</p></div>
                <div><label>Account Type</label><p style={{ color: '#c9a84c', textTransform: 'capitalize' }}>{user.role}</p></div>
              </div>
              <Link to="/book-consultation" className="btn btn-outline" style={{ marginTop: 24 }}>
                Book a New Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
