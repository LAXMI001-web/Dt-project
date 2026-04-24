import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
const LinkedinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const TwitterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>;
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoMark}>N</span>
              <div>
                <div className={styles.logoText}>NEXARA</div>
                <div className={styles.logoSub}>Consulting Group</div>
              </div>
            </div>
            <p className={styles.tagline}>
              Transforming supply chains, building resilience, and driving sustainable growth for forward-thinking organizations.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.social}><LinkedinIcon /></a>
              <a href="#" className={styles.social}><TwitterIcon /></a>
              <a href="mailto:hello@nexara.com" className={styles.social}><Mail size={18} /></a>
            </div>
          </div>

          {/* Services */}
          <div className={styles.col}>
            <h5 className={styles.colTitle}>Services</h5>
            {['Supply Chain Management', 'Vendor Development', 'Procurement Strategy', 'Six Sigma & Process Excellence', 'Logistics & Distribution', 'Inventory Management', 'ESG Advisory'].map((s, i) => (
              <Link key={i} to={`/services/${s.toLowerCase().replace(/[^a-z]+/g, '-')}`} className={styles.colLink}>
                <ArrowRight size={12} /> {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div className={styles.col}>
            <h5 className={styles.colTitle}>Company</h5>
            {[['About Us', '/about'], ['Our Team', '/about#team'], ['Case Studies', '/case-studies'], ['Insights & Blog', '/insights'], ['ESG Calculator', '/esg-calculator'], ['Book Consultation', '/book-consultation'], ['Contact', '/contact']].map(([label, path]) => (
              <Link key={path} to={path} className={styles.colLink}><ArrowRight size={12} /> {label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h5 className={styles.colTitle}>Get In Touch</h5>
            <div className={styles.contactItem}><MapPin size={16} /><span>Mumbai & Pune, Maharashtra, India</span></div>
            <div className={styles.contactItem}><Phone size={16} /><a href="tel:+919876543210">+91 98765 43210</a></div>
            <div className={styles.contactItem}><Mail size={16} /><a href="mailto:hello@nexara.com">hello@nexara.com</a></div>
            <div className={styles.newsletter}>
              <p className={styles.newsTitle}>Get Insights</p>
              <div className={styles.newsForm}>
                <input type="email" placeholder="Your email" className={styles.newsInput} />
                <button className={styles.newsBtn}><ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        </div>

        <hr className="divider" style={{ margin: '48px 0 28px' }} />

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Nexara Consulting Group. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
          <p className={styles.iso}>ISO 9001:2015 Certified</p>
        </div>
      </div>
    </footer>
  );
}
