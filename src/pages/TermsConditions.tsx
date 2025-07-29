import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
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
            Terms & Conditions
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
                1. Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using WattLeads' lead generation services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                2. Service Description
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                WattLeads provides lead generation services for electrical and smart home companies, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Targeted lead generation through digital marketing campaigns</li>
                <li>Pre-qualification of leads based on specified criteria</li>
                <li>Lead delivery and management services</li>
                <li>Performance tracking and reporting</li>
                <li>Consultation and strategy development</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                3. Service Guarantee
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our service guarantee includes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>45 pre-qualified leads within 90 days or money-back guarantee</li>
                <li>30-day test drive period with no long-term commitment</li>
                <li>Lead quality verification and pre-screening</li>
                <li>Performance-based pricing model</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                <strong>Note:</strong> Guarantee terms are subject to client cooperation and adherence to recommended follow-up procedures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                4. Client Responsibilities
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a client, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Provide accurate business information and requirements</li>
                <li>Respond to leads within 24 hours of delivery</li>
                <li>Maintain professional communication with prospects</li>
                <li>Provide feedback on lead quality and conversion rates</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in spam or unethical marketing practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                5. Payment Terms
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Pricing</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Pricing is based on the selected service package and lead volume. All prices are quoted in USD and are subject to change with 30 days' notice.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Payment Schedule</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Payment is due upon service initiation. We accept major credit cards and bank transfers. Late payments may result in service suspension.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Refunds</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Refunds are provided according to our guarantee terms. Processing fees may apply. Refund requests must be submitted in writing within 30 days of service completion.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-gray-300 leading-relaxed">
                All content, trademarks, and intellectual property on our website and in our services remain the property of WattLeads. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                7. Confidentiality
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Both parties agree to maintain the confidentiality of proprietary information shared during the course of our business relationship. This includes business strategies, client lists, and proprietary methodologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-300 leading-relaxed">
                WattLeads' liability is limited to the amount paid for services in the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages, including lost profits or business opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                9. Indemnification
              </h2>
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify and hold harmless WattLeads from any claims, damages, or expenses arising from your use of our services or violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                10. Termination
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">By Client</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You may terminate services with 30 days' written notice. No refunds will be provided for partial months of service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">By WattLeads</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may terminate services immediately for violation of these terms, non-payment, or unethical business practices.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                11. Dispute Resolution
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The venue for arbitration will be [Your State/Province].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                12. Force Majeure
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Neither party shall be liable for delays or failures in performance due to circumstances beyond their reasonable control, including but not limited to natural disasters, government actions, or technical failures.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                13. Governing Law
              </h2>
              <p className="text-gray-300 leading-relaxed">
                These terms are governed by the laws of [Your State/Province], without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                14. Changes to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-semibold text-white mb-4">
                15. Contact Information
              </h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-300">
                  <strong>Email:</strong> legal@wattleads.com<br />
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

export default TermsConditions;