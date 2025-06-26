import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export function SEO({
  title = 'Vihinsa Thejan Bandara | CEO & Software Engineer',
  description = 'Experienced software engineer and CEO with 5+ years in full-stack development. Expert in React, Next.js, Node.js, and innovative digital solutions.',
  keywords = [],
  image = '/og-image.jpg',
  url = 'https://vihinsabandara.vercel.app',
  type = 'website',
  structuredData
}: SEOProps) {
  const keywordString = keywords.length > 0 ? keywords.join(', ') : '';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}
      <meta name="author" content="Vihinsa Thejan Bandara" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vihinsa Thejan Bandara Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@vihinsabandara" />
      <meta name="twitter:site" content="@vihinsabandara" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//images.pexels.com" />
    </Head>
  );
}
