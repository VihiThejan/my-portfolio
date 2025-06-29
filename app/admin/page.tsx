'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FolderOpen, 
  Code, 
  Award, 
  Mail,
  Eye,
  TrendingUp
} from 'lucide-react';

interface Stats {
  projects: number;
  skills: number;
  testimonials: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    testimonials: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        const headers = { Authorization: `Bearer ${token}` };

        const [projectsRes, skillsRes, testimonialsRes, messagesRes] = await Promise.all([
          fetch('/api/admin/projects', { headers }),
          fetch('/api/admin/skills', { headers }),
          fetch('/api/admin/testimonials', { headers }),
          fetch('/api/admin/messages', { headers }),
        ]);

        const [projects, skills, testimonials, messages] = await Promise.all([
          projectsRes.json(),
          skillsRes.json(),
          testimonialsRes.json(),
          messagesRes.json(),
        ]);

        setStats({
          projects: projects.length || 0,
          skills: skills.length || 0,
          testimonials: testimonials.length || 0,
          messages: messages.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: FolderOpen,
      description: 'Active portfolio projects',
      color: 'text-blue-600',
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Code,
      description: 'Technical skills listed',
      color: 'text-green-600',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: Award,
      description: 'Client testimonials',
      color: 'text-purple-600',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: Mail,
      description: 'Contact form submissions',
      color: 'text-orange-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Overview of your portfolio content and activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/projects"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <FolderOpen className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium">Manage Projects</p>
                    <p className="text-sm text-gray-600">Add, edit, or remove portfolio projects</p>
                  </div>
                </div>
              </a>
              <a
                href="/admin/skills"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium">Update Skills</p>
                    <p className="text-sm text-gray-600">Modify your technical skill set</p>
                  </div>
                </div>
              </a>
              <a
                href="/admin/messages"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium">Review Messages</p>
                    <p className="text-sm text-gray-600">Check new contact form submissions</p>
                  </div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Portfolio Preview
            </CardTitle>
            <CardDescription>
              View your live portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">View Live Site</p>
                    <p className="text-sm text-gray-600">See how your portfolio looks to visitors</p>
                  </div>
                  <div className="text-sm text-gray-400">↗</div>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
