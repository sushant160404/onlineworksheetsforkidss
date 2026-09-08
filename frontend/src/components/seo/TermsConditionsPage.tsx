import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsConditionsPageProps {
  onBackToHome: () => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({ onBackToHome }) => {
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
              Terms & Conditions
            </h1>
            <p className="text-gray-500">Last updated: September 2026</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using onlineworksheetsforkidss.com (the "Service"), you agree to be bound by these Terms & Conditions. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. License to Use</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on onlineworksheetsforkidss.com 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Service</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
              <p>
                The materials on onlineworksheetsforkidss.com are provided on an 'as is' basis. onlineworksheetsforkidss makes no warranties, expressed or implied, 
                and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitations</h2>
              <p>
                In no event shall onlineworksheetsforkidss or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, 
                or due to business interruption) arising out of the use or inability to use the materials on onlineworksheetsforkidss.com, 
                even if onlineworksheetsforkidss or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on onlineworksheetsforkidss.com could include technical, typographical, or photographic errors. 
                onlineworksheetsforkidss does not warrant that any of the materials on its Service are accurate, complete, or current. 
                onlineworksheetsforkidss may make changes to the materials contained on its Service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Links</h2>
              <p>
                onlineworksheetsforkidss has not reviewed all of the sites linked to its Service and is not responsible for the contents of any such linked site. 
                The inclusion of any link does not imply endorsement by onlineworksheetsforkidss of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
              <p>
                onlineworksheetsforkidss may revise these Terms & Conditions for its Service at any time without notice. 
                By using this Service, you are agreeing to be bound by the then current version of these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
              <p>
                These Terms & Conditions and any separate agreements we provide to you are governed by and construed in accordance with the laws of the jurisdiction 
                in which onlineworksheetsforkidss operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Age Restriction & COPPA Compliance</h2>
              <p>
                The Service is designed for children and is fully compliant with the Children's Online Privacy Protection Act (COPPA). 
                We do not knowingly collect personal information from children under 13 without parental consent. 
                Parents and guardians can review our Privacy Policy for detailed information about how we protect children's data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. User Responsibilities</h2>
              <p>
                Users agree to use the Service for lawful purposes only. You agree not to use the Service in any way that violates any applicable law or regulation. 
                This includes, but is not limited to, using the Service to harass, threaten, defame, or otherwise infringe upon the rights of others.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold">onlineworksheetsforkidss Support</p>
                <p>Email: support@onlineworksheetsforkidss.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
