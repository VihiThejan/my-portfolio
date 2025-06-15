'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  Target, 
  Lightbulb, 
  Users, 
  Zap, 
  Globe, 
  ExternalLink,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.'
  },
  {
    icon: Zap,
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.'
  },
  {
    icon: Target,
    title: 'Digital Strategy',
    description: 'Comprehensive digital transformation strategies to help businesses thrive online.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Consulting',
    description: 'Expert guidance on emerging technologies and innovative solutions for complex challenges.'
  }
];

const achievements = [
  { icon: Award, label: 'Industry Recognition', value: '3x Winner' },
  { icon: TrendingUp, label: 'Client Growth', value: '200%' },
  { icon: Heart, label: 'Client Satisfaction', value: '98%' },
  { icon: Users, label: 'Team Members', value: '15+' },
];

export function Startup() {
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
    <section id="startup" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <Rocket className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">My Startup</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="gradient-text">Vihi IT Solutions</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Empowering businesses through innovative technology solutions. We specialize in creating 
            digital experiences that drive growth, enhance efficiency, and transform the way companies operate.
          </motion.p>
        </motion.div>

        {/* Company Image/Logo Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-brand rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
            <Card className="relative overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-brand rounded-2xl mx-auto flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-white">VI</span>
                    </div>
                    <h3 className="text-2xl font-bold gradient-text">Vihi IT Solutions</h3>
                    <p className="text-muted-foreground">Innovation • Excellence • Growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div variants={itemVariants}>
            <Card className="h-full group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize technology by creating accessible, innovative solutions that empower 
                  businesses of all sizes to thrive in the digital age. We believe every company 
                  deserves world-class technology solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To become a global leader in digital innovation, setting new standards for 
                  technology excellence while fostering a culture of continuous learning, 
                  creativity, and positive impact on society.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-12"
          >
            Our <span className="gradient-text">Services</span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full text-center hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-3">{service.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="text-center group hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gradient-brand rounded-full">
                      <achievement.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-xl font-bold gradient-text">
                      {achievement.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {achievement.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-brand hover:shadow-glow-lg transition-all duration-300 group"
            asChild
          >
            <a 
              href="https://vihiit.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Company Website
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}