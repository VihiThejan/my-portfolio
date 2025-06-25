'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Award, Users, Coffee, Code2 } from 'lucide-react';

const stats = [
  { icon: Code2, label: 'Years Experience', value: '5+' },
  { icon: Award, label: 'Projects Completed', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '30+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '1000+' },
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative group">
              {/* Background decorative elements */}
              <div className="absolute -inset-4 bg-gradient-brand rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl" />
              
              {/* Professional photo */}
              <div className="relative aspect-[4/5] bg-gradient-to-br from-card to-muted rounded-2xl overflow-hidden border border-border/50">
                <img
                  src="/pro.jpg"
                  alt="Vihinsa Thejan Bandara - CEO & Software Engineer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                    <h3 className="font-semibold text-sm">Vihinsa Thejan Bandara</h3>
                    <p className="text-xs text-muted-foreground">CEO & Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                About{' '}
                <span className="gradient-text">Me</span>
              </motion.h2>
              
              <motion.div 
                className="space-y-4 text-muted-foreground leading-relaxed"
                variants={itemVariants}
              >
                <p>
                  I'm a passionate software engineer and entrepreneur with over 5 years of experience 
                  in creating innovative digital solutions. As the CEO of{' '}
                  <span className="text-primary font-semibold">Vihi IT Solutions</span>, I lead a 
                  talented team in delivering cutting-edge technology solutions that transform businesses.
                </p>
                
                <p>
                  My journey in technology began with a curiosity about how things work and evolved 
                  into a passion for building scalable, user-centric applications. I specialize in 
                  full-stack development, with expertise in modern frameworks like React, Next.js, 
                  Node.js, and cloud technologies.
                </p>
                
                <p>
                  When I'm not coding, you'll find me mentoring young developers, contributing to 
                  open-source projects, or exploring the latest trends in artificial intelligence 
                  and machine learning.
                </p>
              </motion.div>
            </div>

            {/* Download CV Button */}
            <motion.div variants={itemVariants}>
              <Button 
                className="bg-gradient-brand hover:shadow-glow-lg transition-all duration-300 group px-6 py-3 text-lg"
                asChild
              >
                <a 
                  href="/Thejan Bandara.pdf" 
                  download="Thejan Bandara.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="text-center group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}