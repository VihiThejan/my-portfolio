'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
  ChevronDown
} from 'lucide-react';
import { projects } from '@/lib/data';
import { FilterOptions } from '@/types';

const filterOptions = {
  techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'],
  languages: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  status: ['completed', 'in-progress', 'maintained', 'archived'],
  difficulty: ['beginner', 'intermediate', 'advanced', 'expert'],
  category: ['frontend', 'backend', 'fullstack', 'mobile', 'ai-ml', 'devops'],
  years: ['2024', '2023', '2022', '2021']
};

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <Code className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Portfolio</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Explore my portfolio of innovative projects spanning web development, mobile apps, 
            AI/ML solutions, and enterprise applications. Each project represents a unique 
            challenge solved with cutting-edge technology.
          </motion.p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
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
              Filters
              <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
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
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
                layout
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
                        <a href={`/projects/${project.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </a>
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
          </AnimatePresence>
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

        {/* View All Projects CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-gradient-brand hover:shadow-glow-lg transition-all duration-300 group"
            asChild
          >
            <a href="/projects">
              View All Projects
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}