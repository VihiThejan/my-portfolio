import React from 'react';
import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';
import { Metadata } from 'next';
import { generateSoftwareApplicationSchema } from '@/lib/structured-data';

// Generate static params for all project IDs
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | Project Showcase | Vihinsa Thejan Bandara`,
    description: project.longDescription || project.description,
    keywords: [
      project.title,
      ...project.tags,
      ...project.techStack,
      ...project.languages,
      'software project',
      'portfolio',
      'case study'
    ],
    openGraph: {
      title: `${project.title} | Software Development Project`,
      description: project.longDescription || project.description,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} - Software Development Project`,
        },
      ],
      tags: project.tags,
    },
    twitter: {
      title: `${project.title} | Software Project Showcase`,
      description: project.description,
      images: [project.image],
    },
    alternates: {
      canonical: `https://vihinsabandara.vercel.app/projects/${project.id}`,
    },
  };
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find(p => p.id === params.slug);

  if (!project) {
    notFound();
  }

  const structuredData = generateSoftwareApplicationSchema(project);

  return (
    <>
      {/* Structured Data for this specific project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <ProjectPageClient project={project} />
    </>
  );
}