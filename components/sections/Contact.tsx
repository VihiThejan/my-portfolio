'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { SectionBackground } from '@/components/ui/section-background';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  User,
  Calendar,
  Clock,
  Globe,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react';

// EmailJS Configuration - You'll need to set these up
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  description: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vihinsabandara@gmail.com',
    href: 'mailto:vihinsabandara@gmail.com',
    description: 'Send me an email anytime'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+94 77 123 4567',
    href: 'tel:+94771234567',
    description: 'Call for urgent matters'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Colombo, Sri Lanka',
    href: 'https://maps.google.com/?q=Colombo,Sri+Lanka',
    description: 'Available for remote work worldwide'
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: '24 hours',
    description: 'I typically respond within a day'
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/vihinsa-thejan',
    color: 'hover:text-blue-600'
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/VihiThejan',
    color: 'hover:text-gray-800 dark:hover:text-gray-200'
  },
  {
    icon: Twitter,
    label: 'Twitter',
    href: 'https://twitter.com/vihinsathejan',
    color: 'hover:text-blue-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1]
    }
  }
};

export function ContactPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      let emailSent = false;

      // Try EmailJS first (if configured)
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY && formRef.current) {
        try {
          await emailjs.sendForm(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formRef.current,
            EMAILJS_PUBLIC_KEY
          );
          emailSent = true;
        } catch (emailjsError) {
          console.warn('EmailJS failed, trying API route:', emailjsError);
        }
      }

      // If EmailJS failed or not configured, try API route
      if (!emailSent) {
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error('API route failed');
          }

          emailSent = true;
        } catch (apiError) {
          console.warn('API route failed, using mailto fallback:', apiError);
        }
      }

      // Final fallback: mailto link
      if (!emailSent) {
        const mailtoLink = `mailto:vihinsabandara@gmail.com?subject=${encodeURIComponent(
          formData.subject || 'Contact Form Submission'
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        
        window.location.href = mailtoLink;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SectionBackground />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <MessageSquare className="w-4 h-4 mr-2" />
                Get In Touch
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Let's Work{' '}
                <span className="gradient-text">Together</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Have a project in mind? I'd love to hear about it. 
                Send me a message and let's discuss how we can bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <Card className="glass-brand border-border/50 hover:border-primary/20 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Send className="w-5 h-5 text-primary" />
                      </div>
                      Send a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            required
                            className="input-premium"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            required
                            className="input-premium"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Project Discussion"
                          className="input-premium"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project..."
                          required
                          rows={6}
                          className="input-premium resize-none"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full glass-brand-button group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Message Sent!
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-8">
                {/* Contact Details */}
                <Card className="glass-brand border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{info.label}</h3>
                          {info.href ? (
                            <a
                              href={info.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1"
                            >
                              {info.value}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <p className="text-primary font-medium">{info.value}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">
                            {info.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Links */}
                <Card className="glass-brand border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      Connect with Me
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-3 bg-primary/10 rounded-lg hover:bg-primary/20 transition-all duration-300 ${social.color}`}
                          aria-label={social.label}
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Follow me on social media for updates and insights
                    </p>
                  </CardContent>
                </Card>

                {/* Availability */}
                <Card className="glass-brand border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Available for New Projects
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      I'm currently accepting new projects and collaborations. 
                      Let's discuss your requirements!
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
