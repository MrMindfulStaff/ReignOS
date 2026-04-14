'use client';

import { useState, useEffect, useRef } from 'react';
import Section from '../Section';

const MAILCHIMP_ACTION_URL = 'https://reignos.us21.list-manage.com/subscribe/post?u=51c8d9860074f1c7205c2f452&id=3e97664d88&f_id=00d743e6f0';

export default function SignupSection() {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer?.push({
        event: 'sign_up',
        event_category: 'form',
        event_label: 'signup_section',
      });
    }, 1000);
  };

  return (
    <Section
      id="signup"
      className="py-24 text-white"
      background={{
        gradient: 'bg-gradient-to-br from-purple-950 via-slate-900 to-blue-950',
      }}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join the Early Access Program</h2>
          <p className="text-xl text-gray-300 mb-8">
            Be among the first to shape the future of unbiased workforce intelligence.
            Join our Early Access Program and start building a fairer, more productive workplace today.
          </p>
        </div>

        <div ref={formRef} className="entrance-element bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">You're on the list!</h3>
              <p className="text-gray-300">
                Check your email for confirmation. We'll be in touch soon with early access details.
              </p>
            </div>
          ) : (
            <form
              action={MAILCHIMP_ACTION_URL}
              method="post"
              id="mc-embedded-subscribe-form-early"
              name="mc-embedded-subscribe-form"
              target="_blank"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label htmlFor="mce-FNAME-early" className="block text-sm font-medium text-white mb-2">
                    First Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="FNAME"
                    id="mce-FNAME-early"
                    required
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="mce-LNAME-early" className="block text-sm font-medium text-white mb-2">
                    Last Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="LNAME"
                    id="mce-LNAME-early"
                    required
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="mce-EMAIL-early" className="block text-sm font-medium text-white mb-2">
                  Email Address <span className="text-purple-400">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  id="mce-EMAIL-early"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="mce-PHONE-early" className="block text-sm font-medium text-white mb-2">
                  Phone Number <span className="text-purple-400">*</span>
                </label>
                <input
                  type="tel"
                  name="PHONE"
                  id="mce-PHONE-early"
                  required
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Hidden fields */}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-semibold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing up...
                  </>
                ) : (
                  'Get Early Access'
                )}
              </button>

              <p className="text-center text-gray-400 text-sm">
                By signing up, you agree to receive updates from REIGNOS.
              </p>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
