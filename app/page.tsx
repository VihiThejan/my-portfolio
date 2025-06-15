import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Startup } from '@/components/sections/Startup';
import { CurrentProjects } from '@/components/sections/CurrentProjects';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Startup />
      <CurrentProjects />
      <Projects />
      <Skills />
      <TechStack />
      <Testimonials />
      <Footer />
    </>
  );
}