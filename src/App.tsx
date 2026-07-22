import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import OrbitingSphere from './components/OrbitingSphere';
import ManifestoSection from './components/ManifestoSection';
import CinematicGallery from './components/CinematicGallery';
import FeaturedEnsaio from './components/FeaturedEnsaio';
import DepoimentosSection from './components/DepoimentosSection';
import AboutSection from './components/AboutSection';
import FooterReveal from './components/FooterReveal';
import ContactModal from './components/ContactModal';

export default function App() {
  const [showNav, setShowNav] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Fade in navigation after sphere cards have bloomed
    const timer = setTimeout(() => {
      setShowNav(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="grain-overlay relative bg-[#161412]">
      {/* ═══ Main Content Wrapper sitting above the fixed footer with rounded bottom corners ═══ */}
      <div className="relative z-10 bg-[#F5F1EC] shadow-[0_30px_70px_rgba(0,0,0,0.4)] mb-[100vh] rounded-b-[36px] sm:rounded-b-[60px] md:rounded-b-[80px] overflow-hidden">
        {/* Fixed Navigation */}
        <Navbar
          isVisible={showNav}
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        {/* ═══ Hero — Interactive 3D Sphere ═══ */}
        <section
          id="section-hero"
          className="relative w-screen h-screen overflow-hidden bg-[#F5F1EC] select-none"
        >
          <OrbitingSphere showBrandAndNav={showNav} />
        </section>

        {/* ═══ Manifesto — Editorial Text Reveal ═══ */}
        <ManifestoSection />

        {/* ═══ Portfolio — 3-Row Infinite Marquee ═══ */}
        <CinematicGallery />

        {/* ═══ Featured — Horizontal Scroll Ensaio ═══ */}
        <FeaturedEnsaio />

        {/* ═══ Testimonials — Client Messages ═══ */}
        <DepoimentosSection />

        {/* ═══ About — Ian Rafael ═══ */}
        <AboutSection />
      </div>

      {/* ═══ Fixed Unfold Revealed Footer (Sitting underneath z-10 content) ═══ */}
      <FooterReveal />

      {/* ═══ Contact / Budget Popup Modal ═══ */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
