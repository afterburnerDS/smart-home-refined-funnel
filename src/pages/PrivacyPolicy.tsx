import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-rich-black">
      <div className="container mx-auto px-4 max-w-4xl py-8 md:py-20">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-sm">
            Last updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-white">
            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                WattLeads ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our lead generation services, or interact with us in any way.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Personal Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company information and business details</li>
                    <li>Service preferences and requirements</li>
                    <li>Communication preferences</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We automatically collect certain information when you visit our website:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                    <li>Referring website information</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Provide and improve our lead generation services</li>
                <li>Match you with qualified leads based on your business profile</li>
                <li>Communicate with you about our services and updates</li>
                <li>Process payments and manage your account</li>
                <li>Analyze website usage and improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Access and review your personal information</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                8. Third-Party Links
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> privacy@wattleads.com<br />
                  <strong>Address:</strong> WattLeads, [Your Business Address]<br />
                  <strong>Phone:</strong> [Your Phone Number]
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;