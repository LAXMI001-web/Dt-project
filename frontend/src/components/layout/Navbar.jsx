import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const services = [
  { label: 'Supply Chain', path: '/services/supply-chain' },
  { label: 'Vendor Development', path: '/services/vendor-development' },
  { label: 'Procurement', path: '/services/procurement' },
  { label: 'Six Sigma', path: '/services/six-sigma' },
  { label: 'Logistics', path: '/services/logistics' },
  { label: 'Inventory Management', path: '/services/inventory' },
  { label: 'ESG Advisory', path: '/services/esg' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>N</span>
          <span className={styles.logoText}>NEXARA</span>
          <span className={styles.logoSub}>Consulting</span>
        </Link>

        {/* Desktop links */}
        <div className={styles.links}>
          <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} end>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>About</NavLink>

          {/* Services dropdown */}
          <div className={styles.dropdown} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={`${styles.link} ${styles.dropTrigger} ${pathname.includes('/services') ? styles.active : ''}`}>
              Services <ChevronDown size={14} />
            </button>
            {servicesOpen && (
              <div className={styles.dropMenu}>
                {services.map(s => (
                  <Link key={s.path} to={s.path} className={styles.dropItem}>{s.label}</Link>
                ))}
                <div className={styles.dropDivider} />
                <Link to="/services" className={`${styles.dropItem} ${styles.dropItemAll}`}>View All Services →</Link>
              </div>
            )}
          </div>

          <NavLink to="/industries" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>Industries</NavLink>
          <NavLink to="/case-studies" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>Case Studies</NavLink>
          <NavLink to="/insights" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>Insights</NavLink>
          <NavLink to="/esg-calculator" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>ESG Tool</NavLink>
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          {user ? (
            <div className={styles.dropdown} onMouseEnter={() => setUserOpen(true)} onMouseLeave={() => setUserOpen(false)}>
              <button className={`${styles.link} ${styles.dropTrigger} ${styles.userBtn}`}>
                <User size={16} /> {user.name.split(' ')[0]} <ChevronDown size={14} />
              </button>
              {userOpen && (
                <div className={styles.dropMenu} style={{ right: 0, left: 'auto', minWidth: 180 }}>
                  <Link to="/dashboard" className={styles.dropItem}>My Dashboard</Link>
                  <Link to="/dashboard/consultations" className={styles.dropItem}>My Consultations</Link>
                  <div className={styles.dropDivider} />
                  <button onClick={logout} className={`${styles.dropItem} ${styles.dropItemLogout}`}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className={`btn btn-ghost ${styles.loginBtn}`}>Sign In</Link>
          )}
          <Link to="/book-consultation" className="btn btn-primary">Book Consultation</Link>
        </div>

        {/* Mobile toggle */}
        <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <Link to="/" className={styles.mobileLink}>Home</Link>
          <Link to="/about" className={styles.mobileLink}>About</Link>
          <Link to="/services" className={styles.mobileLink}>Services</Link>
          <Link to="/industries" className={styles.mobileLink}>Industries</Link>
          <Link to="/case-studies" className={styles.mobileLink}>Case Studies</Link>
          <Link to="/insights" className={styles.mobileLink}>Insights</Link>
          <Link to="/esg-calculator" className={styles.mobileLink}>ESG Calculator</Link>
          <Link to="/contact" className={styles.mobileLink}>Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.mobileLink}>Dashboard</Link>
              <button onClick={logout} className={styles.mobileLink} style={{ textAlign: 'left', width: '100%' }}>Sign Out</button>
            </>
          ) : (
            <Link to="/login" className={styles.mobileLink}>Sign In</Link>
          )}
          <Link to="/book-consultation" className="btn btn-primary" style={{ margin: '16px 20px' }}>Book Consultation</Link>
        </div>
      )}
    </nav>
  );
}
