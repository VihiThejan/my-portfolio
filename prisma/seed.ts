import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await hashPassword(adminPassword);
    
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Admin user created:', admin.email);
  } else {
    console.log('ℹ️ Admin user already exists:', existingAdmin.email);
  }

  // Seed some demo projects from your existing data
  const existingProjects = await prisma.project.findMany();
  
  if (existingProjects.length === 0) {
    const demoProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'A modern, scalable e-commerce platform built with Next.js and Stripe integration.',
        longDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, advanced search capabilities, and seamless payment processing. Built with modern technologies to ensure scalability and performance.',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        tags: JSON.stringify(['Featured', 'Full Stack', 'E-Commerce']),
        techStack: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS']),
        languages: JSON.stringify(['TypeScript', 'JavaScript', 'SQL']),
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
        challenges: JSON.stringify([
          'Implementing real-time inventory management',
          'Optimizing for high-traffic scenarios',
          'Complex payment flow integration'
        ]),
        solutions: JSON.stringify([
          'Used WebSocket connections for real-time updates',
          'Implemented Redis caching and CDN',
          'Created robust error handling for payment flows'
        ]),
        results: JSON.stringify([
          '300% increase in conversion rate',
          '50ms average page load time',
          '99.9% uptime achieved'
        ]),
        metrics: JSON.stringify([
          { label: 'Users', value: '10K+' },
          { label: 'Transactions', value: '$500K+' },
          { label: 'Performance', value: '95/100' }
        ]),
        published: true,
        order: 1,
      },
      {
        title: 'AI-Powered Analytics Dashboard',
        description: 'Advanced analytics dashboard with machine learning insights and real-time data visualization.',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        tags: JSON.stringify(['AI/ML', 'Analytics', 'React']),
        techStack: JSON.stringify(['React', 'Python', 'TensorFlow', 'D3.js', 'Node.js', 'MongoDB']),
        languages: JSON.stringify(['TypeScript', 'Python', 'JavaScript']),
        status: 'completed',
        difficulty: 'expert',
        category: 'ai-ml',
        featured: true,
        year: 2024,
        duration: '6 months',
        teamSize: 4,
        role: 'AI/ML Engineer',
        published: true,
        order: 2,
      }
    ];

    for (const project of demoProjects) {
      await prisma.project.create({
        data: project,
      });
    }

    console.log('✅ Demo projects created');
  }

  // Seed some demo skills
  const existingSkills = await prisma.skill.findMany();
  
  if (existingSkills.length === 0) {
    const demoSkills = [
      {
        name: 'React',
        category: 'frontend',
        level: 95,
        yearsOfExperience: 5,
        description: 'Advanced React development with hooks, context, and modern patterns',
        published: true,
        order: 1,
      },
      {
        name: 'Next.js',
        category: 'frontend',
        level: 90,
        yearsOfExperience: 4,
        description: 'Full-stack React framework with SSR and API routes',
        published: true,
        order: 2,
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        level: 88,
        yearsOfExperience: 4,
        description: 'Type-safe JavaScript development',
        published: true,
        order: 3,
      },
      {
        name: 'Node.js',
        category: 'backend',
        level: 85,
        yearsOfExperience: 5,
        description: 'Server-side JavaScript runtime',
        published: true,
        order: 4,
      },
      {
        name: 'PostgreSQL',
        category: 'database',
        level: 80,
        yearsOfExperience: 4,
        description: 'Advanced SQL and database design',
        published: true,
        order: 5,
      }
    ];

    for (const skill of demoSkills) {
      await prisma.skill.create({
        data: skill,
      });
    }

    console.log('✅ Demo skills created');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
