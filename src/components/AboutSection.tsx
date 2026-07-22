import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { ABOUT_BIO } from '../data';
import { splitText } from '../utils/splitText';
import ianImg from '@/assets/Ian.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const textElementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        imageContainerRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: '0%' },
        {
          y: '-15%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Quote text split animation
      if (quoteRef.current) {
        const result = splitText(quoteRef.current, 'words');
        gsap.from(result.elements, {
          y: '100%',
          opacity: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Stagger other text elements
      gsap.from(textElementsRef.current.filter(Boolean), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-sobre"
      className="pt-8 pb-20 sm:pt-12 sm:pb-28 px-4 sm:px-8 md:px-16 bg-[#F5F1EC] text-[#2C2723] rounded-b-[36px] sm:rounded-b-[60px] md:rounded-b-[80px]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Image */}
        <div
          ref={imageContainerRef}
          className="relative rounded-lg overflow-hidden aspect-[3/4] w-full"
        >
          <img
            ref={imageRef}
            src={ianImg}
            alt="Ian Rafael"
            loading="lazy"
            draggable={false}
            className="absolute inset-0 w-full h-[120%] object-cover object-center will-change-transform"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col">
          <div ref={(el) => { textElementsRef.current[0] = el; }} className="mb-6">
            <span className="font-sans text-xs tracking-[0.3em] uppercase font-medium text-[#404040]/70 block mb-2">
              SOBRE <span className="font-serif italic font-normal text-current">o fotógrafo</span>
            </span>
            <h2 className="font-sans font-light text-3xl sm:text-4xl tracking-tight text-[#1E1B18]">
              Ian Rafael
            </h2>
            <div className="h-[1px] w-12 bg-[#1E1B18]/30 mt-4" />
          </div>

          <div className="mb-8 overflow-hidden">
            <h3
              ref={quoteRef}
              className="font-sans font-light text-xl sm:text-2xl leading-relaxed text-[#1E1B18] tracking-tight"
            >
              Meu olhar busca a{' '}
              <span className="font-serif italic font-normal text-current">
                essência
              </span>{' '}
              de cada história. Não fotografo poses — fotografo{' '}
              <span className="font-serif italic font-normal text-current">
                sentimentos
              </span>
              , sorrisos que escapam, olhares que dizem tudo.
            </h3>
          </div>

          <p
            ref={(el) => { textElementsRef.current[1] = el; }}
            className="font-sans text-sm leading-relaxed text-[#404040] mb-8"
          >
            {ABOUT_BIO}
          </p>

          <div
            ref={(el) => { textElementsRef.current[2] = el; }}
            className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-[#1E1B18]/60"
          >
            <MapPin size={16} />
            <span>Fortaleza, CE • Brasil</span>
          </div>
        </div>
      </div>
    </section>
  );
}
