'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Heart,
  ExternalLink,
  Send,
  Globe
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/thejanbandara', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/thejanbandara', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:thejan@vihiit.com', label: 'Email' },
  { icon: Globe, href: 'https://vihiit.com', label: 'Company Website' },
];

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Testimonials', href: '#testimonials' },
];

const services = [
  { label: 'Web Development', href: '#services' },
  { label: 'Mobile Apps', href: '#services' },
  { label: 'AI/ML Solutions', href: '#services' },
  { label: 'Consulting', href: '#services' },
];

export function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <footer id="contact" className="relative bg-card border-t border-border/50">
      {/* Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-brand" />
      
      <div className="container mx-auto max-w-6xl px-6">
        {/* Main Footer Content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-16"
        >
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">TB</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold gradient-text">Thejan Bandara</h3>
                  <p className="text-sm text-muted-foreground">CEO & Software Engineer</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed max-w-md">
                Passionate software engineer and entrepreneur creating innovative digital solutions 
                that transform businesses. Let's build something amazing together.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a 
                    href="mailto:thejan@vihiit.com" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    thejan@vihiit.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a 
                    href="tel:+94771234567" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +94 77 123 4567
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Colombo, Sri Lanka</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-muted/50 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="font-semibold text-lg">Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.label}>
                    <button
                      onClick={() => scrollToSection(service.href)}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {service.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-border/50"
          >
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-xl font-bold mb-3">Stay Updated</h4>
              <p className="text-muted-foreground mb-6">
                Get notified about new projects, blog posts, and tech insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
                />
                <Button className="bg-gradient-brand hover:shadow-glow transition-all duration-300">
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="bg-border/50" />

        {/* Bottom Footer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© 2024 Thejan Bandara. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>in Sri Lanka</span>
          </div>

          <div className="flex items-center space-x-6">
            <a 
              href="/privacy" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-gradient-brand rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp className="h-5 w-5 text-white" />
      </motion.button>
    </footer>
  );
}