import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Portfolio | Software Development Showcase',
  description: 'Explore a comprehensive portfolio of software development projects by Vihinsa Thejan Bandara. Full-stack applications, mobile apps, AI/ML solutions, and innovative digital products.',
  keywords: [
    'software projects',
    'portfolio',
    'web development',
    'mobile development',
    'React projects',
    'Next.js applications',
    'Node.js backend',
    'full stack projects',
    'AI ML projects',
    'TypeScript projects',
    'JavaScript projects',
    'software engineering portfolio'
  ],
  openGraph: {
    title: 'Projects Portfolio | Vihinsa Thejan Bandara',
    description: 'Explore innovative software development projects including full-stack applications, mobile apps, and AI/ML solutions.',
    type: 'website',
    images: [
      {
        url: '/projects-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Software Development Projects Portfolio',
      },
    ],
  },
  twitter: {
    title: 'Projects Portfolio | Software Development Showcase',
    description: 'Explore innovative software development projects and technical solutions.',
    images: ['/projects-og.jpg'],
  },
  alternates: {
    canonical: 'https://vihinsabandara.vercel.app/projects',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
