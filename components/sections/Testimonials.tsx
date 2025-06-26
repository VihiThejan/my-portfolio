'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare,
  Building,
  User,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { testimonials } from '@/lib/data';

// Utility function for consistent date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

// Utility function for month/year formatting
const formatMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export function Testimonials() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span className="text-primary font-semibold uppercase tracking-wider text-sm">Testimonials</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Client <span className="gradient-text">Feedback</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            What clients and colleagues say about working with me. Real feedback from 
            real projects that showcase the impact of quality software development.
          </motion.p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative mb-16"
        >
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full"
              >
                <Card className="max-w-4xl mx-auto p-8 md:p-12 border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-0">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <Quote className="h-8 w-8 text-primary" />
                      </div>
                      
                      <blockquote className="text-xl md:text-2xl leading-relaxed text-foreground mb-6 italic">
                        "{testimonials[currentIndex].content}"
                      </blockquote>
                      
                      <div className="flex justify-center mb-6">
                        {renderStars(testimonials[currentIndex].rating)}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                      {/* Client Info */}
                      <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                          <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                          {testimonials[currentIndex].verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-muted-foreground font-medium">
                          {testimonials[currentIndex].role}
                        </p>
                        <div className="flex items-center justify-center md:justify-start space-x-2 mt-1">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {testimonials[currentIndex].company}
                          </span>
                        </div>
                      </div>

                      {/* Project Info */}
                      {testimonials[currentIndex].project && (
                        <div className="text-center md:text-left">
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            {testimonials[currentIndex].project}
                          </Badge>
                          <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {formatMonthYear(testimonials[currentIndex].date)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-border/50 hover:bg-primary/5 hover:border-primary/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-border/50 hover:bg-primary/5 hover:border-primary/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full p-6 hover:shadow-glow transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          {testimonial.verified && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {testimonial.project && (
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <Badge variant="outline" className="text-xs">
                          {testimonial.project}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(testimonial.date)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <Card className="p-6 text-center border-border/50">
            <div className="text-2xl font-bold gradient-text mb-2">
              {testimonials.length}+
            </div>
            <div className="text-sm text-muted-foreground">
              Client Reviews
            </div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-2xl font-bold gradient-text mb-2">
              {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">
              Average Rating
            </div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-2xl font-bold gradient-text mb-2">
              {testimonials.filter(t => t.verified).length}
            </div>
            <div className="text-sm text-muted-foreground">
              Verified Reviews
            </div>
          </Card>

          <Card className="p-6 text-center border-border/50">
            <div className="text-2xl font-bold gradient-text mb-2">
              98%
            </div>
            <div className="text-sm text-muted-foreground">
              Satisfaction Rate
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}