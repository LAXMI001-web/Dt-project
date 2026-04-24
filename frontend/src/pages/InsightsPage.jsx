import { useState, useEffect } from 'react';
import { blogAPI } from '../api';
import { Clock, Eye, ArrowRight, FileText, BookOpen } from 'lucide-react';
import styles from './InsightsPage.module.css';

const cats = ['All', 'supply-chain', 'procurement', 'six-sigma', 'esg', 'logistics', 'inventory'];
const catLabels = { 'supply-chain': 'Supply Chain', 'procurement': 'Procurement', 'six-sigma': 'Six Sigma', 'esg': 'ESG', 'logistics': 'Logistics', 'inventory': 'Inventory', 'leadership': 'Leadership' };
const typeIcon = { blog: <BookOpen size={14} />, whitepaper: <FileText size={14} />, 'case-study': <Eye size={14} /> };

// Static fallback blogs for demo when API not connected
const staticBlogs = [
  { _id: '1', title: 'The Future of Supply Chain Resilience in 2025', slug: 'future-supply-chain-resilience-2024', excerpt: 'How leading organizations are building adaptive supply chains to withstand global disruptions.', category: 'supply-chain', type: 'blog', author: 'Rajesh Kumar', readTime: 7, views: 1240, featured: true, createdAt: new Date().toISOString() },
  { _id: '2', title: 'ESG Integration in Procurement: A Practical Guide', slug: 'esg-integration-procurement-guide', excerpt: 'Step-by-step framework for embedding ESG criteria into your procurement decision-making process.', category: 'esg', type: 'whitepaper', author: 'Priya Sharma', readTime: 10, views: 890, featured: true, createdAt: new Date().toISOString() },
  { _id: '3', title: 'Six Sigma DMAIC: Reducing Defects by 60% in Manufacturing', slug: 'six-sigma-dmaic-manufacturing', excerpt: 'A real-world application of DMAIC methodology that transformed quality metrics.', category: 'six-sigma', type: 'case-study', author: 'Amit Verma', readTime: 8, views: 2100, featured: false, createdAt: new Date().toISOString() },
  { _id: '4', title: 'Vendor Development Strategy: Building Strategic Partnerships', slug: 'vendor-development-partnerships', excerpt: 'How to transform transactional vendor relationships into long-term strategic partnerships that drive value.', category: 'procurement', type: 'blog', author: 'Nexara Team', readTime: 6, views: 760, featured: false, createdAt: new Date().toISOString() },
  { _id: '5', title: 'Last-Mile Logistics Optimization: Cutting Delivery Costs by 35%', slug: 'last-mile-logistics-optimization', excerpt: 'Innovative approaches to last-mile delivery reshaping logistics in India.', category: 'logistics', type: 'blog', author: 'Sanjay Mehta', readTime: 9, views: 1450, featured: true, createdAt: new Date().toISOString() },
  { _id: '6', title: 'ABC-XYZ Inventory Classification: A Complete Framework', slug: 'abc-xyz-inventory-framework', excerpt: 'Master the combined ABC-XYZ analysis to optimize inventory levels and free up working capital.', category: 'inventory', type: 'whitepaper', author: 'Divya Nair', readTime: 11, views: 980, featured: false, createdAt: new Date().toISOString() },
];

export default function InsightsPage() {
  const [blogs, setBlogs] = useState(staticBlogs);
  const [cat, setCat] = useState('All');
  const [type, setType] = useState('All');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const params = {};
        if (cat !== 'All') params.category = cat;
        if (type !== 'All') params.type = type.toLowerCase().replace(' ', '-');
        const res = await blogAPI.getAll(params);
        if (res.data.blogs?.length) setBlogs(res.data.blogs);
      } catch { /* use static */ }
      finally { setLoading(false); }
    };
    fetch();
  }, [cat, type]);

  const filtered = cat === 'All' ? blogs : blogs.filter(b => b.category === cat);

  return (
    <div>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Insights & Knowledge</span>
          <h1 className={styles.heroTitle}>Thought Leadership <em>& Expertise</em></h1>
          <p className={styles.heroDesc}>Practical insights from practitioners — supply chain strategies, ESG trends, and process excellence frameworks from the Nexara team.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          {/* Filters */}
          <div className={styles.filterBar}>
            <div className={styles.catFilters}>
              {cats.map(c => (
                <button key={c} onClick={() => setCat(c)} className={`${styles.filter} ${cat === c ? styles.active : ''}`}>
                  {catLabels[c] || 'All'}
                </button>
              ))}
            </div>
            <div className={styles.typeFilters}>
              {['All', 'Blog', 'Whitepaper', 'Case Study'].map(t => (
                <button key={t} onClick={() => setType(t)} className={`${styles.typeBtn} ${type === t ? styles.typeBtnActive : ''}`}>{t}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}><span className="spinner" /></div>
          ) : (
            <>
              {/* Featured */}
              {cat === 'All' && type === 'All' && (
                <div className={styles.featured}>
                  {filtered.filter(b => b.featured).slice(0, 2).map(blog => (
                    <div key={blog._id} className={styles.featuredCard} onClick={() => setSelected(blog)}>
                      <div className={styles.featuredImg}>
                        <div className={styles.featuredImgPlaceholder} style={{ background: `linear-gradient(135deg, ${catColor(blog.category)}, #0a0e17)` }}>
                          <span style={{ fontSize: '3rem' }}>{catEmoji(blog.category)}</span>
                        </div>
                      </div>
                      <div className={styles.featuredContent}>
                        <div className={styles.cardTop}>
                          <span className="tag">{catLabels[blog.category] || blog.category}</span>
                          <span className={styles.typeChip}>{typeIcon[blog.type]} {blog.type}</span>
                        </div>
                        <h2 className={styles.featuredTitle}>{blog.title}</h2>
                        <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                        <div className={styles.cardMeta}>
                          <span><Clock size={13} /> {blog.readTime} min read</span>
                          <span><Eye size={13} /> {blog.views?.toLocaleString()}</span>
                          <span>by {blog.author}</span>
                        </div>
                        <div className={styles.readMore}>Read Article <ArrowRight size={14} /></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grid */}
              <div className={styles.grid}>
                {filtered.filter(b => !b.featured || cat !== 'All' || type !== 'All').map(blog => (
                  <div key={blog._id} className={styles.card} onClick={() => setSelected(blog)}>
                    <div className={styles.cardImgPlaceholder} style={{ background: `linear-gradient(135deg, ${catColor(blog.category)}22, #111827)` }}>
                      <span style={{ fontSize: '2.2rem' }}>{catEmoji(blog.category)}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTop}>
                        <span className="tag">{catLabels[blog.category] || blog.category}</span>
                        <span className={styles.typeChip}>{typeIcon[blog.type]} {blog.type}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{blog.title}</h3>
                      <p className={styles.cardExcerpt}>{blog.excerpt}</p>
                      <div className={styles.cardMeta}>
                        <span><Clock size={12} /> {blog.readTime} min</span>
                        <span><Eye size={12} /> {blog.views?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className={styles.modal} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelected(null)}>✕</button>
            <span className="tag">{catLabels[selected.category] || selected.category}</span>
            <h2 className={styles.modalTitle}>{selected.title}</h2>
            <div className={styles.modalMeta}>
              <span>By {selected.author}</span>
              <span><Clock size={13} /> {selected.readTime} min read</span>
              <span>{new Date(selected.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className={styles.modalBody}>
              {selected.content
                ? <div dangerouslySetInnerHTML={{ __html: selected.content }} />
                : <><p>{selected.excerpt}</p><p style={{ marginTop: 16 }}>This is a preview. The full article is available to registered users. Sign up for free to access all insights, whitepapers, and case studies from the Nexara knowledge library.</p><a href="/register" className="btn btn-primary" style={{ marginTop: 24 }}>Get Full Access <ArrowRight size={16} /></a></>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function catColor(cat) {
  const map = { 'supply-chain': '#3b82f6', 'esg': '#10b981', 'six-sigma': '#a855f7', 'procurement': '#c9a84c', 'logistics': '#f97316', 'inventory': '#06b6d4' };
  return map[cat] || '#c9a84c';
}
function catEmoji(cat) {
  const map = { 'supply-chain': '🔗', 'esg': '🌿', 'six-sigma': '⚙️', 'procurement': '📋', 'logistics': '🚚', 'inventory': '📦', 'leadership': '👑' };
  return map[cat] || '📊';
}
