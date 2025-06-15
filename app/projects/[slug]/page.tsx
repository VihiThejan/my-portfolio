'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Calendar,
  Users,
  Clock,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Code,
  Layers,
  Database,
  Globe,
  Smartphone,
  Brain
} from 'lucide-react';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const categoryIcons = {
  frontend: Globe,
  backend: Database,
  fullstack: Layers,
  mobile: Smartphone,
  'ai-ml': Brain,
  devops: Code
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'maintained': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'advanced': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'expert': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const CategoryIcon = categoryIcons[project.category] || Layers;

  const relatedProjects = projects
    .filter(p => p.id !== project.id && (
      p.category === project.category || 
      p.techStack.some(tech => project.techStack.includes(tech))
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/projects">
              <Button variant="ghost" className="mb-6 hover:bg-primary/5">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CategoryIcon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="capitalize">
                    {project.category.replace('-', ' ')}
                  </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {project.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Badge className={`${getStatusColor(project.status)} border`}>
                    {project.status.replace('-', ' ')}
                  </Badge>
                  <Badge className={`${getDifficultyColor(project.difficulty)} border`}>
                    {project.difficulty}
                  </Badge>
                  {project.featured && (
                    <Badge className="bg-gradient-brand text-white border-0">
                      Featured Project
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-4">
                  {project.liveUrl && (
                    <Button className="bg-gradient-brand hover:shadow-glow-lg transition-all duration-300" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Image */}
              <div className="relative">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-brand rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription || project.description}
                  </p>
                </div>
              </motion.div>

              {/* Challenges & Solutions */}
              {(project.challenges || project.solutions) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {project.challenges && (
                    <Card className="p-6 border-border/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-orange-500/10 rounded-lg">
                          <Target className="h-5 w-5 text-orange-500" />
                        </div>
                        <h3 className="text-xl font-bold">Challenges</h3>
                      </div>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}

                  {project.solutions && (
                    <Card className="p-6 border-border/50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <Lightbulb className="h-5 w-5 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold">Solutions</h3>
                      </div>
                      <ul className="space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                            • {solution}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </motion.div>
              )}

              {/* Results & Impact */}
              {project.results && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="p-6 border-border/50">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold">Results & Impact</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3">
                        {project.results.map((result, index) => (
                          <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                            • {result}
                          </li>
                        ))}
                      </ul>
                      {project.metrics && (
                        <div className="space-y-4">
                          {project.metrics.map((metric, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{metric.label}</span>
                                <span className="font-medium">{metric.value}</span>
                              </div>
                              <Progress value={75} className="h-2" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Tech Stack Deep Dive */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 border-border/50">
                    <h3 className="text-lg font-semibold mb-4">Frontend Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack
                        .filter(tech => ['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'CSS', 'HTML'].includes(tech))
                        .map(tech => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </Card>

                  <Card className="p-6 border-border/50">
                    <h3 className="text-lg font-semibold mb-4">Backend Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack
                        .filter(tech => ['Node.js', 'Express.js', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker'].includes(tech))
                        .map(tech => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card className="p-6 border-border/50">
                  <h3 className="text-lg font-semibold mb-6">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Year</span>
                      </div>
                      <span className="font-medium">{project.year}</span>
                    </div>

                    {project.duration && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Duration</span>
                        </div>
                        <span className="font-medium">{project.duration}</span>
                      </div>
                    )}

                    {project.teamSize && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Team Size</span>
                        </div>
                        <span className="font-medium">{project.teamSize} members</span>
                      </div>
                    )}

                    {project.role && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Award className="h-4 w-4" />
                          <span>My Role</span>
                        </div>
                        <span className="font-medium">{project.role}</span>
                      </div>
                    )}

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Languages Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.languages.map(lang => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Project Metrics */}
              {project.metrics && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="p-6 border-border/50">
                    <h3 className="text-lg font-semibold mb-6">Key Metrics</h3>
                    <div className="space-y-6">
                      {project.metrics.map((metric, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold gradient-text mb-1">
                            {metric.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="p-6 border-border/50">
                  <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    {project.liveUrl && (
                      <Button className="w-full bg-gradient-brand hover:shadow-glow" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          View Source Code
                        </a>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/projects">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Related Projects</h2>
              <p className="text-muted-foreground">
                Other projects you might find interesting
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedProject.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1" asChild>
                          <Link href={`/projects/${relatedProject.id}`}>
                            View Details
                          </Link>
                        </Button>
                        {relatedProject.liveUrl && (
                          <Button size="sm" className="flex-1" asChild>
                            <a href={relatedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}