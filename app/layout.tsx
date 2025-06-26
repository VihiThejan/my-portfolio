import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import { Navigation } from '@/components/shared/Navigation';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vihinsabandara.vercel.app'),
  title: {
    default: 'Vihinsa Thejan Bandara | CEO & Full-Stack Software Engineer Portfolio',
    template: '%s | Vihinsa Thejan Bandara'
  },
  description: 'Experienced software engineer and CEO of Vihi IT Solutions with 5+ years in full-stack development. Specializing in React, Next.js, Node.js, and innovative digital solutions that transform businesses.',
  keywords: [
    'Vihinsa Thejan Bandara',
    'Thejan Bandara',
    'Software Engineer',
    'CEO',
    'Vihi IT Solutions',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'Mobile Development',
    'Cloud Solutions',
    'AWS',
    'Portfolio',
    'Software Consultant',
    'Tech Entrepreneur',
    'Frontend Developer',
    'Backend Developer'
  ],
  authors: [{ name: 'Vihinsa Thejan Bandara', url: 'https://vihinsabandara.vercel.app' }],
  creator: 'Vihinsa Thejan Bandara',
  publisher: 'Vihinsa Thejan Bandara',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'technology',
  classification: 'software development portfolio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vihinsabandara.vercel.app',
    title: 'Vihinsa Thejan Bandara | CEO & Full-Stack Software Engineer',
    description: 'Experienced software engineer and CEO with 5+ years in full-stack development. Expert in React, Next.js, Node.js, and innovative digital solutions.',
    siteName: 'Vihinsa Thejan Bandara Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vihinsa Thejan Bandara - Software Engineer & CEO Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vihinsa Thejan Bandara | CEO & Software Engineer',
    description: 'Experienced software engineer and CEO specializing in full-stack development and innovative digital solutions.',
    creator: '@vihinsabandara',
    site: '@vihinsabandara',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOgdGNsfvhTwMoz2F8APkkH0uoVD1kDQgz-0lxTbnwc',
    yandex: '3c6112077d7fc860',
    yahoo: '3ADE85CFE3F6F4DB1563E9A01C9698E4',
  },
  alternates: {
    canonical: 'https://vihinsabandara.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}