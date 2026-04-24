import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './IndustriesPage.module.css';

const industries = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    icon: '🏭',
    color: '#3b82f6',
    tagline: 'From shop floor to supply chain — end-to-end operational excellence',
    desc: 'Manufacturing companies face intense pressure to reduce costs, improve quality, and respond to volatile demand. Nexara brings Six Sigma, lean, and supply chain expertise to help manufacturers compete globally.',
    challenges: ['High defect rates and rework costs', 'Inefficient production scheduling', 'Supplier quality inconsistency', 'High inventory carrying costs', 'ESG reporting requirements from OEMs'],
    services: ['Six Sigma & Process Excellence', 'Supply Chain Management', 'Vendor Development', 'Inventory Optimization'],
    results: '₹3.2 Cr avg savings per engagement',
    clients: '25+',
  },
  {
    id: 'fmcg',
    name: 'FMCG & Retail',
    icon: '🛒',
    color: '#c9a84c',
    tagline: 'Speed, availability, and sustainability for consumer brands',
    desc: 'FMCG businesses compete on speed, service levels, and cost. Whether you\'re a large CPG company or a fast-growing D2C brand, Nexara helps you build distribution excellence and procurement efficiency.',
    challenges: ['Last-mile delivery costs', 'Demand volatility and stockouts', 'Complex multi-tier distribution', 'Supplier ESG compliance pressure', 'Rising logistics costs'],
    services: ['Logistics & Distribution', 'Inventory Management', 'Procurement Strategy', 'ESG Advisory'],
    results: '35% average logistics cost reduction',
    clients: '18+',
  },
  {
    id: 'pharma',
    name: 'Pharmaceuticals',
    icon: '💊',
    color: '#10b981',
    tagline: 'Compliance-driven supply chains that save lives and costs',
    desc: 'Pharma supply chains are uniquely complex — stringent regulatory requirements, cold chain demands, and serialization. Nexara brings specialist knowledge to pharma supply chain and ESG compliance.',
    challenges: ['Cold chain management complexity', 'Regulatory compliance (GDP, GMP)', 'Demand forecasting for seasonal products', 'API sourcing risk concentration', 'BRSR and ESG reporting'],
    services: ['Supply Chain Management', 'Vendor Development', 'ESG Advisory', 'Inventory Management'],
    results: '28% reduction in inventory write-offs',
    clients: '12+',
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: '🚗',
    color: '#a855f7',
    tagline: 'JIT excellence and tier-1 supplier development for automotive OEMs',
    desc: 'Automotive supply chains run on precision. We help OEMs, Tier-1, and Tier-2 suppliers achieve zero-defect quality, JIT delivery, and compliant supplier ecosystems.',
    challenges: ['Just-in-time delivery failures', 'Supplier quality rejections', 'EV supply chain transition', 'Carbon footprint reporting for global OEMs', 'Fluctuating commodity costs'],
    services: ['Vendor Development', 'Six Sigma', 'Supply Chain Management', 'ESG Advisory'],
    results: '65% reduction in supplier quality rejections',
    clients: '10+',
  },
  {
    id: 'chemicals',
    name: 'Chemicals',
    icon: '⚗️',
    color: '#f97316',
    tagline: 'Safe, sustainable, and cost-efficient chemical supply chains',
    desc: 'Chemical companies manage hazardous materials, complex regulatory requirements, and volatile raw material prices. Nexara helps you build procurement resilience and ESG-compliant operations.',
    challenges: ['Raw material price volatility', 'REACH / regulatory compliance', 'Hazmat logistics complexity', 'Scope 1 & 2 emissions reporting', 'Supplier concentration risk'],
    services: ['Procurement Strategy', 'ESG Advisory', 'Logistics', 'Supply Chain Risk'],
    results: '22% reduction in procurement costs',
    clients: '8+',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    icon: '📱',
    color: '#06b6d4',
    tagline: 'Fulfillment speed and inventory precision for digital-first brands',
    desc: 'E-commerce businesses live and die by fulfillment speed, inventory accuracy, and return management. We help you build scalable operations that can handle peak demand without breaking.',
    challenges: ['High return rates and reverse logistics', 'Inventory accuracy across channels', 'Last-mile delivery cost escalation', 'Warehouse capacity planning', 'Cross-border logistics'],
    services: ['Logistics & Distribution', 'Inventory Management', 'Supply Chain Design', 'Procurement'],
    results: '40% improvement in order fulfillment speed',
    clients: '15+',
  },
];

export default function IndustriesPage() {
  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Industries We Serve</span>
          <h1 className={styles.heroTitle}>Sector-Specific <em>Expertise</em></h1>
          <p className={styles.heroDesc}>Deep domain knowledge across India's most dynamic industries. We speak your language, understand your challenges, and deliver results that matter.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          <div className={styles.grid}>
            {industries.map((ind, i) => (
              <div key={ind.id} id={ind.id} className={styles.card}>
                <div className={styles.cardHeader} style={{ background: `linear-gradient(135deg, ${ind.color}15, transparent)`, borderBottom: `1px solid ${ind.color}25` }}>
                  <div className={styles.iconWrap} style={{ background: `${ind.color}18`, border: `1px solid ${ind.color}30` }}>
                    <span style={{ fontSize: '2rem' }}>{ind.icon}</span>
                  </div>
                  <div>
                    <div className={styles.clientBadge}>{ind.clients} clients</div>
                    <h3 className={styles.cardName}>{ind.name}</h3>
                    <p className={styles.cardTagline} style={{ color: ind.color }}>{ind.tagline}</p>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.cardDesc}>{ind.desc}</p>

                  <div className={styles.section}>
                    <h5 className={styles.sectionTitle}>Key Challenges We Solve</h5>
                    <div className={styles.challenges}>
                      {ind.challenges.map((c, j) => (
                        <div key={j} className={styles.challenge}>
                          <span className={styles.challengeDot} style={{ background: ind.color }} />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.section}>
                    <h5 className={styles.sectionTitle}>Relevant Services</h5>
                    <div className={styles.serviceTags}>
                      {ind.services.map((s, j) => (
                        <span key={j} className={styles.serviceTag} style={{ borderColor: `${ind.color}40`, color: ind.color, background: `${ind.color}10` }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.resultBanner} style={{ background: `${ind.color}10`, border: `1px solid ${ind.color}25` }}>
                    <span className={styles.resultLabel}>Typical Client Result</span>
                    <strong style={{ color: ind.color }}>{ind.results}</strong>
                  </div>

                  <Link to="/book-consultation" className={styles.cta} style={{ borderColor: `${ind.color}50`, color: ind.color }}>
                    Discuss Your {ind.name} Challenge <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Don't See Your Industry?</h2>
            <p>We work across many sectors. Book a free consultation and we'll tell you how we can help.</p>
            <Link to="/book-consultation" className="btn btn-primary" style={{ marginTop: 24 }}>
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
