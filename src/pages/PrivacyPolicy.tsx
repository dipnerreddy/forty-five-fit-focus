
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12 text-gray-900">
    <Link to="/" className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-orange-600 font-semibold hover:underline group">
      <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Home</span>
    </Link>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-orange-500">Privacy Policy</h1>
    <p className="mb-4 text-base sm:text-lg">
      We value your privacy. This Privacy Policy explains how your information is collected, used, and safeguarded when you use the <span className="font-bold text-orange-500">45-Day Challenge</span>.
    </p>
    <h2 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-2 text-gray-800">Information We Collect</h2>
    <ul className="list-disc ml-5 mb-4 text-sm sm:text-base text-gray-700 space-y-1">
      <li>Email address, workout routines, and progress records.</li>
      <li>Analytics data to improve your experience.</li>
    </ul>
    <h2 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-2 text-gray-800">How We Use Your Data</h2>
    <ul className="list-disc ml-5 mb-4 text-sm sm:text-base text-gray-700 space-y-1">
      <li>Deliver and improve challenge functionalities.</li>
      <li>Communicate important updates or motivational reminders.</li>
      <li>Never sold to third parties.</li>
    </ul>
    <h2 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-2 text-gray-800">Your Choices</h2>
    <p className="mb-4 text-sm sm:text-base">
      You control your data — reach out anytime for data deletion or questions at
      {' '}
      <a href="mailto:contact@dipnerreddy.in" className="text-orange-600 underline">contact@dipnerreddy.in</a>.
    </p>
    <p className="text-xs sm:text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default PrivacyPolicy;
