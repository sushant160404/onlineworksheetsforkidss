import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface WriteForUsPageProps {
  onBackToHome: () => void;
}

export const WriteForUsPage: React.FC<WriteForUsPageProps> = ({ onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    contentIdea: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', expertise: '', contentIdea: '', experience: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 sm:p-12 text-white">
            <h1 className="text-4xl sm:text-5xl font-black mb-4 font-['Fredoka',sans-serif]">
              Write For Us
            </h1>
            <p className="text-lg text-purple-100 max-w-2xl">
              Share your expertise with educators and parents. Contribute high-quality educational content and help shape the future of learning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Content Guidelines */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Fredoka',sans-serif]">
                  Content We're Looking For
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Educational Guides & Tutorials</h3>
                    <p className="text-gray-600">
                      Step-by-step guides for teaching specific concepts to children. Include real-world examples and interactive elements.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Learning Tips & Strategies</h3>
                    <p className="text-gray-600">
                      Research-backed strategies for improving student engagement, retention, and academic performance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Subject Matter Deep-Dives</h3>
                    <p className="text-gray-600">
                      In-depth articles about math, phonics, science, typing skills, and other K-5 curriculum subjects.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Parent & Teacher Resources</h3>
                    <p className="text-gray-600">
                      Practical advice for parents and teachers on classroom management, homeschooling, and student motivation.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">Curriculum Insights</h3>
                    <p className="text-gray-600">
                      Analysis of educational standards (Common Core, state standards) and alignment with modern teaching methods.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submission Guidelines */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Fredoka',sans-serif]">
                  Submission Guidelines
                </h2>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Length:</strong> 1,500 - 3,500 words</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Original Content:</strong> Never published before</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Audience:</strong> Written for K-5 educators and parents</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>SEO-Friendly:</strong> Include relevant keywords naturally</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Quality:</strong> Well-researched, professionally written</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span><strong>Tone:</strong> Friendly, conversational, kid-safe</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-['Fredoka',sans-serif]">
                  Writer Benefits
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="font-semibold text-purple-900 text-sm mb-1">💰 Competitive Rates</p>
                    <p className="text-xs text-purple-700">$200 - $500 per article depending on complexity</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-900 text-sm mb-1">📱 Byline & Links</p>
                    <p className="text-xs text-blue-700">Author bio with website/social media links</p>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <p className="font-semibold text-emerald-900 text-sm mb-1">📈 Exposure</p>
                    <p className="text-xs text-emerald-700">Reach millions of educators and parents monthly</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="font-semibold text-orange-900 text-sm mb-1">🎓 Portfolio</p>
                    <p className="text-xs text-orange-700">Feature your work on a trusted educational platform</p>
                  </div>

                  <div className="p-4 bg-pink-50 rounded-lg">
                    <p className="font-semibold text-pink-900 text-sm mb-1">🤝 Community</p>
                    <p className="text-xs text-pink-700">Join our network of educational writers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 font-['Fredoka',sans-serif]">
              Submit Your Pitch
            </h2>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">Thank you for your submission!</p>
                  <p className="text-sm text-emerald-700">We'll review your pitch and get back to you within 3-5 business days.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Expertise *
                </label>
                <select
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select your area of expertise</option>
                  <option value="math">Math Education</option>
                  <option value="reading">Reading & Phonics</option>
                  <option value="science">Science Education</option>
                  <option value="typing">Digital Literacy & Typing</option>
                  <option value="pedagogy">Educational Pedagogy</option>
                  <option value="parenting">Parenting & Homeschooling</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Content Idea Title *
                </label>
                <input
                  type="text"
                  name="contentIdea"
                  value={formData.contentIdea}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                  placeholder="e.g., 10 Strategies to Improve Math Fluency"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Writing Experience *
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your background in education and writing. Include links to your portfolio if available."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Pitch
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              By submitting, you agree that your pitch may be featured in our platform and you have the rights to the content you submit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
