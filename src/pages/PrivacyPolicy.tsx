
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
    <Link to="/" className="inline-flex items-center gap-2 mb-8 text-orange-600 font-semibold hover:underline group">
      <ArrowLeft className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" />
      <span>Back to Home</span>
    </Link>
    <h1 className="text-3xl sm:text-4xl font-black mb-6 text-orange-500">Privacy Policy</h1>
    <p className="mb-4 text-lg">
      We value your privacy. This Privacy Policy explains how your information is collected, used, and safeguarded when you use the <span className="font-bold text-orange-500">45-Day Challenge</span>.
    </p>
    <h2 className="text-xl font-bold mt-8 mb-2 text-gray-800">Information We Collect</h2>
    <ul className="list-disc ml-6 mb-4 text-base text-gray-700">
      <li>Email address, workout routines, and progress records.</li>
      <li>Analytics data to improve your experience.</li>
    </ul>
    <h2 className="text-xl font-bold mt-8 mb-2 text-gray-800">How We Use Your Data</h2>
    <ul className="list-disc ml-6 mb-4 text-base text-gray-700">
      <li>Deliver and improve challenge functionalities.</li>
      <li>Communicate important updates or motivational reminders.</li>
      <li>Never sold to third parties.</li>
    </ul>
    <h2 className="text-xl font-bold mt-8 mb-2 text-gray-800">Your Choices</h2>
    <p className="mb-4 text-base">
      You control your data — reach out anytime for data deletion or questions at
      {' '}
      <a href="mailto:contact@dipnerreddy.in" className="text-orange-600 underline">contact@dipnerreddy.in</a>.
    </p>
    <p className="text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default PrivacyPolicy;
