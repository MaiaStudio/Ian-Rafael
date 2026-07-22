import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RAW_IMAGES, getProjectGallery } from '../data';
import lenis from '../lenis';

gsap.registerPlugin(ScrollTrigger);

// Combine all available images for a rich 3-row layout
const ALL_PHOTOS = [
  ...RAW_IMAGES,
  ...getProjectGallery('Anderson e Klyvia').map((url, i) => ({
    url,
    title: `Anderson & Klyvia ${i + 1}`,
    category: 'Pré-Wedding',
    location: 'Cumbuco • CE',
  })),
];

// Split photos into 3 rows
const ROW_1_IMAGES = ALL_PHOTOS.slice(0, 10);
const ROW_2_IMAGES = ALL_PHOTOS.slice(10, 20);
const ROW_3_IMAGES = ALL_PHOTOS.slice(20, 30);

export default function CinematicGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerLineRef = useRef<HTMLDivElement>(null);

  const row1TrackRef = useRef<HTMLDivElement>(null);
  const row2TrackRef = useRef<HTMLDivElement>(null);
  const row3TrackRef = useRef<HTMLDivElement>(null);

  const row1SetRef = useRef<HTMLDivElement>(null);
  const row2SetRef = useRef<HTMLDivElement>(null);
  const row3SetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });

      gsap.from(headerLineRef.current, {
        scaleX: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    // Continuous 120FPS Marquee Physics with Scroll-Velocity Acceleration
    let pos1 = 0;
    let pos2 = 0;
    let pos3 = 0;

    let scrollVel = 0;
    let scrollBoost = 0;

    const handleScroll = ({ velocity }: { velocity: number }) => {
      scrollVel = Math.abs(velocity);
    };

    lenis.on('scroll', handleScroll);

    const BASE_SPEED = 0.65; // Slow continuous auto-scroll

    const tickHandler = () => {
      // Smooth lerp for scroll boost
      const targetBoost = scrollVel * 0.35;
      scrollBoost += (targetBoost - scrollBoost) * 0.1;
      scrollVel *= 0.92; // Decay

      const activeSpeed = BASE_SPEED + scrollBoost;

      pos1 += activeSpeed;
      pos2 += activeSpeed;
      pos3 += activeSpeed;

      // Row 1: Right to Left (dir = -1)
      if (row1TrackRef.current && row1SetRef.current) {
        const w1 = row1SetRef.current.offsetWidth;
        if (w1 > 0) {
          const x1 = -(pos1 % w1);
          row1TrackRef.current.style.transform = `translate3d(${x1}px, 0, 0)`;
        }
      }

      // Row 2: Left to Right (dir = +1)
      if (row2TrackRef.current && row2SetRef.current) {
        const w2 = row2SetRef.current.offsetWidth;
        if (w2 > 0) {
          const x2 = -(w2 - (pos2 % w2));
          row2TrackRef.current.style.transform = `translate3d(${x2}px, 0, 0)`;
        }
      }

      // Row 3: Right to Left (dir = -1)
      if (row3TrackRef.current && row3SetRef.current) {
        const w3 = row3SetRef.current.offsetWidth;
        if (w3 > 0) {
          const x3 = -(pos3 % w3);
          row3TrackRef.current.style.transform = `translate3d(${x3}px, 0, 0)`;
        }
      }
    };

    gsap.ticker.add(tickHandler);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickHandler);
      lenis.off('scroll', handleScroll);
    };
  }, []);

  const renderCard = (img: any, idx: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${idx}`}
      className="relative flex-shrink-0 w-44 h-44 sm:w-60 sm:h-60 rounded-2xl sm:rounded-[24px] overflow-hidden group cursor-pointer border border-[#1E1B18]/10 bg-white shadow-sm hover:shadow-lg transition-all duration-300 select-none"
    >
      <img
        src={img.url}
        alt={img.title || 'Foto Ian Rafael'}
        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="flex flex-col text-white">
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/80">
            {img.category || 'Fotografia'}
          </span>
          <span className="font-sans text-xs font-medium">{img.location || 'Fortaleza • CE'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="section-galeria"
      ref={sectionRef}
      className="bg-[#F5F1EC] pt-12 pb-16 sm:pt-20 sm:pb-28 overflow-hidden"
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex flex-col items-center justify-center mb-10 sm:mb-14 text-center px-4"
      >
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#404040]/60 mb-3">
          PORTFÓLIO
        </span>
        <h2 className="font-sans font-light text-3xl sm:text-5xl text-[#1E1B18] tracking-tight">
          Histórias <span className="font-serif italic font-normal text-current">eternizadas</span> em imagens
        </h2>
        <div ref={headerLineRef} className="h-[1px] w-20 bg-[#1E1B18]/20 mt-6 origin-center" />
      </div>

      {/* 3-Row Infinite Asynchronous Marquee */}
      <div className="space-y-4 sm:space-y-6 w-full">
        {/* Row 1: Right to Left (<---) */}
        <div className="overflow-hidden w-full">
          <div ref={row1TrackRef} className="flex gap-4 sm:gap-6 w-max will-change-transform">
            {/* Single Set (Measured) */}
            <div ref={row1SetRef} className="flex gap-4 sm:gap-6">
              {ROW_1_IMAGES.map((img, i) => renderCard(img, i, 'r1-set1'))}
            </div>
            {/* Duplicate Set 2 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_1_IMAGES.map((img, i) => renderCard(img, i, 'r1-set2'))}
            </div>
            {/* Duplicate Set 3 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_1_IMAGES.map((img, i) => renderCard(img, i, 'r1-set3'))}
            </div>
          </div>
        </div>

        {/* Row 2: Left to Right (--->) */}
        <div className="overflow-hidden w-full">
          <div ref={row2TrackRef} className="flex gap-4 sm:gap-6 w-max will-change-transform">
            {/* Single Set (Measured) */}
            <div ref={row2SetRef} className="flex gap-4 sm:gap-6">
              {ROW_2_IMAGES.map((img, i) => renderCard(img, i, 'r2-set1'))}
            </div>
            {/* Duplicate Set 2 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_2_IMAGES.map((img, i) => renderCard(img, i, 'r2-set2'))}
            </div>
            {/* Duplicate Set 3 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_2_IMAGES.map((img, i) => renderCard(img, i, 'r2-set3'))}
            </div>
          </div>
        </div>

        {/* Row 3: Right to Left (<---) */}
        <div className="overflow-hidden w-full">
          <div ref={row3TrackRef} className="flex gap-4 sm:gap-6 w-max will-change-transform">
            {/* Single Set (Measured) */}
            <div ref={row3SetRef} className="flex gap-4 sm:gap-6">
              {ROW_3_IMAGES.map((img, i) => renderCard(img, i, 'r3-set1'))}
            </div>
            {/* Duplicate Set 2 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_3_IMAGES.map((img, i) => renderCard(img, i, 'r3-set2'))}
            </div>
            {/* Duplicate Set 3 */}
            <div className="flex gap-4 sm:gap-6">
              {ROW_3_IMAGES.map((img, i) => renderCard(img, i, 'r3-set3'))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
