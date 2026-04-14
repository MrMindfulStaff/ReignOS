'use client';

import { useState, useEffect, useRef } from 'react';
import Section from '../Section';

const MAILCHIMP_ACTION_URL = 'https://reignos.us21.list-manage.com/subscribe/post?u=51c8d9860074f1c7205c2f452&id=3e97664d88&f_id=00d043e6f0';

export default function DemoSection() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // The form submits to Mailchimp directly, so we just show a success message
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Section
      id="demo"
      className="py-24"
      background={{
        gradient: 'bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900',
        parallaxOrbs: {
          positions: [
            { size: 'w-[500px] h-[500px]', position: 'top-0 right-0 translate-x-1/4 -translate-y-1/4', color: 'bg-purple-600/20' },
            { size: 'w-[400px] h-[400px]', position: 'bottom-0 left-0 -translate-x-1/4 translate-y-1/4', color: 'bg-blue-600/20' },
          ],
          opacity: 'opacity-30',
        },
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Get a <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Demo</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how REIGNOS transforms workforce decisions with verified, bias-free intelligence.
            Schedule your personalized demo today.
          </p>
        </div>

        <div
          ref={formRef}
          className="entrance-element bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl shadow-purple-500/10"
        >
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p className="text-gray-300 text-lg">
                We've received your request. Check your email for confirmation and we'll be in touch soon to schedule your demo.
              </p>
            </div>
          ) : (
            <form
              action={MAILCHIMP_ACTION_URL}
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              target="_blank"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="mce-FNAME" className="block text-sm font-medium text-gray-200">
                    First Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="FNAME"
                    id="mce-FNAME"
                    required
                    placeholder="John"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="mce-LNAME" className="block text-sm font-medium text-gray-200">
                    Last Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="LNAME"
                    id="mce-LNAME"
                    required
                    placeholder="Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-200">
                  Email Address <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="mce-PHONE" className="block text-sm font-medium text-gray-200">
                  Phone Number <span className="text-purple-400">*</span>
                </label>
                <input
                  type="tel"
                  name="PHONE"
                  id="mce-PHONE"
                  required
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Organization Size */}
                <div className="space-y-2">
                  <label htmlFor="mce-MMERGE3" className="block text-sm font-medium text-gray-200">
                    Organization Size <span className="text-purple-400">*</span>
                  </label>
                  <select
                    name="MMERGE3"
                    id="mce-MMERGE3"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                  >
                    <option value="">Select size...</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1500">501-1500</option>
                    <option value="1501+">1501+</option>
                  </select>
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label htmlFor="mce-MMERGE5" className="block text-sm font-medium text-gray-200">
                    Industry <span className="text-purple-400">*</span>
                  </label>
                  <select
                    name="MMERGE5"
                    id="mce-MMERGE5"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5rem' }}
                  >
                    <option value="">Select industry...</option>
                    <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                    <option value="Healthcare & Medical">Healthcare & Medical</option>
                    <option value="Retail & Hospitality">Retail & Hospitality</option>
                    <option value="Construction & Trades">Construction & Trades</option>
                    <option value="Technology & Software">Technology & Software</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Logistics & Transportation">Logistics & Transportation</option>
                  </select>
                </div>
              </div>

              {/* Hidden fields */}
              <input type="hidden" name="tags" value="3146512" />
              <input type="hidden" name="EMAILTYPE" value="html" />

              {/* Honeypot field for spam prevention */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input
                  type="text"
                  name="b_51c8d9860074f1c7205c2f452_3e97664d88"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Requesting Demo...
                    </>
                  ) : (
                    <>
                      <span>Request Your Demo</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-center text-gray-400 text-sm pt-2">
                By submitting, you agree to receive communications from REIGNOS.
                <br />
                We respect your privacy and never share your information.
              </p>
            </form>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">No commitment required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Personalized walkthrough</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">See real results</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
