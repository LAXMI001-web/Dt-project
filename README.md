# Nexara Consulting Group — Full Stack Website

A professional, market-ready consulting website for a Supply Chain & ESG advisory firm, built with React + Node.js + MongoDB.

---

## 🏗 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + React Router v6 |
| Styling | CSS Modules + Google Fonts |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose ODM |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
nexara/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Register, login, profile
│   │   ├── blogController.js    # Blog CRUD + seed
│   │   ├── consultationController.js
│   │   ├── contactController.js # Contact + admin dashboard
│   │   └── esgController.js     # ESG scoring engine
│   ├── middleware/
│   │   └── auth.js              # JWT protect + role auth
│   ├── models/
│   │   ├── User.js
│   │   ├── Consultation.js
│   │   ├── Blog.js
│   │   ├── Contact.js
│   │   └── ESGAssessment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blogs.js
│   │   ├── consultations.js
│   │   ├── contact.js
│   │   └── esg.js
│   ├── .env                     # Environment variables
│   └── server.js                # Express app entry
│
└── frontend/
    ├── src/
    │   ├── api/index.js          # Axios API service layer
    │   ├── components/
    │   │   └── layout/           # Navbar, Footer, Layout
    │   ├── context/
    │   │   └── AuthContext.jsx   # Global auth state
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── AboutPage.jsx
    │       ├── ServicesPage.jsx  # All 7 services
    │       ├── IndustriesPage.jsx
    │       ├── CaseStudiesPage.jsx
    │       ├── InsightsPage.jsx  # Blog + Whitepapers
    │       ├── ESGCalculatorPage.jsx
    │       ├── BookConsultationPage.jsx
    │       ├── ContactPage.jsx
    │       ├── AuthPage.jsx      # Login + Register
    │       └── DashboardPage.jsx # Client portal
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone / Extract the project

### 2. Backend Setup

```bash
cd nexara/backend
npm install
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexara_db
JWT_SECRET=your_super_secret_key_change_this
JWT_EXPIRE=30d
NODE_ENV=development
```

Start the backend:
```bash
npm run dev    # development (nodemon)
npm start      # production
```

### 3. Frontend Setup

```bash
cd nexara/frontend
npm install
npm run dev    # starts on http://localhost:3000
```

### 4. Seed the Blog

Visit: `http://localhost:5000/api/blogs/seed`

This seeds 6 articles, whitepapers, and case studies.

### 5. Create Admin User

After registering via `/register`, manually update the user role in MongoDB:

```javascript
// In MongoDB shell or Compass:
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## 🌐 Pages & Features

| Page | URL | Description |
|---|---|---|
| Homepage | `/` | Hero, stats counter, services, testimonials, CTA |
| About | `/about` | Story, team, values, certifications |
| Services | `/services` | All 7 service areas |
| Service Detail | `/services/:id` | Individual service deep-dive |
| Industries | `/industries` | 6 sector pages |
| Case Studies | `/case-studies` | 6 detailed case studies with filters |
| Insights | `/insights` | Blog + Whitepapers + Case Study articles |
| ESG Calculator | `/esg-calculator` | Multi-step ESG assessment → score + recommendations |
| Book Consultation | `/book-consultation` | Full booking form with calendar |
| Contact | `/contact` | Contact form + office info |
| Login | `/login` | JWT auth login |
| Register | `/register` | New account creation |
| Dashboard | `/dashboard` | Client portal — consultations, ESG history, profile |

---

## 🔌 API Endpoints

### Auth
```
POST   /api/auth/register     — Create account
POST   /api/auth/login        — Login → JWT token
GET    /api/auth/me           — Get profile (protected)
PUT    /api/auth/me           — Update profile (protected)
```

### Consultations
```
POST   /api/consultations              — Book (public)
GET    /api/consultations/my           — My bookings (protected)
GET    /api/consultations/all          — All bookings (admin)
PUT    /api/consultations/:id          — Update status (admin)
```

### Blogs
```
GET    /api/blogs              — List (with ?category=, ?type=, ?featured=)
GET    /api/blogs/:slug        — Single post
POST   /api/blogs              — Create (admin)
GET    /api/blogs/seed         — Seed sample blogs
```

### ESG
```
POST   /api/esg/calculate      — Run ESG assessment → score
GET    /api/esg/my             — My assessment history (protected)
```

### Contact
```
POST   /api/contact            — Submit message
GET    /api/contact            — All messages (admin)
GET    /api/contact/dashboard  — Stats dashboard (admin)
```

---

## 🎨 Design System

- **Font Display**: Cormorant Garamond (elegant serif for headings)
- **Font Body**: DM Sans (clean sans-serif)
- **Font Mono**: DM Mono (for code/labels)
- **Color Scheme**: Deep navy `#0a0e17` + gold accent `#c9a84c`
- **Cards**: Subtle gradient dark cards with gold hover glow
- **Animations**: CSS-only with intersection observer for scroll reveals

---

## 🔒 Security Features

- Helmet.js for HTTP security headers
- Rate limiting (100 req/15min)
- bcrypt password hashing (12 rounds)
- JWT authentication with expiry
- Input validation via express-validator
- CORS configured for local dev

---

## 📦 Production Deployment

### Backend (e.g., Railway, Render, EC2)
1. Set `NODE_ENV=production` in env
2. Set `MONGODB_URI` to MongoDB Atlas connection string
3. Set a strong `JWT_SECRET`
4. Run `npm start`

### Frontend (e.g., Vercel, Netlify)
1. Set `VITE_API_URL=https://your-api-domain.com/api` in env
2. Run `npm run build`
3. Deploy the `dist/` folder

---

## 📋 Services Covered

1. **Supply Chain Management** — Network design, S&OP, risk management
2. **Vendor Development** — Supplier qualification, scorecards, SRM
3. **Procurement & Purchasing** — Category management, strategic sourcing
4. **Six Sigma & Process Excellence** — DMAIC, DOE, control plans
5. **Logistics & Distribution** — Network design, 3PL, last-mile
6. **Inventory Management** — ABC-XYZ, demand forecasting, SLOB
7. **ESG Advisory** — BRSR, GRI, carbon footprint, green supply chain

---

Built with ❤️ for the Indian consulting market.
