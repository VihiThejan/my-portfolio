'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  Github,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  techStack: string[];
  status: string;
  difficulty: string;
  category: string;
  featured: boolean;
  published: boolean;
  year: number;
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const res = await fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      const token = localStorage.getItem('admin-token');
      await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ published: !published }),
      });
      fetchProjects();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const token = localStorage.getItem('admin-token');
      await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <Button disabled>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <FolderOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first project.</p>
              <Link href="/admin/projects/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        <Badge
                          variant={project.published ? 'default' : 'outline'}
                        >
                          {project.published ? 'Published' : 'Draft'}
                        </Badge>
                        <Badge variant="outline">{project.status}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Year: {project.year}</span>
                      <span>Category: {project.category}</span>
                      <span>Difficulty: {project.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {project.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(project.id, project.published)}
                    >
                      {project.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
