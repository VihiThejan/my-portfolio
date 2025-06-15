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
  title: 'Thejan Bandara | CEO & Software Engineer',
  description: 'Passionate software engineer and entrepreneur leading Vihi IT Solutions. Specializing in creating innovative digital solutions that transform businesses.',
  keywords: 'Thejan Bandara, Software Engineer, CEO, Vihi IT Solutions, Full Stack Developer, React, Next.js, Node.js',
  authors: [{ name: 'Thejan Bandara' }],
  creator: 'Thejan Bandara',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thejanbandara.com',
    title: 'Thejan Bandara | CEO & Software Engineer',
    description: 'Passionate software engineer and entrepreneur leading Vihi IT Solutions. Specializing in creating innovative digital solutions that transform businesses.',
    siteName: 'Thejan Bandara Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thejan Bandara | CEO & Software Engineer',
    description: 'Passionate software engineer and entrepreneur leading Vihi IT Solutions.',
    creator: '@thejanbandara',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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