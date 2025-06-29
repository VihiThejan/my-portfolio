import { Project, Skill } from '@/types';

// Fetch projects from API
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${process.env.SITE_URL || 'http://localhost:3000'}/api/projects`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Fetch skills from API
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await fetch(`${process.env.SITE_URL || 'http://localhost:3000'}/api/skills`, {
      next: { revalidate: 60 } // Revalidate every minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
}

// Keep static data as fallback or for development
export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A modern, scalable e-commerce platform built with Next.js and Stripe integration.',
    longDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, advanced search capabilities, and seamless payment processing. Built with modern technologies to ensure scalability and performance.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Featured', 'Full Stack', 'E-Commerce'],
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    languages: ['TypeScript', 'JavaScript', 'SQL'],
    status: 'completed',
    difficulty: 'advanced',
    category: 'fullstack',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/example/ecommerce',
    featured: true,
    year: 2024,
    duration: '4 months',
    teamSize: 3,
    role: 'Lead Developer',
    challenges: [
      'Implementing real-time inventory management',
      'Optimizing for high-traffic scenarios',
      'Complex payment flow integration'
    ],
    solutions: [
      'Used WebSocket connections for real-time updates',
      'Implemented Redis caching and CDN',
      'Created robust error handling for payment flows'
    ],
    results: [
      '300% increase in conversion rate',
      '50ms average page load time',
      '99.9% uptime achieved'
    ],
    metrics: [
      { label: 'Users', value: '10K+' },
      { label: 'Transactions', value: '$500K+' },
      { label: 'Performance', value: '95/100' }
    ]
  }
];

export const fallbackSkills: Skill[] = [
  {
    id: '1',
    name: 'React',
    category: 'frontend',
    level: 95,
    yearsOfExperience: 5,
    description: 'Advanced React development with hooks, context, and modern patterns'
  },
  {
    id: '2',
    name: 'Next.js',
    category: 'frontend',
    level: 90,
    yearsOfExperience: 4,
    description: 'Full-stack React framework with SSR and API routes'
  },
  {
    id: '3',
    name: 'TypeScript',
    category: 'frontend',
    level: 88,
    yearsOfExperience: 4,
    description: 'Type-safe JavaScript development'
  }
];
