import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About REIGN - Intelligent Workforce Operating System',
  description: 'Learn about REIGN, the World\'s First Intelligent Workforce Operating System revolutionizing how organizations manage and empower their workforce with AI-driven intelligence.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-cyan-600/20"></div>
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500/20 blur-3xl animate-pulse-slow"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/20 blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                About REIGN
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Building the Future of Workforce Management Through Artificial Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                REIGN represents a paradigm shift in workforce management. We're not just building another HR platform—we're creating
                an intelligent ecosystem that transforms how organizations understand, manage, and empower their workforce.
              </p>
              <p className="text-gray-300 text-lg mb-6">
                Through our revolutionary AI-driven approach, we eliminate the inefficiencies, biases, and blind spots that plague
                traditional workforce management systems. Our platform brings scientific precision to an industry that has operated
                on intuition for far too long.
              </p>
              <p className="text-gray-300 text-lg">
                We believe that every worker deserves to be understood, valued, and matched with opportunities that maximize their
                potential. Every organization deserves tools that provide true insight into their workforce dynamics.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Precision Matching</h3>
                      <p className="text-gray-400">Match the right talent to the right opportunity with scientific accuracy</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Real-Time Intelligence</h3>
                      <p className="text-gray-400">27+ AI agents working continuously to optimize your workforce</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-cyan-400 text-2xl">🛡️</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Bias-Free Decisions</h3>
                      <p className="text-gray-400">Data-driven insights that eliminate subjective decision-making</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Problem We Solve
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Traditional workforce management is broken. We're fixing it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/20">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-400 text-2xl">❌</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-red-400">The Status Quo</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Manual scheduling takes hours</li>
                <li>• Subjective performance reviews</li>
                <li>• Hidden workforce potential</li>
                <li>• Compliance nightmares</li>
                <li>• Data silos everywhere</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-amber-400 text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-amber-400">The Cost</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• $400B+ in productivity losses</li>
                <li>• 40% employee disengagement</li>
                <li>• 23% annual turnover rates</li>
                <li>• Millions in compliance fines</li>
                <li>• Immeasurable opportunity cost</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-400 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-400">The REIGN Solution</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• AI-powered automation</li>
                <li>• Objective performance metrics</li>
                <li>• Predictive workforce analytics</li>
                <li>• Automated compliance</li>
                <li>• Unified intelligence platform</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              27+ specialized AI agents working in concert to revolutionize workforce management
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-purple-400">Core Intelligence</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Predictive Analytics Engine</strong>
                      <p className="text-gray-400 text-sm mt-1">Forecasts workforce needs, performance trends, and potential issues before they occur</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Natural Language Processing</strong>
                      <p className="text-gray-400 text-sm mt-1">Understands context, sentiment, and nuance in all workforce communications</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Machine Learning Models</strong>
                      <p className="text-gray-400 text-sm mt-1">Continuously learns and adapts to your unique organizational dynamics</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Real-Time Data Processing</strong>
                      <p className="text-gray-400 text-sm mt-1">Processes millions of data points instantly for immediate insights</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Specialized Agents</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Performance Optimization Agent</strong>
                      <p className="text-gray-400 text-sm mt-1">Identifies improvement opportunities and suggests targeted interventions</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Compliance Monitoring Agent</strong>
                      <p className="text-gray-400 text-sm mt-1">Ensures adherence to labor laws, certifications, and safety requirements</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Skills Matching Agent</strong>
                      <p className="text-gray-400 text-sm mt-1">Analyzes capabilities and matches talent to opportunities with precision</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">→</span>
                    <div>
                      <strong className="text-gray-200">Workforce Wellness Agent</strong>
                      <p className="text-gray-400 text-sm mt-1">Monitors burnout risk, engagement levels, and team dynamics</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-400">99.9%</div>
                  <div className="text-sm text-gray-400 mt-1">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">&lt;100ms</div>
                  <div className="text-sm text-gray-400 mt-1">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">256-bit</div>
                  <div className="text-sm text-gray-400 mt-1">Encryption</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">SOC 2</div>
                  <div className="text-sm text-gray-400 mt-1">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We envision a world where workforce management is intelligent, equitable, and empowering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">For Workers</h3>
              <p className="text-gray-400">
                Fair evaluation, growth opportunities, and recognition based on actual performance and potential, not bias or favoritism.
                Your skills and contributions are understood and valued.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-3">For Organizations</h3>
              <p className="text-gray-400">
                Transform workforce management from a cost center to a strategic advantage. Make data-driven decisions that improve
                productivity, reduce turnover, and build stronger teams.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-3">For Society</h3>
              <p className="text-gray-400">
                Create more equitable workplaces where talent is recognized regardless of background. Build a future where work
                is meaningful, productive, and fulfilling for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Scientific Rigor</h3>
              <p className="text-gray-400 text-sm">
                Every decision backed by data, every feature validated by science
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Radical Fairness</h3>
              <p className="text-gray-400 text-sm">
                Eliminating bias through objective, transparent evaluation systems
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-600/20 to-cyan-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Continuous Innovation</h3>
              <p className="text-gray-400 text-sm">
                Pushing boundaries to create solutions that don't yet exist
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Human-Centered</h3>
              <p className="text-gray-400 text-sm">
                Technology that empowers people, not replaces them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Built by Industry Veterans
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our team brings decades of experience in AI, workforce management, and enterprise software
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-purple-400">15+</div>
                <div className="text-gray-400 mt-2">Years Average Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400">50M+</div>
                <div className="text-gray-400 mt-2">Workers Impacted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400">$2B+</div>
                <div className="text-gray-400 mt-2">Productivity Unlocked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">100+</div>
                <div className="text-gray-400 mt-2">Patents & Publications</div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-center text-gray-300">
                Our team includes former leaders from Google, Microsoft, Amazon, Oracle, SAP, and Workday, as well as
                renowned researchers in artificial intelligence, behavioral science, and organizational psychology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join forward-thinking organizations already revolutionizing how they manage talent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              Request a Demo
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-slate-800 px-8 py-4 rounded-lg font-semibold border border-slate-700 hover:bg-slate-700 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            REIGN is currently in pre-launch phase. Join our waitlist to be among the first to experience
            the future of workforce management.
          </p>
          <div className="mt-6">
            <Link href="/" className="text-purple-400 hover:text-purple-300 transition">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}