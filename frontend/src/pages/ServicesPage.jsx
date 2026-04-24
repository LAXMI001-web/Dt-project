import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './ServicesPage.module.css';

const services = [
  {
    id: 'supply-chain', icon: '🔗', color: '#3b82f6',
    title: 'Supply Chain Management',
    tagline: 'Build resilient, agile, and cost-efficient supply chains',
    desc: 'End-to-end supply chain consulting from network design through performance management. We diagnose bottlenecks, design optimal flows, and implement sustainable improvements.',
    offerings: ['Supply chain network design & optimization', 'Risk assessment & resilience planning', 'S&OP (Sales & Operations Planning)', 'Supply chain digitization roadmap', 'KPI framework & performance dashboards', 'Global sourcing strategy'],
    outcomes: ['25-40% reduction in supply chain costs', 'Improved on-time delivery to 95%+', 'Reduced lead times by 30-50%'],
    caseStudy: { title: 'Reduced Supply Chain Costs by 38%', client: 'Mid-size auto parts manufacturer', result: '₹3.2 crore annual savings' },
  },
  {
    id: 'vendor-development', icon: '🤝', color: '#c9a84c',
    title: 'Vendor Development',
    tagline: 'Transform suppliers into strategic competitive assets',
    desc: 'Structured programs to identify, qualify, develop, and retain high-performance suppliers. We turn your supply base into a genuine competitive advantage.',
    offerings: ['Supplier segmentation & stratification', 'Vendor capability assessment (technical, financial, ESG)', 'Development roadmaps & capability building', 'Supplier scorecards & audit programs', 'Dual sourcing & risk mitigation', 'Supplier relationship management (SRM)'],
    outcomes: ['65% reduction in quality rejections', '30% improvement in supplier lead times', 'Built a certified supplier ecosystem'],
    caseStudy: { title: 'Developed 35 Strategic Suppliers', client: 'Automotive component manufacturer', result: '30% lead time improvement' },
  },
  {
    id: 'procurement', icon: '📋', color: '#10b981',
    title: 'Procurement & Purchase Strategy',
    tagline: 'Unlock 20-40% savings through strategic sourcing',
    desc: 'Category management, spend analytics, and strategic sourcing programs that systematically identify and capture savings while reducing supply risk.',
    offerings: ['Spend analysis & opportunity identification', 'Category strategy development', 'RFx (RFI/RFQ/RFP) management', 'Contract lifecycle management', 'Procurement process automation', 'Total Cost of Ownership (TCO) analysis'],
    outcomes: ['20-40% cost reduction in targeted categories', 'Reduced procurement cycle time by 60%', 'Improved contract compliance to 90%+'],
    caseStudy: { title: '₹8.5Cr Savings in Indirect Spend', client: 'FMCG company', result: '28% reduction in procurement costs' },
  },
  {
    id: 'six-sigma', icon: '⚙️', color: '#a855f7',
    title: 'Six Sigma & Process Excellence',
    tagline: 'Eliminate defects and build world-class quality',
    desc: 'Lean Six Sigma engagements using DMAIC methodology to systematically identify root causes, eliminate variation, and sustain quality improvements.',
    offerings: ['DMAIC project execution', 'Process mapping & value stream analysis', 'Statistical analysis & DOE', 'Control plan development', 'Green/Black Belt training & certification', 'Quality management system design'],
    outcomes: ['Defect rates reduced to <1%', 'Process capability (Cpk) improved 2x', 'Sigma level improved from 2σ to 4σ+'],
    caseStudy: { title: 'Defect Rate from 12% to 0.8%', client: 'Precision components manufacturer', result: '6-month DMAIC engagement' },
  },
  {
    id: 'logistics', icon: '🚚', color: '#f97316',
    title: 'Logistics & Distribution',
    tagline: 'Optimize your distribution network end-to-end',
    desc: 'From warehouse design to last-mile delivery, we architect logistics networks that are faster, cheaper, and more reliable than your competitors.',
    offerings: ['Distribution network design', 'Warehouse layout & operations optimization', 'Transportation management strategy', 'Last-mile delivery optimization', '3PL selection & management', 'Cold chain & specialized logistics'],
    outcomes: ['35% reduction in logistics costs', 'On-time delivery improved to 97%+', '20% improvement in warehouse productivity'],
    caseStudy: { title: 'Redesigned Pan-India Distribution', client: 'FMCG brand', result: '35% logistics cost reduction' },
  },
  {
    id: 'inventory', icon: '📦', color: '#06b6d4',
    title: 'Inventory Management',
    tagline: 'Free working capital locked in inventory',
    desc: 'Scientific inventory optimization using advanced analytics to eliminate excess stock while ensuring perfect service levels across your network.',
    offerings: ['ABC-XYZ classification & policy setting', 'Demand forecasting & planning', 'Safety stock & reorder point optimization', 'Slow-moving & obsolete (SLOB) clearance', 'Multi-echelon inventory optimization', 'Inventory management system implementation'],
    outcomes: ['25-40% reduction in inventory levels', '₹50L-₹5Cr working capital freed', 'Service fill rate maintained at 98%+'],
    caseStudy: { title: '₹2.8Cr Working Capital Released', client: 'Industrial goods distributor', result: '32% inventory reduction' },
  },
  {
    id: 'esg', icon: '🌿', color: '#10b981',
    title: 'ESG Advisory',
    tagline: 'Build a sustainable, future-proof business',
    desc: 'Comprehensive ESG strategy, reporting, and implementation services aligned to international frameworks. Helping you meet regulatory requirements and investor expectations.',
    offerings: ['ESG materiality assessment', 'BRSR & GRI sustainability reporting', 'Carbon footprint measurement & reduction', 'Green supply chain design', 'Supplier ESG screening', 'Science-based targets (SBTi) setting'],
    outcomes: ['ESG rating improved from C to A-', 'Carbon emissions reduced 30%+', 'Green financing enabled'],
    caseStudy: { title: 'Secured ₹50Cr Green Financing', client: 'Food processing company', result: 'ESG score improved by 40 points' },
  },
];

export default function ServicesPage({ serviceId }) {
  const service = serviceId ? services.find(s => s.id === serviceId) : null;

  if (service) {
    return (
      <div>
        <section className={styles.hero} style={{ background: `radial-gradient(ellipse at 70% 50%, ${service.color}12 0%, transparent 60%)` }}>
          <div className="container">
            <Link to="/services" className={styles.backLink}>← All Services</Link>
            <div className={styles.svcIcon} style={{ background: `${service.color}18`, border: `1px solid ${service.color}30` }}>
              <span style={{ fontSize: '2rem' }}>{service.icon}</span>
            </div>
            <span className="section-label">{service.title}</span>
            <h1 className={styles.heroTitle}>{service.tagline}</h1>
            <p className={styles.heroDesc}>{service.desc}</p>
            <Link to="/book-consultation" className="btn btn-primary">Get a Free Assessment <ArrowRight size={16} /></Link>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.detailGrid}>
              <div>
                <h2 className={styles.detailH2}>What We <em>Deliver</em></h2>
                <div className={styles.offeringList}>
                  {service.offerings.map((o, i) => (
                    <div key={i} className={styles.offeringItem}>
                      <CheckCircle size={16} style={{ color: service.color, flexShrink: 0 }} />
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className={styles.outcomeCard} style={{ borderColor: `${service.color}30` }}>
                  <h4 style={{ color: service.color }}>Typical Outcomes</h4>
                  {service.outcomes.map((o, i) => (
                    <div key={i} className={styles.outcome}><span style={{ color: service.color }}>✓</span> {o}</div>
                  ))}
                </div>
                <div className={styles.caseSnippet}>
                  <span className={styles.caseLabel}>Client Success</span>
                  <h4>{service.caseStudy.title}</h4>
                  <p>{service.caseStudy.client}</p>
                  <strong style={{ color: service.color }}>{service.caseStudy.result}</strong>
                  <Link to="/case-studies" className={styles.caseLink}>Read case study →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // All services listing
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Services Portfolio</span>
          <h1 className={styles.heroTitle}>Expert Consulting<br /><em>Across Every Dimension</em></h1>
          <p className={styles.heroDesc}>From supply chain strategy to ESG reporting — one firm, comprehensive expertise.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {services.map((s, i) => (
            <div key={s.id} className={`${styles.serviceRow} ${i % 2 !== 0 ? styles.serviceRowReverse : ''}`}>
              <div className={styles.serviceRowContent}>
                <div className={styles.svcIcon} style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                  <span style={{ fontSize: '2rem' }}>{s.icon}</span>
                </div>
                <h2 className={styles.rowTitle}>{s.title}</h2>
                <p className={styles.rowTagline} style={{ color: s.color }}>{s.tagline}</p>
                <p className={styles.rowDesc}>{s.desc}</p>
                <div className={styles.rowFeatures}>
                  {s.offerings.slice(0, 3).map((o, j) => (
                    <span key={j} className={styles.feature}>{o}</span>
                  ))}
                </div>
                <Link to={`/services/${s.id}`} className="btn btn-outline" style={{ marginTop: 24, borderColor: `${s.color}60`, color: s.color }}>
                  Explore {s.title} <ArrowRight size={16} />
                </Link>
              </div>
              <div className={styles.serviceRowMeta}>
                {s.outcomes.map((o, j) => (
                  <div key={j} className={styles.metricPill}>
                    <CheckCircle size={14} style={{ color: s.color }} /> {o}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
