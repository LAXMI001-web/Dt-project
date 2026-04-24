import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award, Users, Globe, ChevronDown, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './HomePage.module.css';

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 40, suffix: '%', label: 'Avg Cost Reduction' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Enterprise Clients' },
];

const services = [
  { icon: '🔗', title: 'Supply Chain Management', desc: 'End-to-end supply chain design, risk mitigation, and performance optimization for agile, resilient operations.', path: '/services/supply-chain', color: '#3b82f6' },
  { icon: '🤝', title: 'Vendor Development', desc: 'Strategic supplier selection, capability building, and relationship management to drive quality and value.', path: '/services/vendor-development', color: '#c9a84c' },
  { icon: '📋', title: 'Procurement & Purchasing', desc: 'Spend analytics, category management, and strategic sourcing to unlock 20–40% savings.', path: '/services/procurement', color: '#10b981' },
  { icon: '⚙️', title: 'Six Sigma & Process Excellence', desc: 'Data-driven DMAIC methodology to eliminate defects, reduce variation, and boost process capability.', path: '/services/six-sigma', color: '#a855f7' },
  { icon: '🚚', title: 'Logistics & Distribution', desc: 'Network design, route optimization, and last-mile excellence to cut delivery costs and time.', path: '/services/logistics', color: '#f97316' },
  { icon: '📦', title: 'Inventory Management', desc: 'ABC-XYZ analysis, safety stock modeling, and demand forecasting to free up working capital.', path: '/services/inventory', color: '#06b6d4' },
  { icon: '🌿', title: 'ESG Advisory', desc: 'Sustainability frameworks, ESG reporting, and green supply chain strategies aligned to global standards.', path: '/services/esg', color: '#10b981' },
];

const industries = [
  { name: 'Manufacturing', icon: '🏭', clients: '25+' },
  { name: 'FMCG & Retail', icon: '🛒', clients: '18+' },
  { name: 'Pharmaceuticals', icon: '💊', clients: '12+' },
  { name: 'Automotive', icon: '🚗', clients: '10+' },
  { name: 'Chemicals', icon: '⚗️', clients: '8+' },
  { name: 'E-Commerce', icon: '📱', clients: '15+' },
];

const testimonials = [
  { quote: "Nexara's supply chain redesign saved us ₹4.2 crore annually. Their Six Sigma team reduced our defect rate from 8% to under 1% in just 5 months.", author: 'Ramesh Iyer', title: 'VP Operations, PrecisionParts Ltd', rating: 5 },
  { quote: "The ESG roadmap Nexara built for us helped us secure a ₹50 crore green financing facility. Their practical approach made sustainability tangible.", author: 'Kavitha Menon', title: 'CFO, EcoFresh Foods', rating: 5 },
  { quote: "Their vendor development program transformed our 35 tier-1 suppliers. Lead times reduced by 30% and quality rejections dropped by 65%.", author: 'Suresh Patil', title: 'Head of Procurement, AutoDrive India', rating: 5 },
];

function CountUp({ end, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              ISO 9001:2015 Certified Consultancy
            </div>
            <h1 className={styles.heroTitle}>
              Engineering<br />
              <span className="text-gold">Supply Chain</span><br />
              Excellence
            </h1>
            <p className={styles.heroDesc}>
              Nexara Consulting partners with manufacturers, FMCG leaders, and enterprises
              to build resilient supply chains, develop strategic vendors, and achieve measurable
              ESG outcomes — turning operational complexity into competitive advantage.
            </p>
            <div className={styles.heroCTA}>
              <Link to="/book-consultation" className="btn btn-primary">
                Book a Free Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/case-studies" className="btn btn-outline">
                View Case Studies
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <span>Trusted by:</span>
              {['Manufacturing', 'FMCG', 'Pharma', 'Automotive', 'E-Commerce'].map(i => (
                <span key={i} className={styles.trustPill}>{i}</span>
              ))}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardDot} style={{ background: '#ef4444' }} />
                <span className={styles.cardDot} style={{ background: '#f59e0b' }} />
                <span className={styles.cardDot} style={{ background: '#10b981' }} />
                <span className={styles.cardTitle}>Supply Chain Health Score</span>
              </div>
              <div className={styles.cardBody}>
                {[
                  { label: 'Procurement Efficiency', value: 87, color: '#c9a84c' },
                  { label: 'Vendor Performance', value: 73, color: '#3b82f6' },
                  { label: 'Inventory Optimization', value: 91, color: '#10b981' },
                  { label: 'ESG Compliance', value: 64, color: '#a855f7' },
                ].map(item => (
                  <div key={item.label} className={styles.scoreRow}>
                    <div className={styles.scoreLabel}>{item.label}</div>
                    <div className={styles.scoreBar}>
                      <div className={styles.scoreTrack}>
                        <div className={styles.scoreFill} style={{ width: `${item.value}%`, background: item.color }} />
                      </div>
                      <span className={styles.scoreVal}>{item.value}%</span>
                    </div>
                  </div>
                ))}
                <div className={styles.cardFooter}>
                  <CheckCircle size={14} style={{ color: '#10b981' }} />
                  <span>Assessment completed — 3 critical improvements identified</span>
                </div>
              </div>
            </div>
            <div className={styles.floatCard1}>
              <TrendingUp size={18} style={{ color: '#10b981' }} />
              <div><strong>+35%</strong><span>Efficiency Gain</span></div>
            </div>
            <div className={styles.floatCard2}>
              <Award size={18} style={{ color: '#c9a84c' }} />
              <div><strong>Six Sigma</strong><span>Black Belt Team</span></div>
            </div>
          </div>
        </div>
        <a href="#services" className={styles.scrollHint}>
          <span>Explore Services</span>
          <ChevronDown size={18} />
        </a>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}><CountUp end={s.value} suffix={s.suffix} /></div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={`section ${styles.servicesSection}`} id="services">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What We Do</span>
            <h2>Comprehensive Consulting<br /><em>Services Portfolio</em></h2>
            <p>From strategy to execution, we bring domain expertise across every dimension of supply chain and operations management.</p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <Link to={svc.path} key={i} className={styles.serviceCard}>
                <div className={styles.svcIcon} style={{ background: `${svc.color}18`, border: `1px solid ${svc.color}30` }}>
                  <span style={{ fontSize: '1.6rem' }}>{svc.icon}</span>
                </div>
                <h4 className={styles.svcTitle}>{svc.title}</h4>
                <p className={styles.svcDesc}>{svc.desc}</p>
                <div className={styles.svcLink} style={{ color: svc.color }}>
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/services" className="btn btn-outline">View All Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Why Nexara */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className={styles.whyGrid}>
            <div className={styles.whyLeft}>
              <span className="section-label">Why Nexara</span>
              <h2>The Nexara Difference</h2>
              <p>We don't just advise — we embed with your teams, build capabilities, and deliver measurable outcomes tied to your bottom line.</p>
              <div className={styles.whyPoints}>
                {[
                  ['Outcome-Based Engagements', 'We tie our fees to measurable results — savings, efficiency, or quality improvements.'],
                  ['Industry-Specific Expertise', 'Deep domain knowledge across manufacturing, FMCG, pharma, and more.'],
                  ['Technology-Enabled', 'Data analytics, digital tools, and AI-assisted assessments.'],
                  ['Certified Professionals', 'Lean Six Sigma Black Belts, Certified SCM professionals, and ESG specialists.'],
                ].map(([title, desc], i) => (
                  <div key={i} className={styles.whyPoint}>
                    <div className={styles.whyCheck}><CheckCircle size={16} /></div>
                    <div><strong>{title}</strong><p>{desc}</p></div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: 32 }}>
                About Our Team <ArrowRight size={16} />
              </Link>
            </div>
            <div className={styles.whyRight}>
              <div className={styles.metricCards}>
                {[
                  { val: '₹180Cr+', label: 'Cost Savings Generated', icon: '💰' },
                  { val: '98%', label: 'Client Retention Rate', icon: '🏆' },
                  { val: '6mo', label: 'Avg Payback Period', icon: '⚡' },
                  { val: 'NPS 72', label: 'Net Promoter Score', icon: '⭐' },
                ].map((m, i) => (
                  <div key={i} className={styles.metricCard}>
                    <span className={styles.metricIcon}>{m.icon}</span>
                    <div className={styles.metricVal}>{m.val}</div>
                    <div className={styles.metricLabel}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className={`section ${styles.industrySection}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Industries We Serve</span>
            <h2>Sector-Specific <em>Solutions</em></h2>
          </div>
          <div className={styles.industryGrid}>
            {industries.map((ind, i) => (
              <Link to={`/industries#${ind.name.toLowerCase()}`} key={i} className={styles.industryCard}>
                <span className={styles.indIcon}>{ind.icon}</span>
                <h4 className={styles.indName}>{ind.name}</h4>
                <span className="tag">{ind.clients} clients</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.testimonialSection}`}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Client Success</span>
            <h2>What Our Clients Say</h2>
          </div>
          <div className={styles.testimonialGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <div className={styles.stars}>{'★'.repeat(t.rating)}</div>
                <p className={styles.tQuote}>"{t.quote}"</p>
                <div className={styles.tAuthor}>
                  <div className={styles.tAvatar}>{t.author[0]}</div>
                  <div>
                    <strong className={styles.tName}>{t.author}</strong>
                    <span className={styles.tTitle}>{t.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBg} />
        <div className="container">
          <div className={styles.ctaContent}>
            <span className="section-label">Start Today</span>
            <h2>Ready to Transform Your<br /><em>Supply Chain?</em></h2>
            <p>Book a free 45-minute strategy session with a senior Nexara consultant. No obligation, pure value.</p>
            <div className={styles.ctaButtons}>
              <Link to="/book-consultation" className="btn btn-primary">
                Book Free Consultation <ArrowRight size={16} />
              </Link>
              <Link to="/esg-calculator" className="btn btn-outline">
                Try ESG Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
