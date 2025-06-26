// Google Analytics 4 configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Google Analytics helper functions
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific portfolio events
export const trackProjectView = (projectId: string, projectTitle: string) => {
  event({
    action: 'view_project',
    category: 'Portfolio',
    label: `${projectId}: ${projectTitle}`,
  });
};

export const trackCVDownload = () => {
  event({
    action: 'download_cv',
    category: 'CV',
    label: 'CV Download',
  });
};

export const trackContactFormSubmit = () => {
  event({
    action: 'submit_form',
    category: 'Contact',
    label: 'Contact Form',
  });
};

export const trackExternalLink = (url: string, label: string) => {
  event({
    action: 'click_external_link',
    category: 'External Links',
    label: `${label}: ${url}`,
  });
};

// Declare gtag function type
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
