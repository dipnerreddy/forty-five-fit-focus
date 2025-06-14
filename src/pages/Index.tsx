
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Target, 
  Calendar, 
  Trophy, 
  Users, 
  Star, 
  Quote,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Award,
  Heart,
  Mail
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const Index = () => {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null);
  
  console.log('Index page rendering...');

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
        <div className="relative px-4 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                <Flame className="h-4 w-4" />
                <span>The Ultimate Consistency Challenge</span>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                  Transform in
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block sm:inline"> 45 Days</span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
                  One missed day = Start over. No exceptions. No excuses. 
                  <strong className="text-orange-600"> Are you ready for the real challenge?</strong>
                </p>
              </div>
              
              <div className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto sm:max-w-none sm:flex-row sm:justify-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                    Accept the Challenge
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
                    Continue Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why 45 Days Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-6">
              Why <span className="text-orange-400">45 Days?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Science shows it takes 21 days to form a habit, but 45 days to make it unbreakable. 
              We're not building temporary changes — we're forging permanent transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Days 1-15: Ignition</h3>
              <p className="text-gray-300">Your body adapts, motivation is high, and you're building momentum.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Days 16-30: The Crucible</h3>
              <p className="text-gray-300">This is where most people quit. Your discipline is tested daily.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Days 31-45: Mastery</h3>
              <p className="text-gray-300">You've become unstoppable. The habit is now part of who you are.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-24 bg-white">
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

      {/* Sample Certificate Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
              Earn Your <span className="text-orange-500">Victory Certificate</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete all 45 days and earn a shareable certificate that proves your dedication and mental strength.
            </p>
          </div>

          <div className="flex justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <Card className="w-full max-w-2xl shadow-2xl border-4 border-orange-200 bg-gradient-to-br from-white to-orange-50">
                    <CardContent className="p-8">
                      {/* Sample Certificate Preview */}
                      <div className="flex items-start gap-6">
                        <div className="w-16 bg-orange-500 h-32 flex flex-col items-center justify-between p-3 rounded">
                          <Flame className="h-8 w-8 text-white" />
                          <p className="transform rotate-180 text-white font-semibold text-xs tracking-widest [writing-mode:vertical-rl]">
                            45-DAY
                          </p>
                        </div>
                        <div className="flex-1">
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
                            <h3 className="text-lg font-bold text-gray-800">Official Completion Record</h3>
                          </div>
                          <div className="mb-4">
                            <p className="text-sm text-gray-500">This certificate is proudly presented to</p>
                            <p className="text-3xl font-black text-gray-900">Your Name Here</p>
                            <p className="text-sm text-gray-600 mt-1">
                              For completing the <span className="font-bold">45-Day Fitness Challenge</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 pt-2 border-t">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-sm font-semibold">Verified Completion</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          <Trophy className="mr-2 h-4 w-4" />
                          View Full Certificate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl">
                <div className="aspect-[1.414/1] w-full flex bg-white shadow-2xl rounded-lg overflow-hidden">
                  <div className="w-24 bg-orange-500 flex flex-col items-center justify-between p-6">
                    <Flame className="h-12 w-12 text-white" />
                    <p className="transform rotate-180 text-white font-semibold tracking-widest [writing-mode:vertical-rl]">
                      45-DAY CHALLENGE
                    </p>
                  </div>
                  <div className="flex-1 p-12 flex flex-col">
                    <div>
                      <p className="text-sm font-semibold text-gray-400 tracking-widest">CERTIFICATE OF ACHIEVEMENT</p>
                      <h1 className="text-2xl font-bold text-gray-800">Official Completion Record</h1>
                    </div>
                    <div className="flex-grow" />
                    <div>
                      <p className="text-lg text-gray-500">This certificate is proudly presented to</p>
                      <p className="text-7xl font-black text-gray-900 leading-tight">
                        Your Name Here
                      </p>
                      <p className="text-lg text-gray-600 pt-2">
                        For the successful completion of the 
                        <span className="font-bold"> 45-Day Fitness Challenge </span> 
                        on the <span className="font-bold">Home/Gym Routine</span>.
                      </p>
                    </div>
                    <div className="flex-grow" />
                    <div className="flex justify-between items-end border-t pt-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="font-bold">December 2024</p>
                          <p className="text-sm text-gray-500">Date of Completion</p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-400">
                        <p>Credential ID: FC-SAMPLE-123456</p>
                        <p>Streak: 45 Days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-6">
              Built for <span className="text-orange-500">Serious</span> Challengers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-orange-50 group hover:scale-105">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                  <Flame className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">Unforgiving Streak</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Miss one day and you're back to Day 1. No mercy, no exceptions.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-blue-50 group hover:scale-105">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">Locked Routines</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Choose Home or Gym at signup. No switching, no shortcuts.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-green-50 group hover:scale-105">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">Daily Tracking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Log every set, every rep. Completion requires 100% accountability.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center bg-gradient-to-br from-white to-yellow-50 group hover:scale-105">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">Victory Certificate</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Earn a shareable certificate that proves your mental strength.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Challenge Rules - Enhanced with Better Contrast */}
      <div className="py-16 sm:py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-4 border-orange-500 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="font-black text-2xl sm:text-3xl text-orange-400 mb-4">The Sacred Rules</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full"></div>
                <p className="text-gray-200 mt-4 text-lg">Break any rule, start over. No negotiations.</p>
              </div>
              
              <div className="space-y-6">
                {[
                  "Complete your daily workout every single day",
                  "Missing even one day resets your progress to Day 1",
                  "Choose your routine (Home or Gym) at signup - it's locked!",
                  "Track all sets and reps to mark the day complete",
                  "Stay motivated with daily quotes and tips"
                ].map((rule, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <span className="text-gray-100 text-lg leading-relaxed group-hover:text-white transition-colors">
                      {rule}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-16 sm:py-24 bg-gradient-to-br from-orange-500 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-6">
            Ready to Prove Yourself?
          </h2>
          <p className="text-xl sm:text-2xl mb-8 text-orange-100">
            Join the 20% who finish what they start.
          </p>
          
          <div className="space-y-4 sm:space-y-6">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-xl font-black rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                Start Your 45-Day Journey
                <Flame className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            
            <p className="text-orange-200 text-sm">
              No payment required • Start immediately • Prove your discipline
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-black">45-Day Challenge</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transform your life through the power of consistency. One day at a time, one rep at a time.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Made with dedication for serious challengers</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">
                    Start Challenge
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                    Continue Journey
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-orange-400">Get in Touch</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@45daychallenge.com</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Questions about the challenge? Need technical support? We're here to help you succeed.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 45-Day Challenge. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
