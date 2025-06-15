
import React from 'react';

const TermsOfService = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 text-gray-900">
    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
    <p className="mb-4">
      Welcome to the 45-Day Challenge! By accessing or using our web app, you agree to the following terms:
    </p>
    <ul className="list-disc ml-6 mb-4">
      <li>This is a personal development tool. Results may vary by individual.</li>
      <li>You are responsible for your own health and well-being. Consult a healthcare professional before starting new fitness routines.</li>
      <li>Any misuse or attempt to disrupt the service is strictly prohibited.</li>
      <li>Your data is handled per our <a href="/privacy" className="text-orange-500 underline">Privacy Policy</a>.</li>
    </ul>
    <p className="mb-4">
      We reserve the right to update these terms as needed. Continued use indicates acceptance of the terms.
    </p>
    <p className="text-sm text-gray-500 mt-8">
      Last updated: June 15, 2025
    </p>
  </div>
);

export default TermsOfService;
