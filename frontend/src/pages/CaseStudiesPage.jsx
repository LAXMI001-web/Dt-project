import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Building } from 'lucide-react';
import styles from './CaseStudiesPage.module.css';

const cases = [
  {
    id: 1, slug: 'precision-parts-six-sigma',
    title: 'Reducing Defect Rate from 12% to 0.8% Using Six Sigma DMAIC',
    client: 'PrecisionParts Ltd', industry: 'Automotive Components',
    service: 'Six Sigma', color: '#a855f7',
    challenge: 'A Pune-based precision component manufacturer supplying to Tier-1 auto OEMs had a 12% defect rate causing ₹1.2 crore in monthly rework costs and threatening key contracts.',
    approach: 'We deployed a Six Sigma Black Belt team using the DMAIC framework. Root cause analysis identified 3 critical process variables in the CNC machining center. A full DOE (Design of Experiments) was conducted to optimize cutting parameters.',
    results: ['Defect rate reduced from 12% to 0.8% in 5 months', '₹1.1 crore/month rework cost eliminated', 'Process Sigma improved from 2.1σ to 4.3σ', 'Customer satisfaction score (CSAT) rose from 6.2 to 9.1/10', 'Key OEM contract renewed and expanded by 40%'],
    duration: '5 months', savings: '₹13.2 Cr/year', team: '4 consultants'
  },
  {
    id: 2, slug: 'ecofresh-esg-green-finance',
    title: 'Securing ₹50 Crore Green Financing Through ESG Transformation',
    client: 'EcoFresh Foods Pvt Ltd', industry: 'FMCG / Food Processing',
    service: 'ESG Advisory', color: '#10b981',
    challenge: 'A fast-growing food company needed green financing for expansion but had no formal ESG framework, poor data infrastructure, and no sustainability reporting history.',
    approach: 'Nexara conducted a full ESG materiality assessment, built a BRSR-compliant reporting framework, and developed a Science-Based Targets (SBTi) aligned emission reduction plan. Green supply chain guidelines were implemented across 120 suppliers.',
    results: ['ESG score improved from 34 to 76/100 in 12 months', '₹50 crore green bond successfully issued at 75bps premium', 'Carbon emissions reduced by 28% through energy initiatives', 'GRI Standards sustainability report published', '120 suppliers ESG-screened and 28 developed'],
    duration: '12 months', savings: '₹3.75 Cr/year energy savings', team: '3 consultants'
  },
  {
    id: 3, slug: 'autodrive-vendor-development',
    title: 'Transforming 35 Tier-1 Suppliers for Automotive Excellence',
    client: 'AutoDrive India', industry: 'Automotive Manufacturing',
    service: 'Vendor Development', color: '#c9a84c',
    challenge: 'Frequent production stoppages due to inconsistent supplier quality and delivery performance. 18% of parts arriving with quality issues. 6 critical suppliers at risk of contract termination.',
    approach: 'Nexara implemented a structured 3-phase supplier development program: Assessment → Development → Certification. Each supplier received customized development plans, on-site technical support, and monthly review cadences.',
    results: ['Quality rejection rate dropped 65% (18% to 6.3%)', 'On-time delivery improved from 71% to 93%', '35 suppliers assessed, 28 developed, 15 certified', 'Production stoppages reduced by 80%', 'Procurement cost reduced by 8% through supplier efficiency'],
    duration: '18 months', savings: '₹4.8 Cr/year', team: '6 consultants'
  },
  {
    id: 4, slug: 'fastmart-supply-chain-transformation',
    title: 'End-to-End Supply Chain Redesign Cutting Costs by 38%',
    client: 'FastMart Retail', industry: 'Retail / E-Commerce',
    service: 'Supply Chain Management', color: '#3b82f6',
    challenge: 'A multi-city retailer with 200+ stores had inventory locked in inefficient distribution centers, high stock-out rates (22%), and logistics costs consuming 14% of revenue.',
    approach: 'Full supply chain diagnostic followed by network redesign. Implemented hub-and-spoke distribution, demand-driven replenishment, and an integrated S&OP process. Renegotiated 3PL contracts using competitive benchmarking.',
    results: ['Total supply chain cost reduced by 38%', 'Inventory levels reduced by ₹18 crore (freed working capital)', 'Stock-out rate dropped from 22% to 4%', 'Logistics cost as % of revenue fell from 14% to 8.7%', 'On-shelf availability improved to 97.2%'],
    duration: '9 months', savings: '₹22 Cr/year', team: '8 consultants'
  },
  {
    id: 5, slug: 'pharma-inventory-optimization',
    title: 'Freeing ₹28 Crore Working Capital Through Inventory Optimization',
    client: 'MedCore Pharmaceuticals', industry: 'Pharmaceuticals',
    service: 'Inventory Management', color: '#06b6d4',
    challenge: 'A pharma distributor had ₹85 crore locked in inventory — 40% excess/slow-moving. High carrying costs, frequent expiry write-offs, and working capital constraints.',
    approach: 'Applied ABC-XYZ inventory classification across 4,200 SKUs. Implemented demand-driven replenishment policies, optimized safety stock calculations using statistical models, and designed a SLOB disposal program.',
    results: ['₹28 crore working capital released in 6 months', 'Inventory days-on-hand reduced from 94 to 61 days', 'Expiry write-offs reduced by 72%', 'Service fill rate maintained at 98.7%', 'Annual carrying cost savings of ₹7 crore'],
    duration: '6 months', savings: '₹35 Cr total impact', team: '3 consultants'
  },
  {
    id: 6, slug: 'buildfast-procurement-savings',
    title: '₹8.5 Crore Procurement Savings Through Strategic Sourcing',
    client: 'BuildFast Construction', industry: 'Construction & Infrastructure',
    service: 'Procurement Strategy', color: '#f97316',
    challenge: 'Fragmented procurement across 15 project sites with no category management, excessive maverick buying (40%), and no visibility into total spend.',
    approach: 'Consolidated spend data across all sites (₹320 crore total spend). Identified top 10 categories representing 78% of spend. Ran structured strategic sourcing events with competitive bidding, resulting in new framework agreements.',
    results: ['₹8.5 crore annual savings (2.7% of total spend)', 'Maverick buying reduced from 40% to 9%', 'Supplier base rationalized from 480 to 180 vendors', 'Contract coverage increased from 30% to 82%', 'Procurement team trained and capability built'],
    duration: '8 months', savings: '₹8.5 Cr/year', team: '4 consultants'
  },
];

const filters = ['All', 'Supply Chain Management', 'Six Sigma', 'ESG Advisory', 'Vendor Development', 'Inventory Management', 'Procurement Strategy'];

export default function CaseStudiesPage() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = active === 'All' ? cases : cases.filter(c => c.service === active);

  if (selected) {
    const c = cases.find(x => x.id === selected);
    return (
      <div>
        <section className={styles.hero} style={{ background: `radial-gradient(ellipse at 70% 40%, ${c.color}12 0%, transparent 60%)` }}>
          <div className="container">
            <button onClick={() => setSelected(null)} className={styles.backLink}>← All Case Studies</button>
            <span className="tag" style={{ marginBottom: 16 }}>{c.service}</span>
            <h1 className={styles.caseTitle}>{c.title}</h1>
            <div className={styles.caseMeta}>
              <span><Building size={14} /> {c.client}</span>
              <span><Clock size={14} /> {c.duration}</span>
              <span><TrendingUp size={14} /> {c.savings}</span>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className={styles.caseBody}>
              <div>
                <div className={styles.caseSection}>
                  <h3>The Challenge</h3>
                  <p>{c.challenge}</p>
                </div>
                <div className={styles.caseSection}>
                  <h3>Our Approach</h3>
                  <p>{c.approach}</p>
                </div>
                <div className={styles.caseSection}>
                  <h3>Results Delivered</h3>
                  <div className={styles.resultsList}>
                    {c.results.map((r, i) => (
                      <div key={i} className={styles.resultItem} style={{ borderLeftColor: c.color }}>
                        <TrendingUp size={14} style={{ color: c.color }} />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.metaCard}>
                  <div className={styles.metaRow}><span>Client</span><strong>{c.client}</strong></div>
                  <div className={styles.metaRow}><span>Industry</span><strong>{c.industry}</strong></div>
                  <div className={styles.metaRow}><span>Service</span><strong>{c.service}</strong></div>
                  <div className={styles.metaRow}><span>Duration</span><strong>{c.duration}</strong></div>
                  <div className={styles.metaRow}><span>Team Size</span><strong>{c.team}</strong></div>
                  <div className={`${styles.metaRow} ${styles.impact}`}>
                    <span>Total Impact</span><strong style={{ color: c.color }}>{c.savings}</strong>
                  </div>
                </div>
                <Link to="/book-consultation" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
                  Discuss Your Project <ArrowRight size={16} />
                </Link>
              </div>
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
          <span className="section-label">Proven Results</span>
          <h1 className={styles.heroTitle}>Client Success <em>Stories</em></h1>
          <p className={styles.heroDesc}>Real transformations. Measurable outcomes. Lasting impact across industries.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.filters}>
            {filters.map(f => (
              <button key={f} onClick={() => setActive(f)} className={`${styles.filter} ${active === f ? styles.filterActive : ''}`}>{f}</button>
            ))}
          </div>
          <div className={styles.grid}>
            {filtered.map(c => (
              <div key={c.id} className={styles.card} onClick={() => setSelected(c.id)}>
                <div className={styles.cardTop}>
                  <span className="tag">{c.service}</span>
                  <span className={styles.industry}>{c.industry}</span>
                </div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardDesc}>{c.challenge.substring(0, 120)}...</p>
                <div className={styles.cardStats}>
                  <div className={styles.stat}><TrendingUp size={14} style={{ color: c.color }} /><span>{c.savings}</span></div>
                  <div className={styles.stat}><Clock size={14} style={{ color: '#64748b' }} /><span>{c.duration}</span></div>
                </div>
                <div className={styles.cardCTA} style={{ color: c.color }}>Read Full Case Study <ArrowRight size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
