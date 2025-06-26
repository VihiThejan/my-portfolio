'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  Search, 
  ExternalLink, 
  Github, 
  Calendar,
  Users,
  Star,
  Eye,
  Code,
  Layers,
  X,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { projects } from '@/lib/data';
import { FilterOptions } from '@/types';
import Link from 'next/link';
import Head from 'next/head';

const filterOptions = {
  techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
  languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  status: ['completed', 'in-progress', 'maintained', 'archived'],
  difficulty: ['beginner', 'intermediate', 'advanced', 'expert'],
  category: ['frontend', 'backend', 'fullstack', 'mobile', 'ai-ml', 'devops'],
  years: ['2024', '2023', '2022', '2021']
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    techStack: [],
    languages: [],
    status: '',
    difficulty: '',
    category: '',
    year: ''
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTechStack = filters.techStack.length === 0 || 
                              filters.techStack.some(tech => project.techStack.includes(tech));
      
      const matchesLanguages = filters.languages.length === 0 || 
                              filters.languages.some(lang => project.languages.includes(lang));
      
      const matchesStatus = !filters.status || project.status === filters.status;
      const matchesDifficulty = !filters.difficulty || project.difficulty === filters.difficulty;
      const matchesCategory = !filters.category || project.category === filters.category;
      const matchesYear = !filters.year || project.year.toString() === filters.year;

      return matchesSearch && matchesTechStack && matchesLanguages && 
             matchesStatus && matchesDifficulty && matchesCategory && matchesYear;
    });
  }, [searchTerm, filters]);

  const handleFilterChange = (type: keyof FilterOptions, value: string) => {
    if (type === 'techStack' || type === 'languages') {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type].includes(value) 
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value]
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: prev[type] === value ? '' : value
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
      techStack: [],
      languages: [],
      status: '',
      difficulty: '',
      category: '',
      year: ''
    });
    setSearchTerm('');
  };

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

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 px-6 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Link href="/">
              <Button variant="ghost" className="mb-6 hover:bg-primary/5">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              All <span className="gradient-text">Projects</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my complete portfolio of projects. From web applications to mobile apps, 
              AI/ML solutions to enterprise systems - discover the full range of my work.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">
                {Array.from(new Set(projects.flatMap(p => p.techStack))).length}
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Search and Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 space-y-6"
          >
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-border/50 hover:bg-primary/5 hover:border-primary/30"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="p-6 border-border/50">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Tech Stack Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.techStack.map(tech => (
                          <Badge
                            key={tech}
                            variant={filters.techStack.includes(tech) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleFilterChange('techStack', tech)}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Languages Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.languages.map(lang => (
                          <Badge
                            key={lang}
                            variant={filters.languages.includes(lang) ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleFilterChange('languages', lang)}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.status.map(status => (
                          <Badge
                            key={status}
                            variant={filters.status === status ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors capitalize"
                            onClick={() => handleFilterChange('status', status)}
                          >
                            {status.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Difficulty</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.difficulty.map(difficulty => (
                          <Badge
                            key={difficulty}
                            variant={filters.difficulty === difficulty ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors capitalize"
                            onClick={() => handleFilterChange('difficulty', difficulty)}
                          >
                            {difficulty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Category</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.category.map(category => (
                          <Badge
                            key={category}
                            variant={filters.category === category ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors capitalize"
                            onClick={() => handleFilterChange('category', category)}
                          >
                            {category.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Year Filter */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm">Year</h4>
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.years.map(year => (
                          <Badge
                            key={year}
                            variant={filters.year === year ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleFilterChange('year', year)}
                          >
                            {year}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-brand text-white border-0">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.liveUrl && (
                        <Button size="icon" variant="secondary" className="h-8 w-8" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="icon" variant="secondary" className="h-8 w-8" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex space-x-2">
                        <Badge className={`${getStatusColor(project.status)} border text-xs`}>
                          {project.status.replace('-', ' ')}
                        </Badge>
                        <Badge className={`${getDifficultyColor(project.difficulty)} border text-xs`}>
                          {project.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Layers className="h-3 w-3" />
                        <span>Tech Stack</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs px-2 py-1"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 4 && (
                          <Badge variant="secondary" className="text-xs px-2 py-1">
                            +{project.techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Project Stats */}
                    {project.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                        {project.metrics.slice(0, 3).map((metric, index) => (
                          <div key={index} className="text-center">
                            <div className="font-semibold text-sm">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground pt-2">
                      {project.duration && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{project.duration}</span>
                        </div>
                      )}
                      {project.teamSize && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{project.teamSize} members</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 text-xs hover:bg-primary/5 hover:border-primary/30"
                        asChild
                      >
                        <Link href={`/projects/${project.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      {project.liveUrl && (
                        <Button 
                          size="sm" 
                          className="flex-1 text-xs bg-gradient-brand hover:shadow-glow"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}