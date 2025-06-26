export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vihinsa Thejan Bandara",
    "alternateName": "Thejan Bandara",
    "jobTitle": "CEO & Software Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Vihi IT Solutions",
      "url": "https://vihiitsolutions.com"
    },
    "url": "https://vihinsabandara.vercel.app",
    "image": "https://vihinsabandara.vercel.app/pro.jpg",
    "sameAs": [
      "https://github.com/vihinsabandara",
      "https://linkedin.com/in/vihinsabandara",
      "https://twitter.com/vihinsabandara"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Cloud Computing",
      "AWS",
      "MongoDB",
      "PostgreSQL"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "LK"
    },
    "nationality": "Sri Lankan",
    "alumniOf": {
      "@type": "Organization",
      "name": "University"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vihinsa Thejan Bandara Portfolio",
    "alternateName": "Thejan Bandara Portfolio",
    "url": "https://vihinsabandara.vercel.app",
    "description": "Professional portfolio showcasing software engineering projects and expertise",
    "author": {
      "@type": "Person",
      "name": "Vihinsa Thejan Bandara"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "genre": "Portfolio",
    "keywords": "software engineer, portfolio, full stack developer, React, Next.js"
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vihi IT Solutions",
    "founder": {
      "@type": "Person",
      "name": "Vihinsa Thejan Bandara"
    },
    "industry": "Information Technology",
    "description": "Innovative IT solutions company specializing in software development and digital transformation",
    "url": "https://vihiitsolutions.com"
  };
}

export function generateSoftwareApplicationSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Vihinsa Thejan Bandara"
    },
    "programmingLanguage": project.languages,
    "runtimePlatform": project.techStack,
    "applicationCategory": "Web Application",
    "operatingSystem": "Cross-platform",
    "url": project.liveUrl,
    "codeRepository": project.githubUrl,
    "dateCreated": `${project.year}-01-01`,
    "keywords": project.tags.join(", ")
  };
}
