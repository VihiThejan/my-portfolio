import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Startup } from '@/components/sections/Startup';
import { CurrentProjects } from '@/components/sections/CurrentProjects';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { Footer } from '@/components/sections/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { generatePersonSchema, generateWebsiteSchema, generateOrganizationSchema } from '@/lib/structured-data';

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema, organizationSchema])
        }}
      />
      
      <Hero />
      <About />
      <Startup />
      <CurrentProjects />
      <Projects />
      <Skills />
      <TechStack />
      <Testimonials />
      <Footer />
      <SpeedInsights/>
    </>
  );
}