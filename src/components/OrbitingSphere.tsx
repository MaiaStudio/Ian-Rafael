import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { getFibonacciSphereItems } from '../data';
import { PortfolioItem } from '../types';
import logoImg from '@/assets/Logo Lettering Ian.png';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

// Import hand-drawn icons
import cameraPreta from '@/assets/icons/camerapreta.png';
import passarosPreto from '@/assets/icons/pássaros-preto.png';
import preWedding from '@/assets/icons/PRÉ WEDDING.png';
import ensaio from '@/assets/icons/ENSAIO.png';
import paisagem from '@/assets/icons/PAISAGEM.png';
import solPreto from '@/assets/icons/sol-preto.png';

interface OrbitingSphereProps {
  showBrandAndNav: boolean;
}

// Visual and physical constant parameters
const IDLE_SPIN_SPEED = (2 * Math.PI) / 50; // One full rotation every 50 seconds
const DRAG_SENSITIVITY = 0.0035;
const FRICTION = 0.95;
const TILT_CLAMP = 25 * (Math.PI / 180);

export default function OrbitingSphere({ showBrandAndNav }: OrbitingSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, radius: 0 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Sync state to refs for uninterrupted 60FPS loop
  const hoveredIdRef = useRef<number | null>(hoveredId);
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  const showBrandAndNavRef = useRef(showBrandAndNav);
  useEffect(() => {
    showBrandAndNavRef.current = showBrandAndNav;
  }, [showBrandAndNav]);

  // Hardware-accelerated motion values for parallax
  const rawParallaxX = useMotionValue(0);
  const rawParallaxY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 85, mass: 0.5 };
  const smoothParallaxX = useSpring(rawParallaxX, springConfig);
  const smoothParallaxY = useSpring(rawParallaxY, springConfig);

  // Depth-layer transforms for floating sketch icons
  const parallaxSunX = useTransform(smoothParallaxX, (v) => v * -45);
  const parallaxSunY = useTransform(smoothParallaxY, (v) => v * -45);

  const parallaxPreWeddingX = useTransform(smoothParallaxX, (v) => v * -22);
  const parallaxPreWeddingY = useTransform(smoothParallaxY, (v) => v * -22);

  const parallaxCameraX = useTransform(smoothParallaxX, (v) => v * -65);
  const parallaxCameraY = useTransform(smoothParallaxY, (v) => v * -65);

  const parallaxBirdsX = useTransform(smoothParallaxX, (v) => v * -28);
  const parallaxBirdsY = useTransform(smoothParallaxY, (v) => v * -28);

  const parallaxEnsaioX = useTransform(smoothParallaxX, (v) => v * -15);
  const parallaxEnsaioY = useTransform(smoothParallaxY, (v) => v * -15);

  const parallaxLandscapeX = useTransform(smoothParallaxX, (v) => v * -55);
  const parallaxLandscapeY = useTransform(smoothParallaxY, (v) => v * -55);

  const parallaxLogoX = useTransform(smoothParallaxX, (v) => v * -16);
  const parallaxLogoY = useTransform(smoothParallaxY, (v) => v * -16);

  // Core physical state
  const angleY = useRef<number>(0);
  const angleX = useRef<number>(0);
  const velY = useRef<number>(IDLE_SPIN_SPEED / 60);
  const velX = useRef<number>(0);

  const isDragging = useRef<boolean>(false);
  const dragStartMouse = useRef({ x: 0, y: 0 });
  const dragStartAngles = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const startTime = useRef<number>(Date.now());

  // Cards data
  const cards = useRef<PortfolioItem[]>(getFibonacciSphereItems());

  // Current animated positions for all cards
  const cardStates = useRef(
    Array.from({ length: cards.current.length }, () => ({
      x: 0,
      y: 0,
      z: 0,
      scale: 0.7,
      opacity: 0,
      isInitialized: false,
    }))
  );

  // Store hover lock coordinates
  const hoverLockCoords = useRef<{ x: number; y: number }[]>(
    Array.from({ length: cards.current.length }, () => ({ x: 0, y: 0 }))
  );

  // State to drive React render cycle at 60fps
  const [renderItems, setRenderItems] = useState<any[]>([]);

  // 1. Measure viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const minDim = Math.min(width, height);
      const radius = minDim * 0.38;
      setDimensions({ width, height, radius });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // 2. Continuous 60FPS Physics & Rendering Loop
  useEffect(() => {
    if (dimensions.radius === 0) return;

    let animationId: number;
    const isMobile = dimensions.width < 768;

    const tick = () => {
      const now = Date.now();
      const elapsedSeconds = (now - startTime.current) / 1000;
      const R = dimensions.radius;
      const currentHoveredId = hoveredIdRef.current;

      // Handle rotation physics
      if (!isDragging.current) {
        velY.current = velY.current * FRICTION + (IDLE_SPIN_SPEED / 60) * (1 - FRICTION);
        velX.current = velX.current * FRICTION;

        angleY.current += velY.current;
        angleX.current += velX.current;

        // Slowly return tilt to 0
        angleX.current += (0 - angleX.current) * 0.015;
      }
      angleX.current = Math.max(-TILT_CLAMP, Math.min(TILT_CLAMP, angleX.current));

      // Calculate positions for all cards
      cards.current.forEach((card, i) => {
        const state = cardStates.current[i];

        const cosX = Math.cos(angleX.current);
        const sinX = Math.sin(angleX.current);
        const cosY = Math.cos(angleY.current);
        const sinY = Math.sin(angleY.current);

        const y1 = card.y0 * cosX - card.z0 * sinX;
        const z1 = card.y0 * sinX + card.z0 * cosX;
        const x1 = card.x0;

        const x2 = x1 * cosY + z1 * sinY;
        const z2 = -x1 * sinY + z1 * cosY;
        const y2 = y1;

        // On mobile, expand the horizontal & vertical orbit boundaries so cards spread gracefully
        const rx = isMobile ? Math.max(R * 1.45, dimensions.width * 0.42) : R * 1.55;
        const ry = isMobile ? Math.max(R * 1.15, dimensions.height * 0.28) : R * 0.95;

        let orbitX = x2 * rx;
        let orbitY = y2 * ry;
        const orbitZ = z2 * R;

        // Push cards strongly away from the center logo area on mobile
        const normalizedX = orbitX / rx;
        const normalizedY = orbitY / ry;
        const dist2D = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);

        const clearanceRadius = isMobile ? 0.62 : 0.48;
        if (dist2D < clearanceRadius) {
          const ratio = dist2D / clearanceRadius;
          const pushFactor = isMobile
            ? 1.0 + Math.pow(1 - ratio, 1.4) * 1.25
            : 1.0 + Math.pow(1 - ratio, 1.8) * 0.75;
          orbitX *= pushFactor;
          orbitY *= pushFactor;
        }

        // Subtle bobbing animation
        const bob = 6 * Math.sin((elapsedSeconds * (2 * Math.PI)) / 4 + card.bobOffset);

        // Materialization progress (staggered appearance on load)
        const cardDelay = i * 0.12;
        let matProgress = 0;
        if (elapsedSeconds > cardDelay) {
          matProgress = Math.min(1, (elapsedSeconds - cardDelay) / 0.6);
        }

        let targetX = orbitX;
        let targetY = orbitY + bob;
        let targetZ = orbitZ;
        let targetScale = (0.6 + 0.4 * matProgress) * (0.8 + (orbitZ / R) * 0.38);
        const depthFactor = (orbitZ / R + 1) / 2;
        let targetOpacity = matProgress * (0.15 + 0.85 * depthFactor);

        // Hover state: enlarge and bring forward
        if (currentHoveredId === i) {
          targetX = hoverLockCoords.current[i].x;
          targetY = hoverLockCoords.current[i].y;
          targetZ = R + 40;
          targetScale = 1.45;
          targetOpacity = 1.0;
        }

        // Smooth interpolation
        const lerpFactor = currentHoveredId === i ? 0.14 : 0.09;

        if (!state.isInitialized) {
          state.x = targetX;
          state.y = targetY;
          state.z = targetZ;
          state.scale = targetScale;
          state.opacity = targetOpacity;
          state.isInitialized = true;
        } else {
          state.x += (targetX - state.x) * lerpFactor;
          state.y += (targetY - state.y) * lerpFactor;
          state.z += (targetZ - state.z) * (currentHoveredId === i ? 0.16 : 0.09);
          state.scale += (targetScale - state.scale) * lerpFactor;
          state.opacity += (targetOpacity - state.opacity) * 0.12;
        }
      });

      // Generate render list
      const items: any[] = cards.current.map((card, i) => ({
        type: 'card' as const,
        id: card.id,
        url: card.url,
        title: card.title,
        x: cardStates.current[i].x,
        y: cardStates.current[i].y,
        z: cardStates.current[i].z,
        scale: cardStates.current[i].scale,
        opacity: cardStates.current[i].opacity,
        isHovered: currentHoveredId === i,
      }));

      // Central logo
      items.push({
        type: 'logo' as const,
        id: -99,
        url: '',
        title: 'IAN RAFAEL',
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        opacity: showBrandAndNavRef.current ? 1 : 0,
        isHovered: false,
      });

      setRenderItems(items);
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  // Mouse / Touch Handlers
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    setHoveredId(null);
    dragStartMouse.current = { x: clientX, y: clientY };
    dragStartAngles.current = { x: angleX.current, y: angleY.current };
    lastMousePos.current = { x: clientX, y: clientY, time: Date.now() };
    velY.current = 0;
    velX.current = 0;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;

    const dx = clientX - dragStartMouse.current.x;
    const dy = clientY - dragStartMouse.current.y;
    const now = Date.now();
    const dt = now - lastMousePos.current.time || 1;

    angleY.current = dragStartAngles.current.y + dx * DRAG_SENSITIVITY;
    angleX.current = dragStartAngles.current.x + dy * DRAG_SENSITIVITY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    velY.current = (deltaX * DRAG_SENSITIVITY) / (dt / 16.66);
    velX.current = (deltaY * DRAG_SENSITIVITY) / (dt / 16.66);

    lastMousePos.current = { x: clientX, y: clientY, time: now };
  };

  const handleEnd = () => {
    isDragging.current = false;
  };

  const onMouseDown = (e: MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // Update parallax
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawParallaxX.set(x);
      rawParallaxY.set(y);
    }
    handleMove(e.clientX, e.clientY);
  };

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleCardMouseEnter = (id: number) => {
    if (isDragging.current) return;
    const currentState = cardStates.current[id];
    hoverLockCoords.current[id] = {
      x: currentState.x,
      y: currentState.y,
    };
    setHoveredId(id);
  };

  const handleCardMouseLeave = () => {
    setHoveredId(null);
  };

  const isMobile = dimensions.width < 768;

  return (
    <div
      ref={containerRef}
      id="orbiting-sphere-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={handleEnd}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none flex items-center justify-center ${
        isDragging.current ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* 3D Canvas space */}
      <div className="relative w-full h-full flex items-center justify-center">
        {renderItems.map((item) => {
          const computedZIndex = Math.round(1000 + item.z);

          if (item.type === 'logo') {
            return (
              <div
                key="central-logo"
                id="central-logo"
                style={{ zIndex: computedZIndex }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center justify-center"
              >
                <motion.div
                  style={{
                    x: parallaxLogoX,
                    y: parallaxLogoY,
                    opacity: item.opacity,
                    transition: 'opacity 1.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    willChange: 'transform, opacity',
                  }}
                  className="flex items-center justify-center"
                >
                  <img
                    src={logoImg}
                    alt="Ian Rafael Logo"
                    referrerPolicy="no-referrer"
                    decoding="async"
                    className="w-[200px] sm:w-[320px] md:w-[420px] lg:w-[540px] max-w-[85vw] h-auto object-contain"
                  />
                </motion.div>
              </div>
            );
          }

          const shadowAlpha = item.isHovered ? 0.15 : 0.08;
          const shadowStyle =
            shadowAlpha > 0 ? `0 4px 20px rgba(42, 37, 32, ${shadowAlpha})` : 'none';

          const currentCardWidth = isMobile ? 70 : 155;
          const currentCardHeight = isMobile ? 95 : 210;

          return (
            <div
              key={`card-${item.id}`}
              id={`portfolio-card-${item.id}`}
              className="portfolio-card absolute top-1/2 left-1/2 bg-white border border-[#F0ECE6]/40 rounded-xs group overflow-hidden transition-shadow duration-300 pointer-events-auto"
              style={{
                width: `${currentCardWidth}px`,
                height: `${currentCardHeight}px`,
                transform: `translate3d(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px), 0px) scale(${item.scale})`,
                opacity: item.opacity,
                zIndex: computedZIndex,
                boxShadow: shadowStyle,
                willChange: 'transform, opacity',
                filter:
                  item.z < -50
                    ? `blur(${Math.min(4, Math.abs(item.z + 50) * 0.02).toFixed(2)}px)`
                    : 'none',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              onMouseEnter={() => handleCardMouseEnter(item.id)}
              onMouseLeave={handleCardMouseLeave}
            >
              <div className="w-full h-full relative">
                <img
                  src={item.url}
                  alt={item.title}
                  draggable="false"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  className="w-full h-full select-none pointer-events-none transition-transform duration-700 ease-out object-cover group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#F5F1EC]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Parallax Hand-Drawn Icons (always visible) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[50]">
        {/* Sun */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          style={{ x: parallaxSunX, y: parallaxSunY }}
          className="absolute left-[3%] sm:left-[6%] top-[10%] sm:top-[14%] w-[75px] sm:w-[150px] h-auto"
        >
          <motion.img
            src={solPreto}
            alt="Sun sketch"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* PRÉ WEDDING */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
          style={{ x: parallaxPreWeddingX, y: parallaxPreWeddingY }}
          className="absolute left-[2%] sm:left-[4%] top-[34%] sm:top-[40%] w-[95px] sm:w-[190px] h-auto"
        >
          <motion.img
            src={preWedding}
            alt="Pré Wedding text"
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Camera */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.9 }}
          style={{ x: parallaxCameraX, y: parallaxCameraY }}
          className="absolute left-[3%] sm:left-[8%] top-[72%] sm:top-[68%] w-[65px] sm:w-[130px] h-auto"
        >
          <motion.img
            src={cameraPreta}
            alt="Camera sketch"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Birds */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.35, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
          style={{ x: parallaxBirdsX, y: parallaxBirdsY }}
          className="absolute right-[4%] sm:right-[10%] top-[10%] sm:top-[16%] w-[70px] sm:w-[130px] h-auto"
        >
          <motion.img
            src={passarosPreto}
            alt="Birds sketch"
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ENSAIO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
          style={{ x: parallaxEnsaioX, y: parallaxEnsaioY }}
          className="absolute right-[2%] sm:right-[6%] top-[36%] sm:top-[43%] w-[90px] sm:w-[180px] h-auto"
        >
          <motion.img
            src={ensaio}
            alt="Ensaio text"
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* Landscape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showBrandAndNav ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 1.0 }}
          style={{ x: parallaxLandscapeX, y: parallaxLandscapeY }}
          className="absolute right-[3%] sm:right-[8%] top-[74%] sm:top-[70%] w-[75px] sm:w-[140px] h-auto"
        >
          <motion.img
            src={paisagem}
            alt="Landscape sketch"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            decoding="async"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showBrandAndNav ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[60] pointer-events-none"
      >
        <span className="font-tenor text-[10px] tracking-[0.3em] uppercase text-[#1E1B18]/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-6 bg-[#1E1B18]/20"
        />
      </motion.div>
    </div>
  );
}
