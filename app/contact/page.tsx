import { Metadata } from 'next';
import { ContactPage } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contact - Vihinsa Thejan Bandara',
  description: 'Get in touch with Vihinsa Thejan Bandara. Let\'s discuss your next project or collaboration opportunity.',
  keywords: 'contact, hire developer, freelance developer, web development, mobile development, consultation',
  openGraph: {
    title: 'Contact - Vihinsa Thejan Bandara',
    description: 'Get in touch with Vihinsa Thejan Bandara. Let\'s discuss your next project or collaboration opportunity.',
    type: 'website',
  },
};

export default function Contact() {
  return <ContactPage />;
}
