'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GitHubActivityCard } from '@/components/shared/GitHubActivityCard';
import { 
  Clock, 
  Users, 
  GitBranch, 
  Star, 
  ExternalLink, 
  Github,
  Activity,
  Calendar,
  Code
} from 'lucide-react';

// Utility function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const currentProjects = [
  {
    id: '1',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Advanced analytics platform with machine learning insights and real-time data visualization for enterprise clients.',
    progress: 75,
    status: 'In Progress',
    dueDate: '2024-03-15',
    team: ['Thejan', 'Sarah', 'Mike', 'Lisa'],
    techStack: ['React', 'Python', 'TensorFlow', 'PostgreSQL'],
    metrics: {
      commits: 342,
      contributors: 4,
      stars: 28
    },
    priority: 'High',
    category: 'AI/ML'
  },
  {
    id: '2',
    title: 'E-Commerce Mobile App',
    description: 'Cross-platform mobile application for a major retail client with offline capabilities and AR features.',
    progress: 60,
    status: 'Development',
    dueDate: '2024-04-30',
    team: ['Thejan', 'Alex', 'Emma'],
    techStack: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    metrics: {
      commits: 256,
      contributors: 3,
      stars: 15
    },
    priority: 'High',
    category: 'Mobile'
  },
  {
    id: '3',
    title: 'Blockchain Voting System',
    description: 'Secure, transparent voting platform using blockchain technology for educational institutions.',
    progress: 45,
    status: 'Beta Testing',
    dueDate: '2024-05-20',
    team: ['Thejan', 'David'],
    techStack: ['Solidity', 'Web3.js', 'React', 'IPFS'],
    metrics: {
      commits: 189,
      contributors: 2,
      stars: 42
    },
    priority: 'Medium',
    category: 'Blockchain'
  }
];

export function CurrentProjects() {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Development': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'Beta Testing': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="current-projects" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <Activity className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Live Projects</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Current <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Get a glimpse into the innovative projects I'm currently working on. 
            Each project represents cutting-edge technology and creative problem-solving.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-3 gap-8"
        >
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getPriorityColor(project.priority)} border`}>
                      {project.priority} Priority
                    </Badge>
                    <Badge className={`${getStatusColor(project.status)} border`}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {formatDate(project.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.team.length} members</span>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Code className="h-4 w-4" />
                      <span>Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                        <GitBranch className="h-3 w-3" />
                        <span className="text-xs">Commits</span>
                      </div>
                      <div className="font-semibold text-sm">{project.metrics.commits}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">Team</span>
                      </div>
                      <div className="font-semibold text-sm">{project.metrics.contributors}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-1">
                        <Star className="h-3 w-3" />
                        <span className="text-xs">Stars</span>
                      </div>
                      <div className="font-semibold text-sm">{project.metrics.stars}</div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Team</span>
                    <div className="flex -space-x-2">
                      {project.team.map((member, memberIndex) => (
                        <div
                          key={member}
                          className="w-8 h-8 rounded-full bg-gradient-brand border-2 border-background flex items-center justify-center text-white text-xs font-medium"
                          style={{ zIndex: project.team.length - memberIndex }}
                        >
                          {member.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs hover:bg-primary/5 hover:border-primary/30"
                    >
                      <Github className="h-3 w-3 mr-1" />
                      Code
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs hover:bg-primary/5 hover:border-primary/30"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Activity */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 flex justify-center"
        >
          <GitHubActivityCard username="IT21266300" className="max-w-md" />
        </motion.div>
      </div>
    </section>
  );
}