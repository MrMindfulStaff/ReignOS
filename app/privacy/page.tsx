import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - REIGN',
  description: 'REIGN Privacy Policy - Learn how we collect, use, and protect your information in our Intelligent Workforce Operating System.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Your privacy is our priority</p>
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
            <h2 className="text-2xl font-semibold text-purple-400">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to REIGN - the World's First Intelligent Workforce Operating System. R.E.I.G.N. ("we," "our," or "us")
              is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your information when you use our workforce management platform.
            </p>
            <p className="leading-relaxed">
              By accessing or using REIGN, you agree to the terms of this Privacy Policy. If you do not agree with our policies
              and practices, please do not use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">2. Information We Collect</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-400">2.1 Information You Provide</h3>

              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Employee Information:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Personal identification (name, email, phone number, address)</li>
                    <li>Date of birth and demographic information</li>
                    <li>Government-issued identification numbers (as required by law)</li>
                    <li>Educational background and certifications</li>
                    <li>Employment history and work experience</li>
                    <li>Skills, talents, and competencies</li>
                    <li>Performance reviews and ratings</li>
                    <li>Wage and compensation information</li>
                    <li>Banking information for payroll (encrypted)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Employer/Organization Information:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Company details and registration information</li>
                    <li>Authorized user accounts and credentials</li>
                    <li>Organizational structure and hierarchy</li>
                    <li>Project and team configurations</li>
                    <li>Business objectives and operational data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Communication Data:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Messages sent through our platform</li>
                    <li>Support tickets and communications</li>
                    <li>Feedback and survey responses</li>
                    <li>Chat conversations between users</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium text-blue-400">2.2 Information Automatically Collected</h3>

              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Usage Data:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Login times and session duration</li>
                    <li>Pages visited and features used</li>
                    <li>Click patterns and navigation paths</li>
                    <li>Device information (type, operating system, browser)</li>
                    <li>IP address and location data</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Time Tracking Data:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Clock-in and clock-out timestamps</li>
                    <li>Shift schedules and attendance records</li>
                    <li>Break times and overtime hours</li>
                    <li>GPS location data (when location services are enabled)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Performance Metrics:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li>Productivity Performance Indicator (PPI)</li>
                    <li>Average Performance Rating (APR)</li>
                    <li>Success Probability (SP)</li>
                    <li>Attendance rates and patterns</li>
                    <li>Quality ratings and assessments</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">3. How We Use Your Information</h2>

            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-medium text-blue-400 mb-2">3.1 Primary Uses</h3>
                <div className="space-y-3 ml-4">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Workforce Management:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Schedule creation and shift assignment</li>
                      <li>Time and attendance tracking</li>
                      <li>Payroll processing and wage calculation</li>
                      <li>Performance evaluation and analytics</li>
                      <li>Skills matching and crew optimization</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">AI-Powered Intelligence:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>27+ specialized agents for workforce optimization</li>
                      <li>Predictive analytics and forecasting</li>
                      <li>Automated scheduling recommendations</li>
                      <li>Performance trend analysis</li>
                      <li>Anomaly detection and alerts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400 mb-2">3.2 Analytics and Improvements</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Aggregate data analysis for insights</li>
                  <li>Platform performance optimization</li>
                  <li>Feature development and enhancement</li>
                  <li>Industry benchmarking (anonymized)</li>
                  <li>Research and development</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">4. How We Share Your Information</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">4.1 Within Your Organization</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Employer Access:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Authorized managers and supervisors can access employee data relevant to their management responsibilities</li>
                      <li>HR administrators have access to personnel records</li>
                      <li>Payroll administrators access compensation information</li>
                      <li>Team leads view performance metrics for their teams</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Employee Access:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Employees can view their own profiles, schedules, and performance data</li>
                      <li>Team members can see basic information about colleagues they work with</li>
                      <li>Real-time resume and work history (controlled by employee settings)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">4.2 Third-Party Service Providers</h3>
                <p className="text-gray-400 mb-2">We share information with trusted service providers who assist us in:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Cloud hosting and data storage (AWS/Google Cloud)</li>
                  <li>Payment processing and payroll services</li>
                  <li>Email and communication services</li>
                  <li>Analytics and monitoring tools</li>
                  <li>Identity verification services</li>
                  <li>Background check providers (with consent)</li>
                </ul>
                <p className="text-gray-400 mt-3">All third-party providers are contractually obligated to protect your data and comply with applicable privacy laws.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">4.3 Legal Requirements</h3>
                <p className="text-gray-400 mb-2">We may disclose information when required to:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Comply with court orders, subpoenas, or legal processes</li>
                  <li>Enforce our Terms of Service or other agreements</li>
                  <li>Protect the rights, property, or safety of REIGN, our users, or others</li>
                  <li>Prevent fraud, security breaches, or illegal activities</li>
                  <li>Respond to government or regulatory requests</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">5. Data Security</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">5.1 Security Measures</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Encryption:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>AES-256 encryption at rest for all stored data</li>
                      <li>TLS 1.3 encryption in transit for all communications</li>
                      <li>End-to-end encryption for sensitive personal information</li>
                      <li>Encrypted database connections</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Access Controls:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Role-based access control (RBAC) system</li>
                      <li>Multi-factor authentication (MFA) for all accounts</li>
                      <li>API key rotation policies</li>
                      <li>Regular access audits and reviews</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Infrastructure Security:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>SOC 2 Type II compliant infrastructure</li>
                      <li>Regular security assessments and penetration testing</li>
                      <li>Automated threat detection and monitoring</li>
                      <li>Incident response and disaster recovery plans</li>
                      <li>Automated backups with 24-hour recovery capability</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">5.2 Data Retention</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Active Employment:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Employee data retained for duration of employment</li>
                      <li>Performance records maintained for historical analysis</li>
                      <li>Time entries stored indefinitely for payroll compliance</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Post-Employment:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Personal information retained for 7 years (legal requirement)</li>
                      <li>Performance data anonymized after 3 years</li>
                      <li>Contact information deleted upon request (subject to legal holds)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">6. Your Privacy Rights</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">6.1 Access and Control</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Right to Access:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Request a copy of your personal information</li>
                      <li>Review your performance data and ratings</li>
                      <li>View your time entries and schedules</li>
                      <li>Access your communication history</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Right to Correct:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Update your profile information</li>
                      <li>Correct inaccurate personal data</li>
                      <li>Request corrections to performance records (subject to employer approval)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Right to Delete:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Request deletion of your account</li>
                      <li>Remove optional information</li>
                      <li>Opt out of certain data collection (may limit functionality)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Right to Export:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Download your personal data in machine-readable format (JSON/CSV)</li>
                      <li>Export your work history and performance records</li>
                      <li>Receive your Real-Time Resume™</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">7. Special Protections</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">7.1 Sensitive Information</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Health and Safety Data:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Medical information collected only when legally required</li>
                      <li>Safety incident reports stored securely</li>
                      <li>Access restricted to authorized personnel only</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Biometric Data:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Optional facial recognition for clock-in (explicit consent required)</li>
                      <li>Fingerprint data (if applicable) encrypted and stored separately</li>
                      <li>Users can opt for alternative authentication methods</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">7.2 Children's Privacy</h3>
                <p className="text-gray-400">
                  REIGN is not intended for individuals under 18 years of age. We do not knowingly collect information
                  from minors. If we discover such information has been collected, we will delete it immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">8. Cookies and Tracking Technologies</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">8.1 Types of Cookies</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Essential Cookies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Authentication and session management</li>
                      <li>Security and fraud prevention</li>
                      <li>Required for platform functionality</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-300 mb-2">Analytics Cookies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      <li>Usage statistics and platform performance</li>
                      <li>Feature engagement tracking</li>
                      <li>Aggregated reporting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">8.2 Managing Cookies</h3>
                <p className="text-gray-400 mb-2">You can control cookies through:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Browser settings (disable third-party cookies)</li>
                  <li>Our cookie preference center (Settings → Privacy → Cookies)</li>
                  <li>Opt-out of analytics tracking</li>
                </ul>
                <p className="text-gray-400 mt-3">Note: Disabling essential cookies may impair platform functionality.</p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">9. AI and Automated Decision-Making</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">9.1 How We Use AI</h3>
                <p className="text-gray-400 mb-3">REIGN employs 27+ specialized AI agents for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Schedule optimization and recommendations</li>
                  <li>Performance trend analysis</li>
                  <li>Predictive attendance forecasting</li>
                  <li>Crew composition suggestions</li>
                  <li>Risk identification and alerts</li>
                </ul>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-300 mb-2">Human Oversight:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                    <li>All AI recommendations are advisory, not mandatory</li>
                    <li>Employers make final decisions on employment matters</li>
                    <li>Employees can contest AI-generated assessments</li>
                    <li>Regular audits for bias and fairness</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">9.2 Transparency</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>AI decisions are explainable and transparent</li>
                  <li>Users can request explanation of AI recommendations</li>
                  <li>Agents operate within defined parameters</li>
                  <li>No fully automated hiring or termination decisions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">10. State-Specific Privacy Rights</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">10.1 California Residents (CCPA/CPRA)</h3>
                <p className="text-gray-400 mb-2">California users have additional rights:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to know if information is sold or shared</li>
                  <li>Right to opt out of sale of personal information</li>
                  <li>Right to non-discrimination for exercising privacy rights</li>
                  <li>Right to limit use of sensitive personal information</li>
                </ul>
                <p className="text-gray-400 mt-3 font-medium">REIGN does not sell personal information.</p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">10.2 Other State Residents</h3>
                <p className="text-gray-400">
                  Residents of Virginia, Colorado, Connecticut, Utah, and Nevada have similar rights including data access,
                  portability, deletion, and opt-out options.
                </p>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">11. Updates to This Policy</h2>
            <p className="text-gray-400">
              We may update this Privacy Policy to reflect changes in our practices, legal requirements, or new features.
            </p>
            <div>
              <h3 className="text-xl font-medium text-blue-400">Notification:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                <li>Material changes will be announced via email</li>
                <li>Updated policy posted on our website</li>
                <li>In-app notification of changes</li>
                <li>30-day notice before changes take effect</li>
              </ul>
            </div>
          </section>

          {/* Section 12 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">12. Contact Information</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-blue-400">Privacy Questions:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Email: privacy@reignworkforce.com</li>
                  <li>Phone: 1-800-REIGN-OS</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">Data Protection Officer:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Email: dpo@reignworkforce.com</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-blue-400">Security Concerns:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
                  <li>Email: security@reignworkforce.com</li>
                  <li>Report vulnerabilities: security.reignworkforce.com</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 13 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">13. Compliance Certifications</h2>
            <p className="text-gray-400 mb-3">REIGN maintains the following certifications:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 ml-4">
              <li>SOC 2 Type II Certified</li>
              <li>GDPR Compliant</li>
              <li>CCPA Compliant</li>
              <li>HIPAA Ready (for healthcare clients)</li>
              <li>ISO 27001 Certified (pending)</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}