'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Sparkles, Code2, Briefcase } from 'lucide-react';

const roles = [
  { text: 'CEO', icon: Briefcase },
  { text: 'Software Engineer', icon: Code2 },
  { text: 'Tech Innovator', icon: Sparkles },
  { text: 'Full Stack Developer', icon: Code2 }
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 gradient-mesh">
        <motion.div
          style={{ y }}
          className="absolute inset-0"
        >
          {/* Floating Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        

        {/* Name with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block text-foreground">Hi, I&apos;m</span>
            <motion.span 
              className="gradient-brand-text inline-block mt-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Vihinsa Thejan Bandara
            </motion.span>
          </h1>
        </motion.div>

        {/* Animated Role with Icon */}
        <div className="h-20 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {React.createElement(roles[currentRole].icon, {
                  className: "w-8 h-8 text-primary"
                })}
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-muted-foreground">
                {roles[currentRole].text}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leading <span className="font-semibold text-primary neon-text">Vihi IT Solutions</span> to 
            craft exceptional digital experiences. Transforming ideas into powerful, 
            scalable solutions that drive business growth and innovation.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-24 h-1 gradient-brand mx-auto mt-6 rounded-full"
          />
        </motion.div>

        {/* CTA Buttons with Better Styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="gradient-brand hover:shadow-glow-lg hover:scale-105 transition-all duration-300 group px-8 py-6 text-lg"
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            Explore My Work
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="gradient-brand-border hover:bg-primary/5 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Let&apos;s Connect
          </Button>
        </motion.div>

        {/* Social Links with Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center items-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/IT21266300', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/vihinsa-thejan-bandara', label: 'LinkedIn', color: 'hover:text-blue-600' },
            { icon: Mail, href: 'mailto:vihinsabandara@gmail.com', label: 'Email', color: 'hover:text-primary' },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`relative group p-3 glass-brand rounded-xl ${social.color} transition-all duration-300`}
              aria-label={social.label}
            >
              <social.icon className="h-6 w-6" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {social.label}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => scrollToSection('about')}
        >
          <span className="text-sm text-muted-foreground mb-3 group-hover:text-primary transition-colors">
            Discover More
          </span>
          <div className="relative">
            <div className="absolute inset-0 gradient-brand rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-3 rounded-full border-2 border-primary/30 group-hover:border-primary transition-colors">
              <ArrowDown className="h-5 w-5 text-primary" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Corner Decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 gradient-brand opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-40 h-40 gradient-brand opacity-10 blur-3xl" />
    </section>
  );
}