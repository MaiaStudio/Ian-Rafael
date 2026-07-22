import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import cameraPreta from '@/assets/icons/camerapreta.png';
import lenis from '../lenis';

interface NavbarProps {
  isVisible: boolean;
  onOpenContact?: () => void;
}

export default function Navbar({ isVisible, onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true); // Default to true at top
  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = ({
      scroll,
      limit,
      direction,
    }: {
      scroll: number;
      limit: number;
      direction: number;
    }) => {
      setIsScrolled(scroll > 100);

      // Clear any pending idle hide timer
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }

      // Check if user is near the bottom / footer area
      const isNearFooter = limit > 0 && scroll >= limit - 450;

      // 1. AT THE TOP OF THE PAGE: Navbar MUST ALWAYS BE VISIBLE
      if (scroll <= 150) {
        setIsNavVisible(true);
        return;
      }

      // 2. DOWN THE PAGE: Navbar is ONLY visible when actively scrolling UPWARDS towards top (direction === -1)
      if (direction === -1 && !isNearFooter) {
        setIsNavVisible(true);

        // Hide navbar automatically 1.2s after scrolling stops (idle state down the page)
        stopTimerRef.current = setTimeout(() => {
          setIsNavVisible(false);
        }, 1200);
      } else {
        // Hidden when scrolling down, stopped down the page, or near footer
        setIsNavVisible(false);
      }
    };

    lenis.on('scroll', handleScroll);
    return () => {
      lenis.off('scroll', handleScroll);
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      lenis.scrollTo(el, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <motion.header
      id="main-navbar"
      initial={{ opacity: 0, y: 0 }}
      animate={
        isVisible && isNavVisible
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -130 }
      }
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-[10000] transition-colors duration-500 ${
        isScrolled
          ? 'bg-[#F5F1EC]/85 backdrop-blur-md shadow-[0_1px_0_rgba(30,27,24,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between py-5 font-sans text-[11px] md:text-xs tracking-[0.25em] text-[#404040]">
          {/* Left Links */}
          <div className="flex gap-6 md:gap-12">
            <button
              id="nav-inicio"
              onClick={() => scrollTo('section-hero')}
              className="transition-all duration-300 cursor-pointer uppercase hover:text-[#1E1B18]"
            >
              Início
            </button>
            <button
              id="nav-portfolio"
              onClick={() => scrollTo('section-galeria')}
              className="transition-all duration-300 cursor-pointer uppercase hover:text-[#1E1B18] hidden sm:block"
            >
              Portfólio
            </button>
          </div>

          {/* Center Logo */}
          <button
            id="nav-logo"
            onClick={() => scrollTo('section-hero')}
            className="hover:opacity-80 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Home"
          >
            <img
              src={cameraPreta}
              alt="Ian Rafael"
              referrerPolicy="no-referrer"
              className="h-16 md:h-20 w-auto object-contain select-none"
            />
          </button>

          {/* Right Links */}
          <div className="flex gap-6 md:gap-12">
            <button
              id="nav-sobre"
              onClick={() => scrollTo('section-sobre')}
              className="transition-all duration-300 cursor-pointer uppercase hover:text-[#1E1B18] hidden sm:block"
            >
              Sobre
            </button>
            <button
              id="nav-contato"
              onClick={onOpenContact || (() => scrollTo('section-contato'))}
              className="transition-all duration-300 cursor-pointer uppercase hover:text-[#1E1B18]"
            >
              Contato
            </button>
          </div>
        </div>

        {/* Hairline Divider */}
        <div
          id="nav-divider"
          className={`h-[1px] w-full transition-colors duration-500 ${
            isScrolled ? 'bg-[#1E1B18]/8' : 'bg-[#D9D9D9]'
          }`}
        />
      </div>
    </motion.header>
  );
}
