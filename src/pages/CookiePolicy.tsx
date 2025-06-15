
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicy = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
    <Link to="/" className="inline-flex items-center gap-2 mb-8 text-orange-600 font-semibold hover:underline group">
      <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Home</span>
    </Link>
    <h1 className="text-3xl sm:text-4xl font-black mb-6 text-orange-500">Cookie Policy</h1>
    <p className="mb-4 text-lg">
      We use cookies to enhance your experience on the <span className="font-bold text-orange-500">45-Day Challenge</span> website.
    </p>
    <ul className="list-disc ml-6 mb-4 text-base text-gray-700">
      <li>Cookies help us remember your preferences and login state.</li>
      <li>We may use analytics cookies to track usage and improve performance.</li>
      <li>You can disable cookies in your browser settings, but functionality may be affected.</li>
    </ul>
    <p className="mb-4 text-base">
      For questions about cookies or your data, email us at <a href="mailto:contact@dipnerreddy.in" className="text-orange-600 underline">contact@dipnerreddy.in</a>.
    </p>
    <p className="text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default CookiePolicy;
