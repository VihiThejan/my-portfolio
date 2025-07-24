'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  opacity: number;
  type: 'star' | 'circle' | 'diamond' | 'triangle';
}

interface GeometricShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  type: 'hexagon' | 'square' | 'pentagon';
}

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [geometricShapes, setGeometricShapes] = useState<GeometricShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize particles
  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2, // 2-6px
          speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
          direction: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
          type: ['star', 'circle', 'diamond', 'triangle'][Math.floor(Math.random() * 4)] as Particle['type'],
        });
      }
      
      setParticles(newParticles);
    };

    const createGeometricShapes = () => {
      const newShapes: GeometricShape[] = [];
      
      for (let i = 0; i < 8; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 60 + 20, // 20-80px
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
          type: ['hexagon', 'square', 'pentagon'][Math.floor(Math.random() * 3)] as GeometricShape['type'],
        });
      }
      
      setGeometricShapes(newShapes);
    };

    createParticles();
    createGeometricShapes();

    // Handle window resize
    const handleResize = () => {
      createParticles();
      createGeometricShapes();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + Math.cos(particle.direction) * particle.speed,
          y: particle.y + Math.sin(particle.direction) * particle.speed,
          // Wrap around screen
          ...(particle.x > window.innerWidth + 10 && { x: -10 }),
          ...(particle.x < -10 && { x: window.innerWidth + 10 }),
          ...(particle.y > window.innerHeight + 10 && { y: -10 }),
          ...(particle.y < -10 && { y: window.innerHeight + 10 }),
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Mouse interaction for particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Ambient Light Effects */}
      <div className="absolute inset-0">
        {/* Main ambient glow */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-golden-500/10 via-golden-600/5 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-amber-500/8 via-golden-400/4 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Mouse-following light effect */}
        <motion.div
          className="absolute w-40 h-40 bg-gradient-radial from-golden-400/20 via-golden-500/10 to-transparent rounded-full blur-2xl"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              rotate: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <ParticleShape 
              type={particle.type} 
              size={particle.size} 
              opacity={particle.opacity} 
            />
          </motion.div>
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        {geometricShapes.map(shape => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              rotate: [shape.rotation, shape.rotation + 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <GeometricShape 
              type={shape.type} 
              size={shape.size} 
              opacity={shape.opacity} 
            />
          </motion.div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating Golden Dots */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}

// Particle Shape Component
function ParticleShape({ type, size, opacity }: { 
  type: Particle['type']; 
  size: number; 
  opacity: number; 
}) {
  const baseClasses = `drop-shadow-sm`;
  
  switch (type) {
    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={baseClasses}>
          <path
            d="M12 2L14.09 8.26L20 9L15 14.74L16.18 21.02L12 17.77L7.82 21.02L9 14.74L4 9L9.91 8.26L12 2Z"
            fill={`rgba(212, 175, 55, ${opacity})`}
          />
        </svg>
      );
    
    case 'circle':
      return (
        <div
          className={`rounded-full bg-golden-400 ${baseClasses}`}
          style={{
            width: size,
            height: size,
            opacity,
          }}
        />
      );
    
    case 'diamond':
      return (
        <div
          className={`transform rotate-45 bg-amber-500 ${baseClasses}`}
          style={{
            width: size,
            height: size,
            opacity,
          }}
        />
      );
    
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className={baseClasses}>
          <path
            d="M12 2L22 20H2L12 2Z"
            fill={`rgba(255, 140, 0, ${opacity})`}
          />
        </svg>
      );
    
    default:
      return null;
  }
}

// Geometric Shape Component
function GeometricShape({ type, size, opacity }: { 
  type: GeometricShape['type']; 
  size: number; 
  opacity: number; 
}) {
  const baseClasses = `border border-golden-400/20`;
  
  switch (type) {
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          <path
            d="M17.5 3.5L22 12L17.5 20.5H6.5L2 12L6.5 3.5H17.5Z"
            fill="none"
            stroke={`rgba(212, 175, 55, ${opacity})`}
            strokeWidth="1"
          />
        </svg>
      );
    
    case 'square':
      return (
        <div
          className={`border border-golden-400/30 bg-golden-500/5`}
          style={{
            width: size,
            height: size,
            opacity,
          }}
        />
      );
    
    case 'pentagon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" className="drop-shadow-sm">
          <path
            d="M12 2L22 9L18 20H6L2 9L12 2Z"
            fill="none"
            stroke={`rgba(255, 140, 0, ${opacity})`}
            strokeWidth="1"
          />
        </svg>
      );
    
    default:
      return null;
  }
}
