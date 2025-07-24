# Contact Form Setup Guide

Your contact form has been successfully implemented with multiple fallback methods to ensure it always works! Here's how to set it up:

## 🚀 Current Status
- ✅ Contact page created at `/contact`
- ✅ Contact form with validation
- ✅ EmailJS integration (client-side)
- ✅ API route fallback (server-side)
- ✅ Mailto fallback (always works)
- ✅ Already added to navigation

## 📧 Email Delivery Methods

Your contact form uses a **3-tier fallback system**:

1. **EmailJS** (Primary) - Sends emails directly from the browser
2. **API Route** (Secondary) - Server-side email sending
3. **Mailto Link** (Fallback) - Opens user's email client

## 🔧 Setup Instructions

### Option 1: EmailJS (Recommended - Easy Setup)

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://emailjs.com)
   - Sign up for a free account

2. **Create Email Service**
   - Connect your Gmail account
   - Note down the Service ID

3. **Create Email Template**
   - Create a template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
   - Note down the Template ID

4. **Get Public Key**
   - Go to Account Settings
   - Copy your Public Key

5. **Configure Environment Variables**
   ```bash
   # Create .env.local file
   cp .env.local.example .env.local
   ```
   
   Add these values to `.env.local`:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

### Option 2: Gmail SMTP (API Route)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Create App Password**
   - Go to Google Account Settings > Security
   - Generate an App Password for "Mail"

3. **Install Nodemailer**
   ```bash
   npm install nodemailer @types/nodemailer
   ```

4. **Configure Environment Variables**
   ```env
   GMAIL_USER=vihinsabandara@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   ```

5. **Update API Route**
   - Uncomment the Nodemailer section in `app/api/contact/route.ts`

### Option 3: Other Email Services

**SendGrid:**
```bash
npm install @sendgrid/mail
```

**AWS SES:**
```bash
npm install aws-sdk
```

See `.env.local.example` for configuration details.

## 🎨 Features Included

- **Responsive Design** - Works on all devices
- **Form Validation** - Client-side validation with error messages
- **Loading States** - Shows spinner during submission
- **Success Feedback** - Toast notifications for user feedback
- **Accessibility** - Screen reader friendly
- **Contact Information** - Your details and social links
- **Beautiful UI** - Matches your portfolio theme

## 📱 Contact Information

Update your contact details in `components/sections/Contact.tsx`:

```tsx
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vihinsabandara@gmail.com', // ✅ Already set
    href: 'mailto:vihinsabandara@gmail.com'
  },
  // Add more contact methods if needed
];
```

## 🌐 Social Links

Your social links are already configured:
- LinkedIn: linkedin.com/in/vihinsa-thejan
- GitHub: github.com/VihiThejan
- Twitter: twitter.com/vihinsabandara

## 🔥 Testing

1. **Test Locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/contact`

2. **Test Form Submission**
   - Fill out the form
   - Submit and check for success message
   - Without EmailJS config, it will use mailto fallback

3. **Production Testing**
   - Deploy to Vercel/Netlify
   - Test all email methods work

## 🚨 Troubleshooting

**Form not sending emails?**
- Check environment variables are set
- Verify EmailJS configuration
- Check browser console for errors
- Mailto fallback should always work

**EmailJS not working?**
- Verify Service ID, Template ID, and Public Key
- Check EmailJS dashboard for failed sends
- Ensure template variables match form fields

**API route issues?**
- Check server logs
- Verify environment variables
- Test API endpoint directly

## 🎯 Next Steps

1. **Set up EmailJS** (5 minutes) - Easiest option
2. **Test the contact form** - Submit a test message
3. **Customize styling** - Adjust colors/layout if needed
4. **Add more contact methods** - Phone, address, etc.

Your contact form is now ready to receive messages directly to your Gmail! 🚀
