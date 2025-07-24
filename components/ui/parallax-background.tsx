'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'glow' | 'ring' | 'dot';
}

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  // Parallax transforms for different layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  
  // Smooth spring animations
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  // Initialize floating elements
  useEffect(() => {
    const elements: FloatingElement[] = [];
    
    for (let i = 0; i < 12; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100, // Percentage
        y: Math.random() * 100,
        size: Math.random() * 100 + 50, // 50-150px
        speed: Math.random() * 0.5 + 0.2,
        type: ['glow', 'ring', 'dot'][Math.floor(Math.random() * 3)] as FloatingElement['type'],
      });
    }
    
    setFloatingElements(elements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Layer 1 - Slowest moving background */}
      <motion.div style={{ y: springY1 }} className="absolute inset-0">
        {floatingElements.slice(0, 4).map(element => (
          <motion.div
            key={`layer1-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + element.id * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ParallaxElement type={element.type} size={element.size} opacity={0.1} />
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 2 - Medium speed */}
      <motion.div style={{ y: springY2 }} className="absolute inset-0">
        {floatingElements.slice(4, 8).map(element => (
          <motion.div
            key={`layer2-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 15 + element.id,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ParallaxElement type={element.type} size={element.size * 0.7} opacity={0.15} />
          </motion.div>
        ))}
      </motion.div>

      {/* Layer 3 - Fastest moving foreground */}
      <motion.div style={{ y: springY3 }} className="absolute inset-0">
        {floatingElements.slice(8, 12).map(element => (
          <motion.div
            key={`layer3-${element.id}`}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10 + element.id,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ParallaxElement type={element.type} size={element.size * 0.5} opacity={0.2} />
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Background Waves */}
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 215, 0, 0.05)" />
              <stop offset="50%" stopColor="rgba(212, 175, 55, 0.03)" />
              <stop offset="100%" stopColor="rgba(255, 140, 0, 0.02)" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 140, 0, 0.04)" />
              <stop offset="50%" stopColor="rgba(212, 175, 55, 0.02)" />
              <stop offset="100%" stopColor="rgba(255, 215, 0, 0.03)" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z"
            fill="url(#waveGradient1)"
            animate={{
              d: [
                "M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z",
                "M0,350 Q250,250 500,350 T1000,350 L1000,1000 L0,1000 Z",
                "M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.path
            d="M0,600 Q250,500 500,600 T1000,600 L1000,1000 L0,1000 Z"
            fill="url(#waveGradient2)"
            animate={{
              d: [
                "M0,600 Q250,500 500,600 T1000,600 L1000,1000 L0,1000 Z",
                "M0,550 Q250,450 500,550 T1000,550 L1000,1000 L0,1000 Z",
                "M0,600 Q250,500 500,600 T1000,600 L1000,1000 L0,1000 Z",
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </svg>
      </div>

      {/* Constellation Effect */}
      <ConstellationBackground />
    </div>
  );
}

// Parallax Element Component
function ParallaxElement({ type, size, opacity }: {
  type: FloatingElement['type'];
  size: number;
  opacity: number;
}) {
  switch (type) {
    case 'glow':
      return (
        <div
          className="rounded-full bg-gradient-radial from-golden-400 to-transparent blur-xl"
          style={{
            width: size,
            height: size,
            opacity,
          }}
        />
      );
    
    case 'ring':
      return (
        <div
          className="rounded-full border border-golden-400/30"
          style={{
            width: size,
            height: size,
            opacity,
          }}
        />
      );
    
    case 'dot':
      return (
        <div
          className="rounded-full bg-amber-500"
          style={{
            width: size * 0.1,
            height: size * 0.1,
            opacity,
          }}
        />
      );
    
    default:
      return null;
  }
}

// Constellation Background Component
function ConstellationBackground() {
  const [lines, setLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const [points, setPoints] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    // Generate constellation points
    const newPoints = [];
    for (let i = 0; i < 20; i++) {
      newPoints.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
      });
    }
    setPoints(newPoints);

    // Generate connecting lines between nearby points
    const newLines = [];
    for (let i = 0; i < newPoints.length; i++) {
      for (let j = i + 1; j < newPoints.length; j++) {
        const distance = Math.sqrt(
          Math.pow(newPoints[i].x - newPoints[j].x, 2) + 
          Math.pow(newPoints[i].y - newPoints[j].y, 2)
        );
        
        // Connect points that are close enough
        if (distance < 25 && Math.random() > 0.7) {
          newLines.push({
            x1: newPoints[i].x,
            y1: newPoints[i].y,
            x2: newPoints[j].x,
            y2: newPoints[j].y,
          });
        }
      }
    }
    setLines(newLines);
  }, []);

  return (
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Constellation lines */}
        {lines.map((line, index) => (
          <motion.line
            key={index}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(212, 175, 55, 0.3)"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Constellation points */}
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={`${point.x}%`}
            cy={`${point.y}%`}
            r={point.size * 0.1}
            fill="rgba(255, 215, 0, 0.6)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{
              duration: 1,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
}
