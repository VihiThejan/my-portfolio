'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Code, 
  Database, 
  Cloud, 
  Smartphone, 
  Settings,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';
import { skills } from '@/lib/data';

const categoryIcons = {
  frontend: Code,
  backend: Database,
  database: Database,
  cloud: Cloud,
  mobile: Smartphone,
  tools: Settings,
  other: Brain
};

const categoryColors = {
  frontend: 'from-blue-500/20 to-cyan-500/20',
  backend: 'from-green-500/20 to-emerald-500/20',
  database: 'from-purple-500/20 to-violet-500/20',
  cloud: 'from-orange-500/20 to-red-500/20',
  mobile: 'from-pink-500/20 to-rose-500/20',
  tools: 'from-yellow-500/20 to-amber-500/20',
  other: 'from-gray-500/20 to-slate-500/20'
};

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

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

  const getSkillLevel = (level: number) => {
    if (level >= 90) return { label: 'Expert', color: 'text-green-500' };
    if (level >= 80) return { label: 'Advanced', color: 'text-blue-500' };
    if (level >= 70) return { label: 'Intermediate', color: 'text-yellow-500' };
    return { label: 'Beginner', color: 'text-gray-500' };
  };

  return (
    <section id="skills" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Expertise</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Skills & <span className="gradient-text">Expertise</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            A comprehensive overview of my technical skills, tools, and technologies. 
            Built through years of hands-on experience and continuous learning.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">By Category</TabsTrigger>
              <TabsTrigger value="timeline">Experience</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredSkills.map((skill, index) => {
                  const skillLevel = getSkillLevel(skill.level);
                  const IconComponent = categoryIcons[skill.category] || Brain;
                  
                  return (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      custom={index}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[skill.category]}`}>
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm truncate">{skill.name}</h3>
                              <p className="text-xs text-muted-foreground capitalize">
                                {skill.category.replace('-', ' ')}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">Proficiency</span>
                              <Badge className={`text-xs ${skillLevel.color} bg-transparent border-current`}>
                                {skillLevel.label}
                              </Badge>
                            </div>
                            
                            <Progress value={skill.level} className="h-2" />
                            
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{skill.level}%</span>
                              <span>{skill.yearsOfExperience}+ years</span>
                            </div>
                          </div>

                          {skill.description && (
                            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                              {skill.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-8">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => {
                const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Brain;
                
                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors]}`}>
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold capitalize">
                          {category.replace('-', ' ')} Development
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {categorySkills.length} skills • Avg. {Math.round(categorySkills.reduce((acc, skill) => acc + skill.level, 0) / categorySkills.length)}% proficiency
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {categorySkills.map((skill) => (
                        <Card key={skill.id} className="p-4 hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {skill.level}%
                            </Badge>
                          </div>
                          <Progress value={skill.level} className="h-1.5 mb-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{skill.yearsOfExperience} years</span>
                            <span className={getSkillLevel(skill.level).color}>
                              {getSkillLevel(skill.level).label}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-8">
              <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8">
                {/* Experience Summary */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="p-6 border-border/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">Experience Level</h3>
                        <p className="text-sm text-muted-foreground">Overall proficiency</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Expert Level</span>
                        <span className="text-sm font-medium">
                          {skills.filter(s => s.level >= 90).length} skills
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Advanced Level</span>
                        <span className="text-sm font-medium">
                          {skills.filter(s => s.level >= 80 && s.level < 90).length} skills
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Intermediate Level</span>
                        <span className="text-sm font-medium">
                          {skills.filter(s => s.level >= 70 && s.level < 80).length} skills
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-border/50">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-accent/10 rounded-full">
                        <TrendingUp className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-bold">Growth Metrics</h3>
                        <p className="text-sm text-muted-foreground">Learning progress</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Experience</span>
                        <span className="text-sm font-medium">
                          {Math.round(skills.reduce((acc, skill) => acc + skill.yearsOfExperience, 0) / skills.length)} years
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Avg. Proficiency</span>
                        <span className="text-sm font-medium">
                          {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Skills</span>
                        <span className="text-sm font-medium">{skills.length}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Top Skills */}
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold mb-6">Top Skills by Proficiency</h3>
                  <div className="space-y-4">
                    {skills
                      .sort((a, b) => b.level - a.level)
                      .slice(0, 10)
                      .map((skill, index) => {
                        const IconComponent = categoryIcons[skill.category] || Brain;
                        
                        return (
                          <Card key={skill.id} className="p-4 border-border/50 hover:border-primary/30 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-8 h-8 bg-gradient-brand rounded-full text-white text-sm font-bold">
                                {index + 1}
                              </div>
                              
                              <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[skill.category]}`}>
                                <IconComponent className="h-4 w-4 text-primary" />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-medium">{skill.name}</h4>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={`text-xs ${getSkillLevel(skill.level).color} bg-transparent border-current`}>
                                      {getSkillLevel(skill.level).label}
                                    </Badge>
                                    <span className="text-sm font-medium">{skill.level}%</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                  <span className="capitalize">{skill.category.replace('-', ' ')}</span>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{skill.yearsOfExperience}+ years</span>
                                  </div>
                                </div>
                                <Progress value={skill.level} className="h-1.5" />
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}