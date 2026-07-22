import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';
import { splitText } from '../utils/splitText';
import { WHATSAPP_LINK } from '../data';

// Import white branding & sketch icons
import logoBranca from '@/assets/icons white/Logo Branca.png';
import maosBranca from '@/assets/icons white/MÃOS.png';
import paisagemBranca from '@/assets/icons white/PAISAGEM.png';
import cameraBranca from '@/assets/icons white/câmera-branca.png';
import passarosBranco from '@/assets/icons white/pássaros-branco.png';
import solBranco from '@/assets/icons white/sol-branco.png';

gsap.registerPlugin(ScrollTrigger);

export default function FooterReveal() {
  const footerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Parallax refs for white sketch icons
  const iconPaisagemRef = useRef<HTMLDivElement>(null);
  const iconPassarosRef = useRef<HTMLDivElement>(null);
  const iconCameraRef = useRef<HTMLDivElement>(null);
  const iconMaosRef = useRef<HTMLDivElement>(null);
  const iconSolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal for headline
      if (headingRef.current) {
        const result = splitText(headingRef.current, 'words');
        gsap.from(result.elements, {
          y: '100%',
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Parallax animations for white sketch icons linked to scroll reveal
      const parallaxIcons = [
        { ref: iconPaisagemRef, y: -45, x: -15, rotate: -4 },
        { ref: iconPassarosRef, y: 50, x: 20, rotate: 5 },
        { ref: iconCameraRef, y: -30, x: -25, rotate: -3 },
        { ref: iconMaosRef, y: 40, x: -15, rotate: 4 },
        { ref: iconSolRef, y: -40, x: 25, rotate: -5 },
      ];

      parallaxIcons.forEach((item) => {
        if (!item.ref.current) return;

        gsap.fromTo(
          item.ref.current,
          {
            y: item.y * 1.5,
            x: item.x * 1.2,
            opacity: 0.1,
            rotate: item.rotate * 1.5,
          },
          {
            y: item.y * -0.5,
            x: item.x * -0.5,
            opacity: 0.45,
            rotate: item.rotate,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="section-contato"
      className="fixed bottom-0 left-0 w-full h-screen z-0 bg-[#161412] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none"
    >
      {/* Background Floating Parallax Hand-Drawn White Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
        {/* Top Left: Mountain Landscape (PAISAGEM.png) */}
        <div
          ref={iconPaisagemRef}
          className="absolute left-[3%] sm:left-[6%] top-[6%] sm:top-[10%] w-[90px] sm:w-[150px] md:w-[180px] h-auto will-change-transform"
        >
          <img
            src={paisagemBranca}
            alt="Paisagem sketch"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Top Right: Flying Birds (pássaros-branco.png) */}
        <div
          ref={iconPassarosRef}
          className="absolute right-[4%] sm:right-[8%] top-[8%] sm:top-[12%] w-[80px] sm:w-[130px] md:w-[160px] h-auto will-change-transform"
        >
          <img
            src={passarosBranco}
            alt="Pássaros sketch"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Mid-Left Upper: Camera (câmera-branca.png) */}
        <div
          ref={iconCameraRef}
          className="absolute left-[8%] sm:left-[14%] top-[30%] sm:top-[34%] w-[80px] sm:w-[125px] md:w-[150px] h-auto will-change-transform"
        >
          <img
            src={cameraBranca}
            alt="Câmera sketch"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Mid-Left Lower: Hands holding sun (MÃOS.png) */}
        <div
          ref={iconMaosRef}
          className="absolute left-[2%] sm:left-[6%] top-[54%] sm:top-[56%] w-[90px] sm:w-[145px] md:w-[170px] h-auto will-change-transform"
        >
          <img
            src={maosBranca}
            alt="Mãos sketch"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Mid-Right: Sun rising (sol-branco.png) */}
        <div
          ref={iconSolRef}
          className="absolute right-[3%] sm:right-[7%] top-[46%] sm:top-[48%] w-[95px] sm:w-[155px] md:w-[185px] h-auto will-change-transform"
        >
          <img
            src={solBranco}
            alt="Sol sketch"
            className="w-full h-auto object-contain select-none"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Top Spacer / Padding */}
      <div className="w-full pt-4 sm:pt-8 text-center relative z-10">
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.3em] uppercase text-white/40 block">
          ENTRE EM CONTATO
        </span>
      </div>

      {/* Middle Content Section (Headline, Subtitle, Buttons, Logo, Location) */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-3xl mx-auto px-4 my-auto">
        {/* Main Headline */}
        <div className="overflow-hidden mb-4 sm:mb-6">
          <h2
            ref={headingRef}
            className="font-sans font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] text-white tracking-tight"
          >
            Vamos contar a sua{' '}
            <span className="font-serif italic font-normal text-current">história</span>?
          </h2>
        </div>

        <div className="h-[1px] w-16 sm:w-24 bg-white/20 mb-5 sm:mb-7" />

        <p className="font-sans text-xs sm:text-sm text-white/60 max-w-md mb-8 leading-relaxed">
          Deixe-nos eternizar os momentos mais importantes da sua vida com autenticidade, poesia e emoção.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto mb-10 sm:mb-12">
          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#00A859] hover:bg-[#008F4C] text-white transition-all duration-300 font-sans tracking-widest text-[11px] sm:text-xs uppercase shadow-lg hover:shadow-emerald-900/40 hover:scale-[1.02]"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
            <span>Falar no WhatsApp</span>
          </a>

          {/* Instagram Button */}
          <a
            href="https://instagram.com/ianrafaelfotos"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 hover:bg-white hover:text-[#1E1B18] transition-all duration-300 font-sans tracking-widest text-[11px] sm:text-xs uppercase hover:scale-[1.02]"
          >
            <Instagram size={17} />
            <span>@ianrafaelfotos</span>
          </a>
        </div>

        {/* Central White Lettering Logo (Logo Branca.png) */}
        <div className="mb-6 sm:mb-8">
          <img
            src={logoBranca}
            alt="Ian Rafael Fotografia"
            className="w-[260px] sm:w-[380px] md:w-[460px] lg:w-[520px] max-w-[85vw] h-auto object-contain select-none opacity-95"
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Location Text */}
        <div className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/35">
          FORTALEZA • CEARÁ • BRASIL
        </div>
      </div>

      {/* Bottom Bar (Copyright & Social Link) */}
      <div className="w-full relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-sans text-white/35">
        <p>© 2025 IAN RAFAEL FOTOGRAFIA</p>
        <a
          href="https://instagram.com/ianrafaelfotos"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white transition-colors"
        >
          <Instagram size={13} />
          <span>INSTAGRAM</span>
        </a>
      </div>
    </footer>
  );
}
