
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => (
  <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12 text-gray-900">
    <Link to="/" className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-orange-600 font-semibold hover:underline group">
      <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Home</span>
    </Link>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-orange-500">Cookie Policy</h1>
    <p className="mb-4 text-base sm:text-lg">
      We use cookies to enhance your experience on the <span className="font-bold text-orange-500">45-Day Challenge</span> website.
    </p>
    <ul className="list-disc ml-5 mb-4 text-sm sm:text-base text-gray-700 space-y-1">
      <li>Cookies help us remember your preferences and login state.</li>
      <li>We may use analytics cookies to track usage and improve performance.</li>
      <li>You can disable cookies in your browser settings, but functionality may be affected.</li>
    </ul>
    <p className="mb-4 text-sm sm:text-base">
      For questions about cookies or your data, email us at <a href="mailto:contact@dipnerreddy.in" className="text-orange-600 underline">contact@dipnerreddy.in</a>.
    </p>
    <p className="text-xs sm:text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default CookiePolicy;
