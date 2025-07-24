'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
  id: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface StarFallingAnimationProps {
  intensity?: 'low' | 'medium' | 'high';
  color?: 'golden' | 'amber' | 'mixed';
}

export function StarFallingAnimation({ 
  intensity = 'medium',
  color = 'golden'
}: StarFallingAnimationProps) {
  const [stars, setStars] = useState<Star[]>([]);

  const starCount = {
    low: 10,
    medium: 18,
    high: 30
  }[intensity];

  const colors = {
    golden: ['#FFD700', '#D4AF37', '#FFA500'],
    amber: ['#FF8C00', '#FFB347', '#FFDB58'],
    mixed: ['#FFD700', '#D4AF37', '#FF8C00', '#FFB347', '#FFDB58']
  }[color];

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: `star-${i}-${Date.now()}`,
          x: Math.random() * 100,
          y: -10,
          size: Math.random() * 2 + 1.5, // Smaller stars for laptops
          duration: Math.random() * 4 + 3, // Slower falling
          delay: Math.random() * 6,
          opacity: Math.random() * 0.7 + 0.3
        });
      }
      setStars(newStars);
    };

    generateStars();
    const interval = setInterval(generateStars, 8000);
    return () => clearInterval(interval);
  }, [starCount]);

  const StarIcon = ({ size, color }: { size: number; color: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className="drop-shadow-sm"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute"
            initial={{
              x: `${star.x}%`,
              y: `${star.y}%`,
              opacity: 0,
              scale: 0,
              rotate: 0
            }}
            animate={{
              x: `${star.x + (Math.random() - 0.5) * 20}%`,
              y: '110%',
              opacity: [0, star.opacity, star.opacity, 0],
              scale: [0, 1, 1, 0],
              rotate: 360
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              ease: 'easeInOut',
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: star.duration
              }
            }}
            style={{
              left: 0,
              top: 0
            }}
          >
            <StarIcon 
              size={star.size * 4} 
              color={colors[Math.floor(Math.random() * colors.length)]}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Additional twinkling effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`twinkle-${i}`}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  );
}
