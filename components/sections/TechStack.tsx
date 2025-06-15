'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Layers, 
  Code, 
  Database, 
  Cloud, 
  Settings, 
  Smartphone,
  Calendar,
  TrendingUp,
  Star,
  ExternalLink
} from 'lucide-react';
import { techStack } from '@/lib/data';

const categoryIcons = {
  language: Code,
  framework: Layers,
  library: Layers,
  database: Database,
  tool: Settings,
  platform: Cloud
};

const categoryColors = {
  language: 'from-blue-500/20 to-cyan-500/20',
  framework: 'from-green-500/20 to-emerald-500/20',
  library: 'from-purple-500/20 to-violet-500/20',
  database: 'from-orange-500/20 to-red-500/20',
  tool: 'from-yellow-500/20 to-amber-500/20',
  platform: 'from-pink-500/20 to-rose-500/20'
};

export function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(techStack.map(tech => tech.category)))];
  
  const filteredTechStack = selectedCategory === 'all' 
    ? techStack 
    : techStack.filter(tech => tech.category === selectedCategory);

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

  const getProficiencyLevel = (proficiency: number) => {
    if (proficiency >= 90) return { label: 'Expert', color: 'text-green-500' };
    if (proficiency >= 80) return { label: 'Advanced', color: 'text-blue-500' };
    if (proficiency >= 70) return { label: 'Intermediate', color: 'text-yellow-500' };
    return { label: 'Beginner', color: 'text-gray-500' };
  };

  return (
    <section id="tech-stack" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <Layers className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Technology</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Tech <span className="gradient-text">Stack</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            The technologies, frameworks, and tools I use to build modern, scalable applications. 
            Each technology is chosen for its specific strengths and use cases.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize hover:bg-primary/10 transition-colors"
            >
              {category === 'all' ? 'All Technologies' : category.replace('-', ' ')}
            </Button>
          ))}
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTechStack.map((tech, index) => {
            const IconComponent = categoryIcons[tech.category] || Layers;
            const proficiencyLevel = getProficiencyLevel(tech.proficiency);
            
            return (
              <motion.div
                key={tech.id}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[tech.category]} flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-lg">{tech.name}</h3>
                          <Badge className={`text-xs ${proficiencyLevel.color} bg-transparent border-current`}>
                            {proficiencyLevel.label}
                          </Badge>
                        </div>
                        
                        <Badge variant="secondary" className="text-xs capitalize mb-3">
                          {tech.category}
                        </Badge>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {tech.description}
                        </p>
                      </div>
                    </div>

                    {/* Proficiency */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Proficiency</span>
                        <span className="text-sm font-medium">{tech.proficiency}%</span>
                      </div>
                      <Progress value={tech.proficiency} className="h-2" />
                    </div>

                    {/* Use Case */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-muted-foreground">Use Cases</h4>
                      <p className="text-sm leading-relaxed">{tech.useCase}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">Experience</span>
                        </div>
                        <div className="font-semibold text-sm">{tech.yearsUsed}+ years</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-xs">Last Used</span>
                        </div>
                        <div className="font-semibold text-sm">{tech.lastUsed}</div>
                      </div>
                    </div>

                    {/* Featured Badge for High Proficiency */}
                    {tech.proficiency >= 90 && (
                      <div className="flex items-center justify-center mt-4 pt-4 border-t border-border/50">
                        <Badge className="bg-gradient-brand text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Expert Level
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech Stack Summary */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <Card className="p-6 text-center border-border/50 hover:border-primary/30 transition-colors">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Languages</h3>
            <p className="text-2xl font-bold gradient-text mb-2">
              {techStack.filter(tech => tech.category === 'language').length}+
            </p>
            <p className="text-sm text-muted-foreground">
              Programming languages mastered
            </p>
          </Card>

          <Card className="p-6 text-center border-border/50 hover:border-primary/30 transition-colors">
            <div className="p-3 bg-accent/10 rounded-full w-fit mx-auto mb-4">
              <Layers className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2">Frameworks</h3>
            <p className="text-2xl font-bold gradient-text mb-2">
              {techStack.filter(tech => tech.category === 'framework' || tech.category === 'library').length}+
            </p>
            <p className="text-sm text-muted-foreground">
              Frameworks and libraries used
            </p>
          </Card>

          <Card className="p-6 text-center border-border/50 hover:border-primary/30 transition-colors">
            <div className="p-3 bg-gradient-brand rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-2">Avg. Experience</h3>
            <p className="text-2xl font-bold gradient-text mb-2">
              {Math.round(techStack.reduce((acc, tech) => acc + tech.yearsUsed, 0) / techStack.length)}
            </p>
            <p className="text-sm text-muted-foreground">
              Years of experience per technology
            </p>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Want to see these technologies in action?
          </p>
          <Button
            size="lg"
            className="bg-gradient-brand hover:shadow-glow-lg transition-all duration-300 group"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Projects
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}