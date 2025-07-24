'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function CursorEffects() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let starId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, textarea, [role="button"]');
      setIsHovering(!!isInteractive);

      // Create stars less frequently, and only when moving fast
      if (Math.random() > 0.7) { // Reduce frequency
        const newStar: Star = {
          id: starId++,
          x: e.clientX + (Math.random() - 0.5) * 20, // Add some randomness
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 6 + 3, // 3-9px
          delay: Math.random() * 0.2,
        };

        setStars(prevStars => {
          // Keep only recent stars (last 5 for better performance)
          const updatedStars = [...prevStars, newStar].slice(-5);
          return updatedStars;
        });

        // Remove stars after animation
        setTimeout(() => {
          setStars(prevStars => prevStars.filter(star => star.id !== newStar.id));
        }, 1500);
      }
    };

    // Throttle mouse move events more aggressively
    let lastTime = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime > 100) { // Update every 100ms
        handleMouseMove(e);
        lastTime = now;
      }
    };

    document.addEventListener('mousemove', throttledMouseMove);

    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor - Enhanced for interactivity */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePosition.x - (isHovering ? 12 : 8),
          top: mousePosition.y - (isHovering ? 12 : 8),
        }}
        animate={{
          scale: isHovering ? [1, 1.3, 1.1] : [1, 1.1, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <div 
          className={`rounded-full transition-all duration-300 ${
            isHovering 
              ? 'w-6 h-6 bg-gradient-golden opacity-90 shadow-glow-golden-lg' 
              : 'w-4 h-4 bg-golden-400 opacity-70 shadow-glow-golden'
          }`} 
        />
        {isHovering && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-golden opacity-50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Trailing Stars */}
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: star.x - star.size / 2,
              top: star.y - star.size / 2,
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 0.8,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0.8, 0.6, 0],
              y: [0, -20, -40],
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: star.delay,
            }}
          >
            <GoldenStar size={star.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

// Golden Star Component
function GoldenStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id="goldenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d="M12 2L14.09 8.26L20 9L15 14.74L16.18 21.02L12 17.77L7.82 21.02L9 14.74L4 9L9.91 8.26L12 2Z"
        fill="url(#goldenGradient)"
        filter="url(#glow)"
        className="animate-pulse"
      />
    </svg>
  );
}

// Sparkle Effect for Special Elements
export function SparkleEffect({ children, intensity = 'medium' }: { 
  children: React.ReactNode; 
  intensity?: 'low' | 'medium' | 'high';
}) {
  const [sparkles, setSparkles] = useState<Star[]>([]);

  useEffect(() => {
    let sparkleId = 0;
    
    const intensityConfig = {
      low: { count: 2, interval: 2000 },
      medium: { count: 3, interval: 1500 },
      high: { count: 5, interval: 1000 },
    };

    const config = intensityConfig[intensity];

    const createSparkle = () => {
      const newSparkles: Star[] = [];
      
      for (let i = 0; i < config.count; i++) {
        newSparkles.push({
          id: sparkleId++,
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          delay: Math.random() * 0.5,
        });
      }

      setSparkles(prev => [...prev, ...newSparkles]);

      // Remove sparkles after animation
      setTimeout(() => {
        setSparkles(prev => 
          prev.filter(sparkle => !newSparkles.find(ns => ns.id === sparkle.id))
        );
      }, 3000);
    };

    const interval = setInterval(createSparkle, config.interval);
    createSparkle(); // Initial sparkles

    return () => clearInterval(interval);
  }, [intensity]);

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
              }}
              initial={{
                scale: 0,
                rotate: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180],
                opacity: [0, 0.8, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
                delay: sparkle.delay,
              }}
            >
              <GoldenStar size={sparkle.size} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
