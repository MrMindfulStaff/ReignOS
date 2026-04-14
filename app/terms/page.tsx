import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - REIGN',
  description: 'REIGN Terms of Service - Understand your rights and responsibilities when using our Intelligent Workforce Operating System.',
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Your agreement with REIGN</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 space-y-8">
          {/* Effective Date */}
          <div className="text-sm text-gray-400 space-y-1">
            <p>Effective Date: October 20, 2025</p>
            <p>Last Updated: October 20, 2025</p>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">1. Introduction and Acceptance</h2>
            <p className="leading-relaxed">
              Welcome to R.E.I.G.N. ("REIGN," "we," "our," or "us"), the World's First Intelligent Workforce Operating System.
              These Terms of Service ("Terms") govern your access to and use of our website, interactive AI demonstration,
              and related services (collectively, the "Services").
            </p>
            <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r">
              <p className="text-amber-200 font-medium mb-2">IMPORTANT NOTICE:</p>
              <p className="text-gray-300">
                REIGN IS CURRENTLY IN PRE-LAUNCH PHASE. The Services currently available are demonstration and testing tools
                designed to showcase the future capabilities of our platform. Full platform features are not yet available.
              </p>
            </div>
            <p className="leading-relaxed">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms,
              do not use our Services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">2. Pre-Launch Status and Service Description</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">2.1 Current Availability</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Interactive AI Demo:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Available for testing and exploration</li>
                      <li>Demonstrates REIGN's AI-powered workforce intelligence capabilities</li>
                      <li>Showcases our 27+ specialized AI agents concept</li>
                      <li>Provides preview of future platform functionality</li>
                      <li>May not represent final product features or performance</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">What's NOT Available Yet:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Full workforce management platform</li>
                      <li>Live employee onboarding and management</li>
                      <li>Real-time scheduling and time tracking</li>
                      <li>Payroll processing and integrations</li>
                      <li>Production-grade data storage</li>
                      <li>Service Level Agreements (SLAs)</li>
                      <li>Commercial support services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">2.2 Beta Testing and Waitlist</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Users may sign up for beta testing or our waitlist</li>
                  <li>Beta access is invitation-only and subject to availability</li>
                  <li>Beta features are provided "as-is" without warranties</li>
                  <li>We reserve the right to modify or terminate beta access at any time</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">3. Eligibility and Account Registration</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">3.1 Age Requirement</h3>
                <p className="text-gray-400">
                  You must be at least 18 years old to use our Services. By using our Services, you represent that you meet
                  this age requirement.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">3.2 Account Creation</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">For Interactive Demo:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>No account required for basic exploration</li>
                      <li>Optional email registration for enhanced features</li>
                      <li>You are responsible for maintaining account confidentiality</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">For Beta/Waitlist:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>Accurate information required for registration</li>
                      <li>One account per person or organization</li>
                      <li>You must provide valid business information if registering as an organization</li>
                      <li>We reserve the right to reject or terminate registrations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">3.3 Account Security</h3>
                <p className="text-gray-400 mb-2">You are responsible for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Maintaining the confidentiality of login credentials</li>
                  <li>All activities under your account</li>
                  <li>Notifying us immediately of unauthorized access</li>
                  <li>Using strong passwords and security practices</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">4. Use of Interactive AI Demo</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">4.1 Permitted Uses</h3>
                <p className="text-gray-400 mb-2">You may use our interactive AI demo to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Explore REIGN's AI-powered workforce concepts</li>
                  <li>Test hypothetical workforce scenarios</li>
                  <li>Experience our intelligent agent capabilities</li>
                  <li>Provide feedback on features and functionality</li>
                  <li>Learn about workforce optimization possibilities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">4.2 Prohibited Uses</h3>
                <p className="text-gray-400 mb-2">You may NOT:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Use the demo for actual workforce management or business operations</li>
                  <li>Input real, sensitive personal or employee data</li>
                  <li>Rely on demo outputs for actual business decisions</li>
                  <li>Attempt to reverse engineer or extract our AI models</li>
                  <li>Use automated scripts or bots to interact with the demo</li>
                  <li>Overload or interfere with demo infrastructure</li>
                  <li>Use the demo to develop competing products or services</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit malicious code, viruses, or harmful content</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Scrape, crawl, or harvest data from the Services</li>
                  <li>Circumvent security measures or access controls</li>
                  <li>Use the demo for illegal, fraudulent, or harmful purposes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">4.3 Demo Data Usage</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Data You Input:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>Should be fictional or anonymized test data only</li>
                      <li className="text-amber-300">DO NOT input real employee personal information</li>
                      <li className="text-amber-300">DO NOT input confidential business information</li>
                      <li>We may store inputs for improving our AI models</li>
                      <li>Inputs may be used for analytics and development</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Demo Outputs:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>Provided for demonstration purposes only</li>
                      <li>Not intended as professional advice or recommendations</li>
                      <li>Should not be relied upon for actual business decisions</li>
                      <li>May not reflect final product accuracy or capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">5. Intellectual Property Rights</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">5.1 Our Property</h3>
                <p className="text-gray-400 mb-3">
                  All content, features, and functionality of our Services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Software code and architecture</li>
                  <li>AI models and algorithms</li>
                  <li>The 27+ specialized AI agents</li>
                  <li>User interface and design elements</li>
                  <li>Text, graphics, logos, and branding</li>
                  <li>Data structures and processes</li>
                  <li>Documentation and materials</li>
                </ul>
                <p className="text-gray-400 mt-3">
                  Are owned by R.E.I.G.N., our licensors, or our partners and are protected by United States and international
                  copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">5.2 Limited License</h3>
                <p className="text-gray-400 mb-2">We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Access and use the interactive AI demo for personal or internal business evaluation</li>
                  <li>View and interact with demo content</li>
                  <li>Provide feedback on the Services</li>
                </ul>
                <p className="text-gray-400 mt-3 mb-2">This license does NOT permit you to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Modify, copy, or create derivative works</li>
                  <li>Distribute, sell, or sublicense our Services</li>
                  <li>Decompile or reverse engineer our technology</li>
                  <li>Remove copyright or proprietary notices</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">5.3 Feedback and Suggestions</h3>
                <p className="text-gray-400 mb-2">If you provide feedback, suggestions, or ideas about our Services:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>We may use them without compensation or attribution</li>
                  <li>You grant us a perpetual, worldwide, royalty-free license</li>
                  <li>You waive any proprietary rights to such feedback</li>
                  <li>We have no obligation to implement suggestions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">5.4 Trademarks</h3>
                <p className="text-gray-400">
                  "REIGN," "R.E.I.G.N.," "Intelligent Workforce Operating System," "Real-Time Resume," and related marks
                  are trademarks of R.E.I.G.N. Unauthorized use is prohibited.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">6. Privacy and Data Protection</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">6.1 Privacy Policy</h3>
                <p className="text-gray-400">
                  Our Privacy Policy explains how we collect, use, and protect your information. By using our Services,
                  you also agree to our Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">6.2 Demo Data Collection</h3>
                <p className="text-gray-400 mb-2">During pre-launch, we collect:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Usage analytics and interaction patterns</li>
                  <li>Demo inputs and outputs (for AI improvement)</li>
                  <li>Technical data (IP address, browser, device)</li>
                  <li>Feedback and communications</li>
                  <li>Error logs and performance metrics</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">6.3 Data Security</h3>
                <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r mb-3">
                  <p className="text-amber-200 font-medium mb-2">Important Notice:</p>
                  <p className="text-gray-300">As a pre-launch service:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4 mt-2">
                    <li>Security measures are in place but evolving</li>
                    <li>Data protection meets industry standards</li>
                    <li>DO NOT input sensitive or confidential information</li>
                    <li>We use encryption for data transmission and storage</li>
                    <li>Regular security assessments are conducted</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">6.4 Do Not Input Sensitive Data</h3>
                <p className="text-amber-300 font-medium mb-2">NEVER input into the demo:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Real employee personal information (names, SSNs, addresses)</li>
                  <li>Actual payroll or compensation data</li>
                  <li>Confidential business strategies</li>
                  <li>Trade secrets or proprietary information</li>
                  <li>Health information (HIPAA-protected data)</li>
                  <li>Financial account information</li>
                  <li>Any data you wouldn't want publicly disclosed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">7. Disclaimers and Limitations</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">7.1 "AS IS" and "AS AVAILABLE"</h3>
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <p className="text-gray-300 uppercase font-medium mb-3">
                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>Warranties of merchantability</li>
                    <li>Fitness for a particular purpose</li>
                    <li>Non-infringement</li>
                    <li>Accuracy or reliability</li>
                    <li>Uninterrupted or error-free operation</li>
                    <li>Security or data protection</li>
                    <li>Results or outcomes from use</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">7.2 Pre-Launch Disclaimer</h3>
                <p className="text-gray-400 mb-2">AS A PRE-LAUNCH SERVICE:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Features may change, break, or become unavailable</li>
                  <li>Performance may be inconsistent or slow</li>
                  <li>Data may be deleted without notice</li>
                  <li>Service may be interrupted for maintenance</li>
                  <li>AI outputs may be inaccurate or incomplete</li>
                  <li>Final product may differ significantly from demo</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">7.3 No Professional Advice</h3>
                <p className="text-gray-400 mb-2">Our Services do NOT provide:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Legal advice or compliance guidance</li>
                  <li>Human resources consulting</li>
                  <li>Financial or accounting advice</li>
                  <li>Employment law recommendations</li>
                  <li>Professional services of any kind</li>
                </ul>
                <p className="text-gray-400 mt-3">You should consult qualified professionals for business decisions.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">7.4 Third-Party Content</h3>
                <p className="text-gray-400 mb-2">We may link to third-party websites or services:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>We are not responsible for third-party content</li>
                  <li>Links do not imply endorsement</li>
                  <li>Third-party terms and privacy policies apply</li>
                  <li>Use third-party services at your own risk</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">7.5 AI Limitations</h3>
                <p className="text-gray-400 mb-2">Our AI agents and outputs:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Are experimental and under development</li>
                  <li>May produce inaccurate or biased results</li>
                  <li>Should not replace human judgment</li>
                  <li>Are not suitable for production use</li>
                  <li>May not comply with all employment laws</li>
                  <li>Require human oversight and validation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">8. Limitation of Liability</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">8.1 Exclusion of Damages</h3>
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <p className="text-gray-300 uppercase font-medium mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, R.E.I.G.N. SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>Indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or business opportunities</li>
                    <li>Cost of substitute services or technology</li>
                    <li>Damages arising from use or inability to use Services</li>
                    <li>Unauthorized access to or alteration of transmissions or data</li>
                    <li>Statements or conduct of any third party</li>
                    <li>Reliance on demo outputs or recommendations</li>
                    <li>Employment decisions based on our Services</li>
                  </ul>
                  <p className="text-gray-300 mt-3">
                    EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">8.2 Cap on Liability</h3>
                <p className="text-gray-400">
                  OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM THESE TERMS OR USE OF SERVICES SHALL NOT EXCEED THE GREATER OF:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4 mt-2">
                  <li>$100 USD, OR</li>
                  <li>The amount you paid us in the 12 months before the claim (currently $0 for demo users)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">8.3 State-Specific Exceptions</h3>
                <p className="text-gray-400">
                  Some jurisdictions do not allow exclusion of certain warranties or limitation of liability. In such jurisdictions,
                  our liability is limited to the maximum extent permitted by law.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">9. Indemnification</h2>
            <p className="text-gray-400 mb-3">
              You agree to indemnify, defend, and hold harmless R.E.I.G.N., its officers, directors, employees, agents,
              and partners from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees)
              arising from:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
              <li>Your use or misuse of the Services</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or regulation</li>
              <li>Your violation of third-party rights</li>
              <li>Content you submit or transmit through Services</li>
              <li>Your negligence or willful misconduct</li>
              <li>Employment decisions you make based on our Services</li>
            </ul>
            <p className="text-gray-400 mt-3">
              We reserve the right to assume exclusive defense and control of any matter subject to indemnification, at your expense.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">10. Term and Termination</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">10.1 Term</h3>
                <p className="text-gray-400">These Terms remain in effect while you use our Services.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">10.2 Termination by You</h3>
                <p className="text-gray-400">
                  You may stop using our Services at any time. For accounts, you may request deletion through in-app settings
                  (when available).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">10.3 Termination by Us</h3>
                <p className="text-gray-400 mb-2">We may suspend or terminate your access immediately, without notice, for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Abuse of Services or other users</li>
                  <li>Security concerns</li>
                  <li>At our sole discretion during pre-launch phase</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">10.4 Effect of Termination</h3>
                <p className="text-gray-400 mb-2">Upon termination:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Your right to use Services immediately ceases</li>
                  <li>We may delete your account and data</li>
                  <li>Provisions that should survive termination will remain in effect</li>
                  <li>You remain liable for obligations incurred before termination</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">10.5 Survival</h3>
                <p className="text-gray-400 mb-2">The following sections survive termination:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Intellectual Property Rights</li>
                  <li>Disclaimers and Limitations</li>
                  <li>Limitation of Liability</li>
                  <li>Indemnification</li>
                  <li>Dispute Resolution</li>
                  <li>General Provisions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">11. Beta Testing Program</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">11.1 Beta Participation</h3>
                <p className="text-gray-400 mb-2">If invited to beta testing:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Access is granted at our sole discretion</li>
                  <li>Beta features are experimental and unstable</li>
                  <li>We may modify or discontinue beta access anytime</li>
                  <li>Beta data may be deleted without notice</li>
                  <li>No SLAs or support guarantees apply</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">11.2 Beta Feedback</h3>
                <p className="text-gray-400 mb-2">As a beta tester, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Provide constructive feedback</li>
                  <li>Report bugs and issues promptly</li>
                  <li>Keep beta features and information confidential</li>
                  <li>Not disclose beta performance or capabilities publicly</li>
                  <li>Not use beta for production or critical operations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">11.3 Beta Confidentiality</h3>
                <p className="text-gray-400 mb-2">Beta features are confidential and proprietary:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Do not share screenshots, videos, or descriptions publicly</li>
                  <li>Do not discuss beta features with non-participants</li>
                  <li>Do not use beta access for competitive purposes</li>
                  <li>Confidentiality obligations survive beta termination</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">12. Modifications to Services and Terms</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">12.1 Service Changes</h3>
                <p className="text-gray-400 mb-2">We reserve the right to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Modify, suspend, or discontinue Services at any time</li>
                  <li>Change features, functionality, or pricing (before commercial launch)</li>
                  <li>Remove or add content and capabilities</li>
                  <li>Limit access to certain features or users</li>
                  <li>Transition from pre-launch to commercial launch</li>
                </ul>
                <p className="text-gray-400 mt-3">We will provide reasonable notice for material changes when possible.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">12.2 Terms Changes</h3>
                <p className="text-gray-400 mb-2">We may update these Terms:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>To reflect changes in our Services</li>
                  <li>For legal or regulatory compliance</li>
                  <li>To address new features or functionality</li>
                  <li>At our discretion</li>
                </ul>
                <p className="text-gray-400 mt-3 mb-2">Material changes will be communicated via:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Email notification (if you provided an email)</li>
                  <li>Website notice</li>
                  <li>In-app notification (when available)</li>
                </ul>
                <p className="text-gray-400 mt-3">Continued use after changes constitutes acceptance of new Terms.</p>
              </div>
            </div>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">13. Dispute Resolution</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">13.1 Informal Resolution</h3>
                <p className="text-gray-400">
                  Before filing a claim, you agree to contact us through our website contact form to attempt informal resolution.
                  We'll work in good faith to resolve disputes within 60 days.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">13.2 Binding Arbitration</h3>
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <p className="text-gray-300 uppercase font-medium mb-3">
                    IF INFORMAL RESOLUTION FAILS, YOU AGREE THAT DISPUTES WILL BE RESOLVED THROUGH BINDING ARBITRATION, NOT IN COURT, EXCEPT:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>Small claims court actions (under $10,000)</li>
                    <li>Intellectual property disputes</li>
                    <li>Injunctive relief requests</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-300 mb-2">Arbitration Rules:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>Governed by Federal Arbitration Act (FAA)</li>
                    <li>Administered by American Arbitration Association (AAA)</li>
                    <li>AAA Commercial Arbitration Rules apply</li>
                    <li>One arbitrator, mutually agreed or AAA-appointed</li>
                    <li>Location: Virtual or at mutually agreed location</li>
                    <li>Each party pays own attorneys' fees unless arbitrator decides otherwise</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">13.3 Class Action Waiver</h3>
                <div className="bg-slate-800 p-4 rounded border border-slate-700">
                  <p className="text-gray-300 uppercase font-medium mb-3">
                    YOU AGREE TO BRING CLAIMS ONLY IN YOUR INDIVIDUAL CAPACITY, NOT AS:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>A plaintiff or class member in any class action</li>
                    <li>A representative or private attorney general action</li>
                    <li>A consolidated or mass action</li>
                  </ul>
                  <p className="text-gray-300 mt-3">
                    This waiver applies in arbitration and in court (for exceptions above).
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">13.4 Opt-Out of Arbitration</h3>
                <p className="text-gray-400">
                  You may opt out of arbitration within 30 days of first accepting these Terms by sending written notice through
                  our website contact form, including your name, email, and statement: "I opt out of arbitration".
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">13.5 Governing Law</h3>
                <p className="text-gray-400">
                  These Terms are governed by the laws of the United States, without regard to conflict of law principles.
                  For users outside the United States, local laws may provide additional rights.
                </p>
              </div>
            </div>
          </section>

          {/* Section 14 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">14. International Use</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">14.1 Global Access</h3>
                <p className="text-gray-400 mb-2">While we may make Services available globally:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Services are controlled from the United States</li>
                  <li>We make no representation Services are appropriate for all locations</li>
                  <li>Accessing Services from locations where illegal is prohibited</li>
                  <li>You are responsible for compliance with local laws</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">14.2 Export Controls</h3>
                <p className="text-gray-400">
                  You agree to comply with all export and import laws and regulations, including U.S. Export Administration
                  Regulations. You will not export, re-export, or transfer Services to prohibited countries or entities.
                </p>
              </div>
            </div>
          </section>

          {/* Section 15 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">15. General Provisions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">15.1 Entire Agreement</h3>
                <p className="text-gray-400">
                  These Terms, along with our Privacy Policy, constitute the entire agreement between you and R.E.I.G.N.
                  regarding the Services.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.2 Severability</h3>
                <p className="text-gray-400">
                  If any provision is found unenforceable, it will be modified to reflect the parties' intention, and remaining
                  provisions remain in full effect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.3 Waiver</h3>
                <p className="text-gray-400">
                  Our failure to enforce any right or provision is not a waiver. Waivers must be in writing and signed by
                  authorized representatives.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.4 Assignment</h3>
                <p className="text-gray-400">
                  You may not assign these Terms without our written consent. We may assign these Terms without restriction,
                  including to affiliates or in connection with a merger or sale.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.5 No Third-Party Beneficiaries</h3>
                <p className="text-gray-400">These Terms do not create rights for any third parties.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.6 Force Majeure</h3>
                <p className="text-gray-400 mb-2">
                  We are not liable for failure to perform due to circumstances beyond our reasonable control, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Natural disasters</li>
                  <li>War or terrorism</li>
                  <li>Government actions</li>
                  <li>Internet or utility failures</li>
                  <li>Pandemics or health emergencies</li>
                  <li>Strikes or labor disputes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.7 Notice</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">To You:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>Email to the address you provided</li>
                      <li>Posting on our website</li>
                      <li>In-app notification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">To Us:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                      <li>Through our website contact form</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.8 Language</h3>
                <p className="text-gray-400">
                  These Terms are in English. Any translation is for convenience only. In case of conflict, the English version controls.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">15.9 California Users</h3>
                <p className="text-gray-400 mb-2">
                  Under California Civil Code Section 1789.3, California users are entitled to the following consumer rights notice:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Services are provided by R.E.I.G.N.</li>
                  <li>Currently free during pre-launch phase</li>
                  <li>Complaints may be directed through our website contact form</li>
                  <li>Or to: California Department of Consumer Affairs, Consumer Information Division, 1625 North Market Blvd., Suite N 112, Sacramento, CA 95834, or by phone at 1-800-952-5210</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 16 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">16. Future Commercial Terms</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-purple-400">16.1 Transition to Commercial Launch</h3>
                <p className="text-gray-400 mb-2">Upon commercial launch:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Paid subscription plans will be introduced</li>
                  <li>Service Level Agreements (SLAs) will apply</li>
                  <li>Additional terms for commercial use will be provided</li>
                  <li>Beta users may receive promotional pricing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-purple-400">16.2 No Obligation</h3>
                <p className="text-gray-400 mb-2">Pre-launch participation creates no obligation to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Subscribe to commercial services</li>
                  <li>Continue using REIGN after launch</li>
                  <li>Pay for services tested during pre-launch</li>
                  <li>Maintain beta access or features</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 17 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-400">17. Contact Information</h2>
            <p className="text-gray-400">
              For all inquiries, please use the contact form available on our website at www.reignworkforce.com
            </p>
          </section>

          {/* Acknowledgment */}
          <section className="space-y-4 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-semibold text-blue-400">Acknowledgment</h2>
            <div className="bg-purple-600/10 border border-purple-600/30 p-6 rounded-lg">
              <p className="text-purple-300 font-medium mb-3">BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>You have read and understood these Terms</li>
                <li>You agree to be bound by these Terms</li>
                <li>You understand REIGN is in pre-launch phase</li>
                <li>You will not input real sensitive or confidential data</li>
                <li>You will not rely on demo outputs for business decisions</li>
                <li>You have authority to agree to these Terms (if representing an organization)</li>
              </ul>
            </div>
            <p className="text-center text-purple-400 font-medium text-lg mt-6">
              REIGN is building the future of workforce management. Thank you for being part of our journey.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}