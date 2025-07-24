'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SectionBackgroundProps {
  variant?: 'subtle' | 'medium' | 'intense';
  pattern?: 'dots' | 'lines' | 'waves' | 'geometric';
  color?: 'golden' | 'amber' | 'mixed';
}

export function SectionBackground({ 
  variant = 'medium', 
  pattern = 'geometric',
  color = 'golden' 
}: SectionBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const intensityConfig = {
    subtle: { opacity: 0.03, count: 3, size: 0.8 },
    medium: { opacity: 0.05, count: 5, size: 1 },
    intense: { opacity: 0.08, count: 8, size: 1.2 },
  };

  const colorConfig = {
    golden: {
      primary: 'rgba(212, 175, 55, ',
      secondary: 'rgba(255, 215, 0, ',
    },
    amber: {
      primary: 'rgba(255, 140, 0, ',
      secondary: 'rgba(251, 191, 36, ',
    },
    mixed: {
      primary: 'rgba(212, 175, 55, ',
      secondary: 'rgba(255, 140, 0, ',
    },
  };

  const config = intensityConfig[variant];
  const colors = colorConfig[color];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pattern === 'dots' && <DotsPattern config={config} colors={colors} />}
      {pattern === 'lines' && <LinesPattern config={config} colors={colors} />}
      {pattern === 'waves' && <WavesPattern config={config} colors={colors} />}
      {pattern === 'geometric' && <GeometricPattern config={config} colors={colors} />}
    </div>
  );
}

// Dots Pattern
function DotsPattern({ config, colors }: { config: any; colors: any }) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: config.count * 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: `${colors.primary}${config.opacity * 10})`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [config.opacity, config.opacity * 2, config.opacity],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}

// Lines Pattern
function LinesPattern({ config, colors }: { config: any; colors: any }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {Array.from({ length: config.count }).map((_, i) => (
        <motion.line
          key={i}
          x1={`${Math.random() * 100}%`}
          y1={`${Math.random() * 100}%`}
          x2={`${Math.random() * 100}%`}
          y2={`${Math.random() * 100}%`}
          stroke={`${colors.primary}${config.opacity * 5})`}
          strokeWidth="0.1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: Math.random() * 4 + 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </svg>
  );
}

// Waves Pattern
function WavesPattern({ config, colors }: { config: any; colors: any }) {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`waveGrad-${Date.now()}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={`${colors.primary}0)`} />
          <stop offset="50%" stopColor={`${colors.primary}${config.opacity * 5})`} />
          <stop offset="100%" stopColor={`${colors.secondary}0)`} />
        </linearGradient>
      </defs>
      
      {Array.from({ length: config.count }).map((_, i) => (
        <motion.path
          key={i}
          d={`M0,${20 + i * 15} Q25,${15 + i * 15} 50,${20 + i * 15} T100,${20 + i * 15}`}
          stroke={`url(#waveGrad-${Date.now()})`}
          strokeWidth="0.2"
          fill="none"
          animate={{
            d: [
              `M0,${20 + i * 15} Q25,${15 + i * 15} 50,${20 + i * 15} T100,${20 + i * 15}`,
              `M0,${25 + i * 15} Q25,${20 + i * 15} 50,${25 + i * 15} T100,${25 + i * 15}`,
              `M0,${20 + i * 15} Q25,${15 + i * 15} 50,${20 + i * 15} T100,${20 + i * 15}`,
            ]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

// Geometric Pattern
function GeometricPattern({ config, colors }: { config: any; colors: any }) {
  const shapes = ['circle', 'square', 'triangle', 'hexagon'];
  
  return (
    <div className="absolute inset-0">
      {Array.from({ length: config.count }).map((_, i) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 40 + 20;
        
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {shape === 'circle' && (
              <div
                className="rounded-full border"
                style={{
                  width: size,
                  height: size,
                  borderColor: `${colors.primary}${config.opacity * 3})`,
                  backgroundColor: `${colors.primary}${config.opacity})`,
                }}
              />
            )}
            
            {shape === 'square' && (
              <div
                className="border transform rotate-45"
                style={{
                  width: size,
                  height: size,
                  borderColor: `${colors.secondary}${config.opacity * 3})`,
                  backgroundColor: `${colors.secondary}${config.opacity})`,
                }}
              />
            )}
            
            {shape === 'triangle' && (
              <svg width={size} height={size} viewBox="0 0 24 24">
                <path
                  d="M12 2L22 20H2L12 2Z"
                  fill={`${colors.primary}${config.opacity})`}
                  stroke={`${colors.primary}${config.opacity * 3})`}
                  strokeWidth="1"
                />
              </svg>
            )}
            
            {shape === 'hexagon' && (
              <svg width={size} height={size} viewBox="0 0 24 24">
                <path
                  d="M17.5 3.5L22 12L17.5 20.5H6.5L2 12L6.5 3.5H17.5Z"
                  fill={`${colors.secondary}${config.opacity})`}
                  stroke={`${colors.secondary}${config.opacity * 3})`}
                  strokeWidth="1"
                />
              </svg>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
