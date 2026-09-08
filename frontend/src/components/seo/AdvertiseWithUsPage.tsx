import React, { useState } from 'react';
import { ArrowLeft, BarChart3, Users, Target, Zap, Send } from 'lucide-react';

interface AdvertiseWithUsPageProps {
  onBackToHome: () => void;
}

export const AdvertiseWithUsPage: React.FC<AdvertiseWithUsPageProps> = ({ onBackToHome }) => {
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    adType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setContactForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        adType: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 sm:p-12 text-white mb-12">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 font-['Fredoka',sans-serif]">
            Advertise With Us
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            Reach millions of educators, parents, and students. Partner with the leading K-5 educational platform.
          </p>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-black text-purple-600 mb-2 font-['Fredoka',sans-serif]">2M+</p>
            <p className="text-sm text-gray-600">Monthly Visitors</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-black text-blue-600 mb-2 font-['Fredoka',sans-serif]">15K+</p>
            <p className="text-sm text-gray-600">Active Educators</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-black text-emerald-600 mb-2 font-['Fredoka',sans-serif]">500K+</p>
            <p className="text-sm text-gray-600">Student Users</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <p className="text-3xl font-black text-orange-600 mb-2 font-['Fredoka',sans-serif]">90%</p>
            <p className="text-sm text-gray-600">Audience Retention</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Advertising Options */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Fredoka',sans-serif]">
                Advertising Options
              </h2>

              <div className="space-y-6">
                {/* Banner Ads */}
                <div className="border-l-4 border-purple-600 pl-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900">Banner Advertising</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Prominent placements across our platform with flexible sizing options.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Hero Banner (Top of page) - Premium placement</li>
                    <li>• Sidebar Ads (300x600, 300x300) - High visibility</li>
                    <li>• Footer Sponsored Section - Brand awareness</li>
                    <li>• In-game Banner - Direct student interaction</li>
                  </ul>
                  <p className="text-purple-600 font-semibold mt-3">Starting at $500/month</p>
                </div>

                {/* Sponsored Content */}
                <div className="border-l-4 border-blue-600 pl-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900">Sponsored Content & Articles</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Native content integrations that provide value to our audience.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Guest Articles - Educational content featuring your brand</li>
                    <li>• Educational Tools - Embed interactive tools/resources</li>
                    <li>• Case Studies - Success stories from partner schools</li>
                    <li>• Resource Guides - Co-branded downloadable content</li>
                  </ul>
                  <p className="text-blue-600 font-semibold mt-3">Starting at $750/month</p>
                </div>

                {/* Email Campaigns */}
                <div className="border-l-4 border-emerald-600 pl-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Users className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900">Email Marketing Partnerships</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Reach our engaged subscriber list directly in their inbox.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Newsletter Features - Dedicated section in weekly emails</li>
                    <li>• Educational Tips - Branded tips reaching 50K+ subscribers</li>
                    <li>• Event Promotions - Announce webinars, sales, or launches</li>
                  </ul>
                  <p className="text-emerald-600 font-semibold mt-3">Starting at $600/month</p>
                </div>

                {/* Premium Partnerships */}
                <div className="border-l-4 border-orange-600 pl-6">
                  <div className="flex items-start gap-3 mb-3">
                    <BarChart3 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900">Premium Partnership Programs</h3>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Custom, comprehensive branding and partnership opportunities.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Co-branded Educational Products</li>
                    <li>• Custom Integration Solutions</li>
                    <li>• Educational Tool Partnerships</li>
                    <li>• Affiliate Commission Programs</li>
                  </ul>
                  <p className="text-orange-600 font-semibold mt-3">Custom Pricing</p>
                </div>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Fredoka',sans-serif]">
                Our Audience
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Primary Audience</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ Elementary Teachers (K-5)</li>
                    <li>✓ Homeschooling Parents</li>
                    <li>✓ School Administrators</li>
                    <li>✓ Educational Specialists</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Audience Interests</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>✓ K-5 Educational Content</li>
                    <li>✓ Teaching Tools & Resources</li>
                    <li>✓ Student Progress Tracking</li>
                    <li>✓ Curriculum Development</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-900">
                  <strong>Quality Traffic:</strong> Our audience is highly engaged, with an average session duration of 8+ minutes 
                  and repeat visit rate of 85%+.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-['Fredoka',sans-serif]">
                  Why Advertise With Us?
                </h3>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Highly targeted K-5 audience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>COPPA compliant safe environment</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>No competing irrelevant ads</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Flexible contract terms</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Detailed analytics & reporting</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600 font-bold">✓</span>
                    <span>Dedicated account management</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-900 text-sm mb-2">Need Custom Options?</p>
                <p className="text-xs text-blue-700">
                  Contact our sales team for tailored advertising packages designed specifically for your brand.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Fredoka',sans-serif]">
            Get in Touch With Our Sales Team
          </h2>

          {submitted && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="font-semibold text-emerald-900">Thank you for your interest!</p>
              <p className="text-sm text-emerald-700">
                Our sales team will contact you within 24 business hours to discuss advertising opportunities.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={contactForm.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                name="contactName"
                value={contactForm.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={contactForm.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                placeholder="(555) 000-0000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Advertising Interest *
              </label>
              <select
                name="adType"
                value={contactForm.adType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select advertising option</option>
                <option value="banner">Banner Advertising</option>
                <option value="sponsored">Sponsored Content</option>
                <option value="email">Email Marketing</option>
                <option value="premium">Premium Partnership</option>
                <option value="custom">Custom Package</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us about your advertising goals..."
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Get in Touch
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Sales inquiries: ads@onlineworksheetsforkidss.com | Phone: (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};
