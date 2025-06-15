
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star, Quote, Flame } from 'lucide-react';

const TestimonialsSection = () => {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Mom",
      routine: "Home",
      streak: 45,
      quote: "I never thought I could stick to something for 45 days straight. This challenge changed my entire mindset about consistency and self-discipline.",
      rating: 5,
      beforeAfter: "Lost 12 lbs and gained incredible mental strength"
    },
    {
      name: "Marcus Chen",
      role: "Software Developer",
      routine: "Gym",
      streak: 45,
      quote: "The all-or-nothing approach was exactly what I needed. No excuses, no 'I'll start tomorrow' - just pure commitment.",
      rating: 5,
      beforeAfter: "Built lean muscle and broke through my plateau"
    },
    {
      name: "Lisa Rodriguez",
      role: "Teacher",
      routine: "Home",
      streak: 45,
      quote: "Day 23 was my breaking point, but I pushed through. Completing this challenge was the proudest moment of my year.",
      rating: 5,
      beforeAfter: "Improved flexibility and found my inner warrior"
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-white" id='testimonials'>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
            Real Stories, Real <span className="text-orange-500">Transformations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These challengers didn't just complete 45 days — they transformed their entire lives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                hoveredTestimonial === index ? 'shadow-2xl scale-105' : 'shadow-lg hover:shadow-xl'
              }`}
              onMouseEnter={() => setHoveredTestimonial(index)}
              onMouseLeave={() => setHoveredTestimonial(null)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-orange-200 absolute -top-2 -left-2" />
                  <blockquote className="text-gray-700 italic pl-6">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold">{testimonial.streak} days</span>
                  </div>
                  <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {testimonial.routine} Routine
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-medium">
                  {testimonial.beforeAfter}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
