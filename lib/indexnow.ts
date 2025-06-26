// IndexNow API integration for instant URL submissions
// This allows immediate notification to search engines when content changes

const INDEXNOW_KEY = '51fbbea80132454ea485a9216c2bbf1f';
const HOST = 'vihinsabandara.vercel.app';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';

/**
 * Submit a single URL to IndexNow
 * @param {string} url - The URL to submit
 * @returns {Promise<boolean>} - Success status
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  try {
    const response = await fetch(`${INDEXNOW_API_URL}?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'IndexNow-Portfolio-Bot/1.0'
      }
    });

    if (response.status === 200) {
      console.log(`✅ IndexNow: Successfully submitted ${url}`);
      return true;
    } else if (response.status === 202) {
      console.log(`✅ IndexNow: URL accepted for processing ${url}`);
      return true;
    } else {
      console.warn(`⚠️ IndexNow: HTTP ${response.status} for ${url}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ IndexNow: Failed to submit ${url}:`, error);
    return false;
  }
}

/**
 * Submit multiple URLs to IndexNow in bulk
 * @param {string[]} urls - Array of URLs to submit
 * @returns {Promise<boolean>} - Success status
 */
export async function submitBulkUrlsToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const requestBody = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    };

    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'IndexNow-Portfolio-Bot/1.0'
      },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 200 || response.status === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${urls.length} URLs`);
      return true;
    } else {
      console.warn(`⚠️ IndexNow: HTTP ${response.status} for bulk submission`);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow: Failed to submit bulk URLs:', error);
    return false;
  }
}

/**
 * Get all important URLs from your portfolio for submission
 * @returns {string[]} - Array of important URLs
 */
export function getPortfolioUrls(): string[] {
  const baseUrl = `https://${HOST}`;
  
  return [
    baseUrl, // Homepage
    `${baseUrl}/projects`, // Projects page
    `${baseUrl}/projects/1`, // E-Commerce Platform
    `${baseUrl}/projects/2`, // AI-Powered Analytics Dashboard
    `${baseUrl}/projects/3`, // Mobile Task Manager
    `${baseUrl}/projects/4`, // Microservices Architecture
    `${baseUrl}/projects/5`, // Real-time Chat Application
    `${baseUrl}/projects/6`, // DevOps CI/CD Pipeline
    `${baseUrl}/sitemap.xml`, // Sitemap
  ];
}

/**
 * Submit all portfolio URLs to IndexNow
 * @returns {Promise<boolean>} - Success status
 */
export async function submitAllPortfolioUrls(): Promise<boolean> {
  const urls = getPortfolioUrls();
  return await submitBulkUrlsToIndexNow(urls);
}

/**
 * Track and submit URL changes (for use in analytics)
 * @param {string} url - The URL that was visited/changed
 * @param {string} action - The action type (view, update, etc.)
 */
export async function trackAndSubmitUrl(url: string, action: string = 'view'): Promise<void> {
  // Submit to IndexNow for fresh content
  if (action === 'update' || action === 'create') {
    await submitUrlToIndexNow(url);
  }
  
  // Track in analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'indexnow_submission', {
      url: url,
      action: action,
      timestamp: new Date().toISOString()
    });
  }
}

// Rate limiting utility
let lastSubmission = 0;
const MIN_INTERVAL = 1000; // 1 second between submissions

/**
 * Rate-limited URL submission to prevent spam
 * @param {string} url - The URL to submit
 * @returns {Promise<boolean>} - Success status
 */
export async function rateLimitedSubmit(url: string): Promise<boolean> {
  const now = Date.now();
  if (now - lastSubmission < MIN_INTERVAL) {
    console.log('⏳ IndexNow: Rate limited, skipping submission');
    return false;
  }
  
  lastSubmission = now;
  return await submitUrlToIndexNow(url);
}

export default {
  submitUrl: submitUrlToIndexNow,
  submitBulk: submitBulkUrlsToIndexNow,
  submitAll: submitAllPortfolioUrls,
  track: trackAndSubmitUrl,
  rateLimited: rateLimitedSubmit,
  getUrls: getPortfolioUrls,
  config: {
    key: INDEXNOW_KEY,
    host: HOST,
    keyLocation: KEY_LOCATION
  }
};
