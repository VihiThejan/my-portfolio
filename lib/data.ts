import { Project, Skill, TechStack, Testimonial, Experience, Education } from '@/types';

export const projects: Project[] = [
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
  },
  {
    id: '2',
    title: 'AI-Powered Analytics Dashboard',
    description: 'Advanced analytics dashboard with machine learning insights and real-time data visualization.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['AI/ML', 'Analytics', 'React'],
    techStack: ['React', 'Python', 'TensorFlow', 'D3.js', 'Node.js', 'MongoDB'],
    languages: ['Python', 'JavaScript', 'TypeScript'],
    status: 'in-progress',
    difficulty: 'expert',
    category: 'ai-ml',
    githubUrl: 'https://github.com/example/ai-dashboard',
    featured: true,
    year: 2024,
    duration: '6 months',
    teamSize: 5,
    role: 'ML Engineer & Frontend Lead',
  },
  {
    id: '3',
    title: 'Mobile Task Manager',
    description: 'Cross-platform mobile application for task management with offline capabilities.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Mobile', 'React Native', 'Offline'],
    techStack: ['React Native', 'Expo', 'SQLite', 'Redux', 'AsyncStorage'],
    languages: ['JavaScript', 'TypeScript'],
    status: 'completed',
    difficulty: 'intermediate',
    category: 'mobile',
    liveUrl: 'https://apps.apple.com/app/task-manager',
    githubUrl: 'https://github.com/example/task-manager',
    year: 2023,
    duration: '3 months',
    teamSize: 2,
    role: 'Mobile Developer',
  },
  {
    id: '4',
    title: 'Microservices Architecture',
    description: 'Scalable microservices architecture with Docker containerization and Kubernetes orchestration.',
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Backend', 'Microservices', 'DevOps'],
    techStack: ['Node.js', 'Docker', 'Kubernetes', 'MongoDB', 'Redis', 'NGINX'],
    languages: ['JavaScript', 'TypeScript', 'YAML'],
    status: 'maintained',
    difficulty: 'expert',
    category: 'backend',
    githubUrl: 'https://github.com/example/microservices',
    year: 2023,
    duration: '8 months',
    teamSize: 4,
    role: 'Backend Architect',
  },
  {
    id: '5',
    title: 'Real-time Chat Application',
    description: 'WebSocket-based chat application with file sharing and video calling features.',
    image: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['Real-time', 'WebSocket', 'Video'],
    techStack: ['Socket.io', 'WebRTC', 'Express', 'MongoDB', 'JWT'],
    languages: ['JavaScript', 'HTML', 'CSS'],
    status: 'completed',
    difficulty: 'advanced',
    category: 'fullstack',
    liveUrl: 'https://example-chat.com',
    githubUrl: 'https://github.com/example/chat-app',
    year: 2023,
    duration: '2 months',
    teamSize: 2,
    role: 'Full Stack Developer',
  },
  {
    id: '6',
    title: 'DevOps CI/CD Pipeline',
    description: 'Automated deployment pipeline with testing, security scanning, and monitoring.',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['DevOps', 'CI/CD', 'Automation'],
    techStack: ['Jenkins', 'Docker', 'AWS', 'Terraform', 'Prometheus', 'Grafana'],
    languages: ['Bash', 'Python', 'YAML'],
    status: 'maintained',
    difficulty: 'advanced',
    category: 'devops',
    githubUrl: 'https://github.com/example/cicd-pipeline',
    year: 2022,
    duration: '3 months',
    teamSize: 3,
    role: 'DevOps Engineer',
  }
];

export const skills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'frontend', level: 95, yearsOfExperience: 4, description: 'Advanced React development with hooks, context, and performance optimization' },
  { id: '2', name: 'Next.js', category: 'frontend', level: 90, yearsOfExperience: 3, description: 'Full-stack React framework with SSR and API routes' },
  { id: '3', name: 'TypeScript', category: 'frontend', level: 88, yearsOfExperience: 3, description: 'Type-safe JavaScript development' },
  { id: '4', name: 'Tailwind CSS', category: 'frontend', level: 85, yearsOfExperience: 2, description: 'Utility-first CSS framework' },
  { id: '5', name: 'Vue.js', category: 'frontend', level: 75, yearsOfExperience: 2, description: 'Progressive JavaScript framework' },
  
  // Backend
  { id: '6', name: 'Node.js', category: 'backend', level: 92, yearsOfExperience: 4, description: 'Server-side JavaScript runtime' },
  { id: '7', name: 'Express.js', category: 'backend', level: 90, yearsOfExperience: 4, description: 'Web application framework for Node.js' },
  { id: '8', name: 'Python', category: 'backend', level: 85, yearsOfExperience: 3, description: 'Versatile programming language' },
  { id: '9', name: 'Django', category: 'backend', level: 80, yearsOfExperience: 2, description: 'High-level Python web framework' },
  { id: '10', name: 'GraphQL', category: 'backend', level: 78, yearsOfExperience: 2, description: 'Query language for APIs' },
  
  // Database
  { id: '11', name: 'PostgreSQL', category: 'database', level: 88, yearsOfExperience: 3, description: 'Advanced relational database' },
  { id: '12', name: 'MongoDB', category: 'database', level: 85, yearsOfExperience: 3, description: 'NoSQL document database' },
  { id: '13', name: 'Redis', category: 'database', level: 80, yearsOfExperience: 2, description: 'In-memory data structure store' },
  
  // Cloud & DevOps
  { id: '14', name: 'AWS', category: 'cloud', level: 82, yearsOfExperience: 3, description: 'Amazon Web Services cloud platform' },
  { id: '15', name: 'Docker', category: 'tools', level: 85, yearsOfExperience: 3, description: 'Containerization platform' },
  { id: '16', name: 'Kubernetes', category: 'tools', level: 75, yearsOfExperience: 2, description: 'Container orchestration' },
  
  // Mobile
  { id: '17', name: 'React Native', category: 'mobile', level: 80, yearsOfExperience: 2, description: 'Cross-platform mobile development' },
  
  // Tools
  { id: '18', name: 'Git', category: 'tools', level: 95, yearsOfExperience: 5, description: 'Version control system' },
  { id: '19', name: 'Figma', category: 'tools', level: 70, yearsOfExperience: 2, description: 'Design and prototyping tool' },
];

export const techStack: TechStack[] = [
  {
    id: '1',
    name: 'React',
    category: 'framework',
    logo: '/logos/react.svg',
    description: 'A JavaScript library for building user interfaces',
    useCase: 'Frontend development, SPAs, component-based architecture',
    yearsUsed: 4,
    lastUsed: '2024',
    proficiency: 95
  },
  {
    id: '2',
    name: 'Next.js',
    category: 'framework',
    logo: '/logos/nextjs.svg',
    description: 'The React framework for production applications',
    useCase: 'Full-stack applications, SSR, API routes',
    yearsUsed: 3,
    lastUsed: '2024',
    proficiency: 90
  },
  {
    id: '3',
    name: 'TypeScript',
    category: 'language',
    logo: '/logos/typescript.svg',
    description: 'Typed superset of JavaScript',
    useCase: 'Type-safe development, large-scale applications',
    yearsUsed: 3,
    lastUsed: '2024',
    proficiency: 88
  },
  {
    id: '4',
    name: 'Node.js',
    category: 'platform',
    logo: '/logos/nodejs.svg',
    description: 'JavaScript runtime built on Chrome\'s V8 engine',
    useCase: 'Backend development, API servers, microservices',
    yearsUsed: 4,
    lastUsed: '2024',
    proficiency: 92
  },
  {
    id: '5',
    name: 'PostgreSQL',
    category: 'database',
    logo: '/logos/postgresql.svg',
    description: 'Advanced open-source relational database',
    useCase: 'Complex queries, ACID compliance, data integrity',
    yearsUsed: 3,
    lastUsed: '2024',
    proficiency: 88
  },
  {
    id: '6',
    name: 'MongoDB',
    category: 'database',
    logo: '/logos/mongodb.svg',
    description: 'NoSQL document-oriented database',
    useCase: 'Flexible schema, rapid development, JSON-like documents',
    yearsUsed: 3,
    lastUsed: '2024',
    proficiency: 85
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    content: 'Thejan delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made our project a huge success.',
    rating: 5,
    project: 'E-Commerce Platform',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupX',
    content: 'Working with Thejan and Vihi IT Solutions was a game-changer for our startup. The mobile app they developed helped us scale from 0 to 10,000 users in just 3 months.',
    rating: 5,
    project: 'Mobile Task Manager',
    date: '2023-11-20',
    verified: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'GrowthLab',
    content: 'The analytics dashboard Thejan built transformed how we understand our data. The AI insights feature alone saved us 20 hours per week in manual analysis.',
    rating: 5,
    project: 'AI-Powered Analytics Dashboard',
    date: '2024-02-08',
    verified: true
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Engineering Manager',
    company: 'ScaleUp Solutions',
    content: 'Thejan\'s expertise in microservices architecture helped us rebuild our monolithic application into a scalable, maintainable system. Outstanding work!',
    rating: 5,
    project: 'Microservices Architecture',
    date: '2023-09-12',
    verified: true
  }
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'CEO & Founder',
    company: 'Vihi IT Solutions',
    location: 'Remote',
    startDate: '2023-01',
    current: true,
    description: [
      'Founded and lead a growing technology consultancy specializing in web and mobile development',
      'Built a team of 15+ developers, designers, and project managers',
      'Established partnerships with major clients, generating $2M+ in annual revenue',
      'Developed company culture focused on innovation, quality, and client satisfaction'
    ],
    skills: ['Leadership', 'Business Development', 'Strategic Planning', 'Team Management'],
    achievements: [
      'Grew company from 2 to 15+ employees in 2 years',
      'Achieved 98% client satisfaction rate',
      '200% year-over-year revenue growth'
    ]
  },
  {
    id: '2',
    title: 'Senior Full Stack Developer',
    company: 'TechForward Inc.',
    location: 'San Francisco, CA',
    startDate: '2020-06',
    endDate: '2021-12',
    current: false,
    description: [
      'Led development of enterprise-level web applications using React and Node.js',
      'Mentored junior developers and conducted code reviews',
      'Collaborated with product and design teams to deliver user-centric solutions',
      'Implemented CI/CD pipelines and improved deployment processes'
    ],
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Team Leadership'],
    achievements: [
      'Reduced application load time by 40%',
      'Mentored 8 junior developers',
      'Led migration to microservices architecture'
    ]
  }
];

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Colombo',
    location: 'Colombo, Sri Lanka',
    startDate: '2016-09',
    endDate: '2020-06',
    gpa: '3.8/4.0',
    relevant_courses: [
      'Data Structures and Algorithms',
      'Software Engineering',
      'Database Management Systems',
      'Computer Networks',
      'Machine Learning',
      'Web Development'
    ],
    achievements: [
      'Dean\'s List for 6 semesters',
      'President of Computer Science Society',
      'Winner of University Hackathon 2019'
    ]
  }
];