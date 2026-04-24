import { Link } from 'react-router-dom';
import { ArrowRight, Award, Target, Eye, Heart } from 'lucide-react';
import styles from './AboutPage.module.css';

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', exp: '22 years', speciality: 'Supply Chain Strategy', bg: '#c9a84c', initial: 'R', linkedin: '#' },
  { name: 'Priya Sharma', role: 'Chief ESG Officer', exp: '16 years', speciality: 'ESG & Sustainability', bg: '#10b981', initial: 'P', linkedin: '#' },
  { name: 'Amit Verma', role: 'Head of Six Sigma', exp: '18 years', speciality: 'Process Excellence', bg: '#3b82f6', initial: 'A', linkedin: '#' },
  { name: 'Sanjay Mehta', role: 'Director – Logistics', exp: '20 years', speciality: 'Logistics & Distribution', bg: '#a855f7', initial: 'S', linkedin: '#' },
  { name: 'Divya Nair', role: 'Principal Consultant', exp: '13 years', speciality: 'Inventory & Procurement', bg: '#f97316', initial: 'D', linkedin: '#' },
  { name: 'Kiran Patel', role: 'Vendor Dev Lead', exp: '15 years', speciality: 'Vendor Development', bg: '#06b6d4', initial: 'K', linkedin: '#' },
];

const values = [
  { icon: <Target size={24} />, title: 'Outcome First', desc: 'Every engagement is measured by the tangible results we deliver — cost savings, efficiency gains, and sustainable growth.' },
  { icon: <Eye size={24} />, title: 'Radical Transparency', desc: 'We share findings honestly, even when uncomfortable. Our clients always know exactly where they stand and what needs to change.' },
  { icon: <Award size={24} />, title: 'Excellence in Execution', desc: 'Certified professionals, proven methodologies, and relentless attention to detail in every project we undertake.' },
  { icon: <Heart size={24} />, title: 'Long-Term Partnership', desc: 'We build relationships, not transactions. Our 98% client retention speaks to the depth of trust we cultivate.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <span className="section-label">About Nexara</span>
          <h1 className={styles.heroTitle}>Built by Practitioners.<br /><em>Driven by Results.</em></h1>
          <p className={styles.heroDesc}>Founded by industry veterans with 100+ combined years of hands-on supply chain, procurement, and operations experience across India's leading enterprises.</p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <span className="section-label">Our Story</span>
              <h2>From the Factory Floor<br /><em>to the Boardroom</em></h2>
              <p style={{ marginTop: 20 }}>Nexara was founded in 2009 with a simple conviction: the best supply chain consultants are those who've actually run supply chains. Our founders spent decades working inside India's largest manufacturers, FMCG companies, and logistics firms before bringing that hard-won knowledge to clients as independent advisors.</p>
              <p style={{ marginTop: 16 }}>Today, we are a 40-person specialist firm headquartered in Mumbai with delivery teams in Pune, Chennai, and Delhi. We've partnered with 50+ organizations ranging from ₹50 crore SMEs to Fortune 500 multinationals, consistently delivering transformational outcomes.</p>
              <p style={{ marginTop: 16 }}>Our certification portfolio includes Lean Six Sigma Black Belts, CSCMP-certified supply chain professionals, and ESG advisory specialists trained under international frameworks including GRI, CDP, and BRSR.</p>
              <div className={styles.storyStats}>
                {[['2009', 'Founded'], ['40+', 'Consultants'], ['Mumbai + 3 Cities', 'Presence'], ['50+ Enterprise', 'Clients']].map(([v, l]) => (
                  <div key={l} className={styles.storyStat}>
                    <strong>{v}</strong><span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.storyVisual}>
              <div className={styles.certCard}>
                <h4>Our Certifications</h4>
                {['Lean Six Sigma Black Belt (ASQ)', 'CSCMP – Supply Chain Pro', 'ISO 9001:2015 Internal Auditor', 'GRI Standards ESG Reporting', 'CDP Climate Disclosure', 'BRSR Sustainability Reporting', 'APICS CSCP Certified'].map(cert => (
                  <div key={cert} className={styles.certItem}><Award size={14} style={{ color: '#c9a84c' }} /><span>{cert}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className={`section ${styles.missionSection}`}>
        <div className="container">
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.missionIcon}><Eye size={28} /></div>
              <h3>Our Vision</h3>
              <p>To be India's most trusted supply chain and sustainability consulting firm — helping 500 organizations achieve operational excellence and ESG leadership by 2030.</p>
            </div>
            <div className={styles.missionCard} style={{ borderColor: 'rgba(16,185,129,0.2)' }}>
              <div className={styles.missionIcon} style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}><Target size={28} /></div>
              <h3>Our Mission</h3>
              <p>To deliver measurable, lasting impact through practitioner-led consulting that combines deep domain expertise, data-driven insights, and genuine partnership with our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">What We Stand For</span>
            <h2>Our Core <em>Values</em></h2>
          </div>
          <div className={styles.valuesGrid}>
            {values.map((v, i) => (
              <div key={i} className={styles.valueCard}>
                <div className={styles.valueIcon}>{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={`section ${styles.teamSection}`} id="team">
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="section-label">Leadership Team</span>
            <h2>Meet the <em>Experts</em></h2>
            <p>Practitioners who've worked inside supply chains before advising on them.</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamAvatar} style={{ background: `linear-gradient(135deg, ${m.bg}, ${m.bg}88)` }}>{m.initial}</div>
                <h4 className={styles.teamName}>{m.name}</h4>
                <p className={styles.teamRole}>{m.role}</p>
                <span className="tag" style={{ marginBottom: 8 }}>{m.exp} exp.</span>
                <p className={styles.teamSpec}>{m.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to Work with the Best?</h2>
          <p>Schedule a discovery call with a senior consultant.</p>
          <Link to="/book-consultation" className="btn btn-primary" style={{ marginTop: 28 }}>
            Book a Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
