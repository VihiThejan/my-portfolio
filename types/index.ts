export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  techStack: string[];
  languages: string[];
  status: 'completed' | 'in-progress' | 'maintained' | 'archived';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'ai-ml' | 'devops';
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: number;
  duration?: string;
  teamSize?: number;
  role?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  images?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud' | 'mobile' | 'other';
  level: number; // 1-100
  yearsOfExperience: number;
  icon?: string;
  description?: string;
}

export interface TechStack {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'library' | 'database' | 'tool' | 'platform';
  logo: string;
  description: string;
  useCase: string;
  yearsUsed: number;
  lastUsed: string;
  proficiency: number; // 1-100
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  project?: string;
  date: string;
  verified?: boolean;
}

export interface FilterOptions {
  techStack: string[];
  languages: string[];
  status: string;
  difficulty: string;
  category: string;
  year: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string[];
  skills: string[];
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  relevant_courses?: string[];
  achievements?: string[];
}