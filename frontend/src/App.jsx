import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import InsightsPage from './pages/InsightsPage';
import ESGCalculatorPage from './pages/ESGCalculatorPage';
import BookConsultationPage from './pages/BookConsultationPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage, RegisterPage } from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import IndustriesPage from './pages/IndustriesPage';

function ServiceWrapper() {
  const { serviceId } = useParams();
  return <ServicesPage serviceId={serviceId} />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1e293b', color: '#ffffff', border: '1px solid rgba(255,255,255,0.1)' },
            success: { iconTheme: { primary: '#10b981', secondary: '#ffffff' } },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:tab" element={<DashboardPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceWrapper />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/esg-calculator" element={<ESGCalculatorPage />} />
            <Route path="/book-consultation" element={<BookConsultationPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
