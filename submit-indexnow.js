#!/usr/bin/env node

// IndexNow URL Submission Script
// Run this script to submit all portfolio URLs to search engines

const INDEXNOW_KEY = '51fbbea80132454ea485a9216c2bbf1f';
const HOST = 'vihinsabandara.vercel.app';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';

// Portfolio URLs to submit
const urls = [
  `https://${HOST}`, // Homepage
  `https://${HOST}/projects`, // Projects page
  `https://${HOST}/projects/1`, // E-Commerce Platform
  `https://${HOST}/projects/2`, // AI-Powered Analytics Dashboard
  `https://${HOST}/projects/3`, // Mobile Task Manager
  `https://${HOST}/projects/4`, // Microservices Architecture
  `https://${HOST}/projects/5`, // Real-time Chat Application
  `https://${HOST}/projects/6`, // DevOps CI/CD Pipeline
  `https://${HOST}/sitemap.xml`, // Sitemap
];

async function submitUrlsToIndexNow() {
  console.log('🚀 Starting IndexNow URL submission...\n');
  
  // Check if key file is accessible
  console.log('🔑 Verifying IndexNow key file...');
  try {
    const keyResponse = await fetch(KEY_LOCATION);
    if (keyResponse.ok) {
      const keyContent = await keyResponse.text();
      if (keyContent.trim() === INDEXNOW_KEY) {
        console.log('✅ IndexNow key file verified successfully\n');
      } else {
        console.error('❌ IndexNow key file content mismatch');
        return;
      }
    } else {
      console.error('❌ IndexNow key file not accessible');
      return;
    }
  } catch (error) {
    console.error('❌ Failed to verify key file:', error.message);
    return;
  }

  // Submit URLs in bulk
  const requestBody = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  console.log('📤 Submitting URLs to IndexNow API...');
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Host: ${HOST}`);
  console.log(`   Key Location: ${KEY_LOCATION}\n`);

  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'IndexNow-Portfolio-Submission/1.0'
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);

    if (response.status === 200) {
      console.log('✅ All URLs submitted successfully!');
    } else if (response.status === 202) {
      console.log('✅ URLs accepted for processing!');
    } else if (response.status === 400) {
      console.error('❌ Bad request - Invalid format');
    } else if (response.status === 403) {
      console.error('❌ Forbidden - Key not valid');
    } else if (response.status === 422) {
      console.error('❌ Unprocessable Entity - URLs don\'t belong to host or key mismatch');
    } else if (response.status === 429) {
      console.error('❌ Too Many Requests - Potential spam detected');
    } else {
      console.warn(`⚠️ Unexpected response: ${response.status}`);
    }

    // Try to get response body for more details
    try {
      const responseText = await response.text();
      if (responseText) {
        console.log(`📋 Response Body: ${responseText}`);
      }
    } catch (e) {
      // Response body might be empty
    }

  } catch (error) {
    console.error('❌ Failed to submit URLs:', error.message);
  }

  console.log('\n📝 Submitted URLs:');
  urls.forEach((url, index) => {
    console.log(`   ${index + 1}. ${url}`);
  });

  console.log('\n🔍 Next Steps:');
  console.log('1. Check Bing Webmaster Tools for URL status');
  console.log('2. Monitor search engine crawling in your analytics');
  console.log('3. Re-run this script when you update content');
  console.log('4. Check https://www.indexnow.org/ for more information');
}

// Run the submission
submitUrlsToIndexNow().catch(console.error);
