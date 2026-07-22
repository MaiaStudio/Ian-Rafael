import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECT_GALLERIES } from '../data';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedEnsaio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const ensaioPhotos = PROJECT_GALLERIES['Anderson e Klyvia'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const progress = progressFillRef.current;

      if (!track || !progress) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          gsap.set(progress, { scaleX: self.progress });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section-ensaio"
      ref={sectionRef}
      className="bg-[#1E1B18] text-white/90 relative overflow-hidden h-screen"
    >
      <div
        ref={trackRef}
        className="flex flex-row gap-6 sm:gap-8 h-screen items-center px-8 sm:px-16 w-max"
      >
        {/* Title Card */}
        <div className="w-[80vw] sm:w-[40vw] flex-shrink-0 flex flex-col justify-center">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3">
            ENSAIO DESTAQUE
          </span>
          <h2 className="font-sans font-light text-5xl sm:text-7xl mb-4 leading-tight text-white tracking-tight">
            Anderson <br />
            <span className="font-serif italic font-normal text-current">& Klyvia</span>
          </h2>
          <div className="h-[1px] w-16 bg-white/20 mb-6" />
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/50">
            Pré-Wedding • Cumbuco, CE
          </p>
        </div>

        {/* Photo Items */}
        {ensaioPhotos.map((url, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[75vw] sm:w-[38vw] h-[70vh] rounded-lg overflow-hidden photo-card"
          >
            <img
              src={url}
              alt={`Anderson & Klyvia - ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}

        {/* Final Text */}
        <div className="flex-shrink-0 w-[80vw] sm:w-[40vw] flex items-center justify-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 text-center">
            12 registros <br />
            <br /> Ensaio completo
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-[1px] bg-white/10 w-full relative origin-left rounded-full overflow-hidden">
          <div
            ref={progressFillRef}
            className="absolute top-0 left-0 h-full bg-white/60 w-full origin-left scale-x-0"
          />
        </div>
      </div>
    </section>
  );
}
