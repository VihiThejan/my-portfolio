import { MetadataRoute } from 'next'

export async function generateStaticParams() {
  return []
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://vihinsabandara.vercel.app'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
