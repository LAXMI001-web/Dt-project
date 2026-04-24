const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
  try {
    const { category, type, featured, page = 1, limit = 9 } = req.query;
    const filter = { published: true };
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (featured) filter.featured = featured === 'true';
    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .select('-content')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json({ success: true, total, pages: Math.ceil(total / limit), blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.seedBlogs = async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    if (count > 0) return res.status(200).json({ success: true, message: 'Blogs already seeded' });
    const blogs = [
      {
        title: 'The Future of Supply Chain Resilience in 2024',
        slug: 'future-supply-chain-resilience-2024',
        excerpt: 'How leading organizations are building adaptive supply chains to withstand global disruptions.',
        content: '<p>Supply chains across the globe faced unprecedented disruptions in recent years. From the COVID-19 pandemic to geopolitical tensions, organizations have been forced to rethink their supply chain strategies fundamentally...</p><p>The key to resilience lies in three pillars: visibility, agility, and redundancy. Companies that invested in real-time supply chain visibility platforms were 2.5x more likely to maintain business continuity during disruptions...</p>',
        category: 'supply-chain',
        tags: ['resilience', 'disruption', 'visibility'],
        author: 'Rajesh Kumar, Principal Consultant',
        readTime: 7,
        featured: true,
        type: 'blog'
      },
      {
        title: 'ESG Integration in Procurement: A Practical Guide',
        slug: 'esg-integration-procurement-guide',
        excerpt: 'Step-by-step framework for embedding ESG criteria into your procurement decision-making process.',
        content: '<p>Environmental, Social, and Governance (ESG) considerations are no longer optional for procurement teams. Regulatory pressure, investor expectations, and consumer demand are driving organizations to integrate sustainability into every purchase decision...</p>',
        category: 'esg',
        tags: ['ESG', 'procurement', 'sustainability'],
        author: 'Priya Sharma, ESG Lead',
        readTime: 10,
        featured: true,
        type: 'whitepaper'
      },
      {
        title: 'Six Sigma DMAIC: Reducing Defects by 60% in Manufacturing',
        slug: 'six-sigma-dmaic-manufacturing-case',
        excerpt: 'A real-world application of DMAIC methodology that transformed a mid-size manufacturer\'s quality metrics.',
        content: '<p>When GlobalParts Ltd approached us with a 12% defect rate on their precision components line, we applied the Six Sigma DMAIC framework over a 6-month engagement...</p>',
        category: 'six-sigma',
        tags: ['DMAIC', 'quality', 'manufacturing'],
        author: 'Amit Verma, Black Belt Consultant',
        readTime: 8,
        featured: false,
        type: 'case-study'
      },
      {
        title: 'Vendor Development Strategy: Building Strategic Partnerships',
        slug: 'vendor-development-strategic-partnerships',
        excerpt: 'How to transform transactional vendor relationships into long-term strategic partnerships that drive value.',
        content: '<p>The difference between companies that thrive and those that merely survive often comes down to supplier relationships. Strategic vendor development goes beyond price negotiation...</p>',
        category: 'procurement',
        tags: ['vendor', 'partnerships', 'strategy'],
        author: 'Nexara Team',
        readTime: 6,
        featured: false,
        type: 'blog'
      },
      {
        title: 'Last-Mile Logistics Optimization: Cutting Delivery Costs by 35%',
        slug: 'last-mile-logistics-optimization',
        excerpt: 'Innovative approaches to last-mile delivery that are reshaping the logistics landscape in India.',
        content: '<p>Last-mile delivery represents 53% of total shipping costs, making it the most expensive and complex part of the supply chain. Our work with regional distributors has revealed consistent patterns of inefficiency...</p>',
        category: 'logistics',
        tags: ['last-mile', 'optimization', 'costs'],
        author: 'Sanjay Mehta, Logistics Director',
        readTime: 9,
        featured: true,
        type: 'blog'
      },
      {
        title: 'ABC-XYZ Inventory Classification: A Complete Framework',
        slug: 'abc-xyz-inventory-classification-framework',
        excerpt: 'Master the combined ABC-XYZ analysis to optimize inventory levels and free up working capital.',
        content: '<p>Inventory management is the silent profit killer in most manufacturing and distribution businesses. Our analysis across 40+ clients shows that average inventory carrying costs represent 25-30% of inventory value annually...</p>',
        category: 'inventory',
        tags: ['ABC analysis', 'XYZ', 'working capital'],
        author: 'Divya Nair, Operations Consultant',
        readTime: 11,
        featured: false,
        type: 'whitepaper'
      }
    ];
    await Blog.insertMany(blogs);
    res.status(201).json({ success: true, message: `${blogs.length} blogs seeded` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
