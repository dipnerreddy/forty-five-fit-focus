
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => (
  <div className="max-w-3xl mx-auto px-2 sm:px-4 py-8 sm:py-12 text-gray-900 text-center">
    <Link to="/" className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-orange-600 font-semibold hover:underline group">
      <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Home</span>
    </Link>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-orange-500">Terms of Service</h1>
    <p className="mb-4 text-base sm:text-lg">
      Welcome to the <span className="font-bold text-orange-500">45-Day Challenge</span>! By accessing or using our web app, you agree to the following terms:
    </p>
    <ul className="list-disc mx-auto text-left sm:mx-auto mb-4 text-sm sm:text-base text-gray-700 space-y-1 max-w-md">
      <li>This is a personal development tool. Results may vary by individual.</li>
      <li>You are responsible for your own health and well-being. Consult a healthcare professional before starting new fitness routines.</li>
      <li>Any misuse or attempt to disrupt the service is strictly prohibited.</li>
      <li>Your data is handled per our <Link to="/privacy" className="text-orange-500 underline">Privacy Policy</Link>.</li>
    </ul>
    <p className="mb-4 text-sm sm:text-base">
      We reserve the right to update these terms as needed. Continued use indicates acceptance of the terms.
    </p>
    <p className="text-xs sm:text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default TermsOfService;
