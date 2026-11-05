import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation } from
'react-router-dom';
import { HeroSection } from './components/HeroSection';
import { StatsGrid } from './components/StatsGrid';
import { ServicesSection } from './components/ServicesSection';
import { PricesSection } from './components/PricesSection';
import { StationsSection } from './components/StationsSection';
import { CareersSection } from './components/CareersSection';
import { Footer } from './components/Footer';
import { SolicitarPage } from './pages/SolicitarPage';
import { ContactoPage } from './pages/ContactoPage';
import { Sun, Moon, Menu, X } from 'lucide-react';
const scrollNavItems = [
{
  label: 'Nosotros',
  id: 'nosotros'
},
{
  label: 'Estaciones',
  id: 'estaciones'
},
{
  label: 'Carreras',
  id: 'carreras'
}];

const routeNavItems = [
{
  label: 'Solicitar',
  route: '/solicitar'
},
{
  label: 'Contacto',
  route: '/contacto'
}];

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return {
    theme,
    toggleTheme
  };
}
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element)
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }, 300);
    } else {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element)
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };
  const goToRoute = (route: string) => {
    setMobileMenuOpen(false);
    navigate(route);
    window.scrollTo(0, 0);
  };
  const allNavItems = [
  ...scrollNavItems.map((item) => ({
    ...item,
    type: 'scroll' as const
  })),
  ...routeNavItems.map((item) => ({
    ...item,
    type: 'route' as const,
    id: item.route
  }))];

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b-2 border-[#FCEE02] shadow-lg transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-nav)'
        }}>
        
        <div className="container mx-auto px-4 sm:px-6 md:px-12 h-20 sm:h-28 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}>
            
            <img
              src="/NBA_(1).png"
              alt="Junquito Gas Logo"
              className="h-20 sm:h-24 md:h-30 object-contain drop-shadow-md pt-[01px] pb-[01px] pl-[01px] pr-[01px] mt-[01px] mb-[01px] ml-[01px] mr-[01px]" />
            
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {scrollNavItems.map((item) =>
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-bold uppercase tracking-widest hover:text-[#FCEE02] transition-colors relative group px-4 py-2 border-2 border-transparent hover:border-[#FCEE02] rounded-lg"
              style={{
                color: 'var(--text-primary)'
              }}>
              
                {item.label}
              </button>
            )}
            {routeNavItems.map((item) =>
            <button
              key={item.route}
              onClick={() => goToRoute(item.route)}
              className="text-sm font-bold uppercase tracking-widest hover:text-[#FCEE02] transition-colors relative group px-4 py-2 border-2 border-transparent hover:border-[#FCEE02] rounded-lg"
              style={{
                color: 'var(--text-primary)'
              }}>
              
                {item.label}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Toggle theme">
              
              {theme === 'light' ?
              <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" /> :

              <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-[#FCEE02]" />
              }
            </button>

            <button
              onClick={() => goToRoute('/solicitar')}
              className="hidden md:block px-6 lg:px-8 py-3 bg-[#EC2424] text-white font-bold uppercase text-sm tracking-wider hover:bg-[#FB900D] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 border-2 border-[#EC2424] hover:border-[#FB900D] rounded-lg">
              
              Solicitar
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{
                color: 'var(--text-primary)'
              }}
              aria-label="Toggle menu">
              
              {mobileMenuOpen ?
              <X className="w-6 h-6" /> :

              <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)} />
        

        <div
          className="absolute top-20 sm:top-28 right-0 w-full sm:w-80 h-[calc(100vh-5rem)] sm:h-[calc(100vh-7rem)] border-l-2 border-[#FCEE02] overflow-y-auto transition-transform duration-300 sm:rounded-bl-2xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)'
          }}>
          
          <div className="p-6 space-y-2">
            {allNavItems.map((item, index) =>
            <button
              key={item.id}
              onClick={() =>
              item.type === 'scroll' ?
              scrollToSection(item.id) :
              goToRoute((item as any).route)
              }
              className="w-full text-left px-4 py-4 font-bold uppercase tracking-widest text-base border-b transition-all duration-200 hover:pl-6 hover:text-[#FCEE02] rounded-lg"
              style={{
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ?
                'translateX(0)' :
                'translateX(20px)',
                transition: `all 0.3s ease ${index * 0.05 + 0.1}s`
              }}>
              
                {item.type === 'scroll' ? item.label : (item as any).label}
              </button>
            )}

            <button
              onClick={() => goToRoute('/solicitar')}
              className="w-full mt-6 px-6 py-4 bg-[#EC2424] text-white font-black uppercase tracking-wider hover:bg-[#FB900D] transition-colors text-center border-2 border-[#EC2424] hover:border-[#FB900D] rounded-xl"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transition: 'all 0.3s ease 0.4s'
              }}>
              
              Solicitar Servicio
            </button>
          </div>
        </div>
      </div>
    </>);

}
function HomePage() {
  return (
    <main className="pt-20 sm:pt-28">
      <section id="nosotros">
        <HeroSection />
      </section>

      <StatsGrid />

      <section id="servicios">
        <ServicesSection />
      </section>

      <section id="precios">
        <PricesSection />
      </section>

      <section id="estaciones">
        <StationsSection />
      </section>

      <section id="carreras">
        <CareersSection />
      </section>

      <Footer />
    </main>);

}
export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen font-sans selection:bg-[#FCEE02] selection:text-[#251F1F] transition-colors duration-300 bg-[var(--bg-primary)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solicitar" element={<SolicitarPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </div>
    </BrowserRouter>);

}