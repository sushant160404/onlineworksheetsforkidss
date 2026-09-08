import React from 'react';
import { ArrowLeft, Lock, Eye, Users, ShieldAlert } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
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

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-2 font-['Fredoka',sans-serif]">
              Privacy Policy
            </h1>
            <p className="text-gray-500">Last updated: September 2026</p>
          </div>

          {/* COPPA Compliance Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex gap-4">
            <ShieldAlert className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-emerald-900 mb-2">COPPA Compliant</h3>
              <p className="text-sm text-emerald-800">
                This Privacy Policy is compliant with the Children's Online Privacy Protection Act (COPPA). 
                We take your child's privacy very seriously and maintain the highest standards of data protection.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-600" />
                1. Introduction
              </h2>
              <p>
                onlineworksheetsforkidss ("Company," "we," "us," or "our") operates the onlineworksheetsforkidss.com website (the "Service"). 
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service. 
                We are committed to protecting the privacy of children and operate in full compliance with COPPA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-purple-600" />
                2. Information Collection
              </h2>
              <p className="font-semibold text-gray-900 mt-4">What We Collect:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Account Information:</strong> Username, email (parent email for children under 13), and password</li>
                <li><strong>Profile Data:</strong> Grade level, learning preferences, and avatar selection</li>
                <li><strong>Progress Data:</strong> Game scores, completion rates, and learning progress</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns (non-identifying)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Parental Consent</h2>
              <p>
                For users under 13 years old, we require verifiable parental consent before collecting or using any personal information. 
                Parents can:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request to view their child's account information</li>
                <li>Request deletion of their child's data</li>
                <li>Refuse further data collection</li>
                <li>Update or correct their child's information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Use of Information</h2>
              <p>
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>To provide, maintain, and improve our Service</li>
                <li>To track and display learning progress</li>
                <li>To personalize the learning experience</li>
                <li>To send educational updates (with parental consent)</li>
                <li>To ensure compliance with COPPA and other regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-purple-600" />
                5. Data Sharing & Third Parties
              </h2>
              <p>
                We do NOT share personal information with third parties except:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Service Providers:</strong> Only those who assist in operating our website and conducting our business (with data processing agreements in place)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Parental Request:</strong> We share information with parents upon request</li>
              </ul>
              <p className="mt-4 font-semibold text-gray-900">
                We explicitly do NOT sell or rent personal information to any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect personal information from unauthorized access, alteration, and destruction. 
                This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure password hashing</li>
                <li>Regular security audits</li>
                <li>Limited employee access to personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p>
                We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, 
                or as required by law. Parents can request deletion of their child's account and all associated data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies & Tracking</h2>
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Remember user preferences</li>
                <li>Enhance user experience</li>
                <li>Provide essential functionality</li>
              </ul>
              <p className="mt-4">
                We do NOT use cookies for targeted advertising or behavioral tracking of children.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Request access to all personal information we hold</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of personal information</li>
                <li>Opt out of communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
                and updating the "Last updated" date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold">Privacy Contact</p>
                <p>Email: privacy@onlineworksheetsforkidss.com</p>
                <p className="mt-2 text-sm">Response time: Within 5 business days</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Compliance</h2>
              <p>
                This Privacy Policy complies with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>COPPA (Children's Online Privacy Protection Act)</li>
                <li>GDPR (General Data Protection Regulation) where applicable</li>
                <li>CCPA (California Consumer Privacy Act)</li>
                <li>All applicable state and federal laws</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
