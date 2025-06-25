import React from 'react';
import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProjectPageClient from './ProjectPageClient';

// Generate static params for all project IDs
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
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

  return <ProjectPageClient project={project} />;
}