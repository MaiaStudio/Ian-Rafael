import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitText } from '../utils/splitText';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const result = splitText(textRef.current, 'words');

        // Main text animation with scrub
        gsap.from(result.elements, {
          y: '100%',
          duration: 1,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        });

        // Line animation
        gsap.from(lineRef.current, {
          scaleX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });

        // Signature fade in
        gsap.from(signatureRef.current, {
          opacity: 0,
          y: 10,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-manifesto"
      ref={sectionRef}
      className="min-h-[40vh] sm:min-h-[60vh] bg-[#F5F1EC] flex flex-col items-center justify-center py-12 sm:py-24 px-6 sm:px-8"
    >
      <div className="w-16 h-[1px] bg-[#1E1B18]/30 mb-8 sm:mb-12 origin-center" ref={lineRef} />

      <div className="max-w-[880px] text-center overflow-hidden mb-8 sm:mb-12">
        <h2
          ref={textRef}
          className="font-sans font-light text-[clamp(1.5rem,3.4vw,3.1rem)] text-[#1E1B18] leading-[1.45] tracking-tight"
        >
          Acredito na fotografia{' '}
          <span className="font-serif italic font-normal text-current">viva</span>,{' '}
          <span className="font-serif italic font-normal text-current">autêntica</span>{' '}
          e{' '}
          <span className="font-serif italic font-normal text-current">emocional</span>.{' '}
          Cada casal e cada momento possuem uma{' '}
          <span className="font-serif italic font-normal text-current">poesia única</span>{' '}
          — que merece ser eternizada sem fórmulas prontas, sem padrões rígidos. Apenas a{' '}
          <span className="font-serif italic font-normal text-current">verdade</span>{' '}
          do instante.
        </h2>
      </div>

      <div
        ref={signatureRef}
        className="font-sans text-xs tracking-[0.3em] uppercase opacity-50 text-[#1E1B18]"
      >
        — Ian Rafael
      </div>
    </section>
  );
}
