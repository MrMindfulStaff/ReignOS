'use client';

import { useState } from 'react';
import Link from 'next/link';

const selectStyles = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat' as const,
  backgroundPosition: 'right 1rem center',
  backgroundSize: '1.5rem',
};

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50';

export default function DemoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = {
      FNAME: (form.elements.namedItem('FNAME') as HTMLInputElement).value,
      LNAME: (form.elements.namedItem('LNAME') as HTMLInputElement).value,
      EMAIL: (form.elements.namedItem('EMAIL') as HTMLInputElement).value,
      PHONE: (form.elements.namedItem('PHONE') as HTMLInputElement).value,
      MMERGE3: (form.elements.namedItem('MMERGE3') as HTMLSelectElement).value,
      MMERGE5: (form.elements.namedItem('MMERGE5') as HTMLSelectElement).value,
    };

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus('success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer?.push({
        event: 'generate_lead',
        event_category: 'form',
        event_label: 'demo_page',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-64 -left-64 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-64 -right-64 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="group">
            <img
              src="/1x/Asset 1.png"
              alt="REIGNOS"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </header>

      {/* Form */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10">
            {submitStatus === 'error' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
                <p className="text-gray-300 mb-8">Please try again or email us directly at <a href="mailto:demo@reignos.com" className="text-purple-400 hover:text-purple-300">demo@reignos.com</a>.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
                >
                  Try Again
                </button>
              </div>
            ) : submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">You're booked!</h2>
                <p className="text-gray-300 mb-8">
                  Check your inbox — we'll reach out shortly to schedule your personalized demo.
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all"
                >
                  Explore REIGNOS
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-white mb-2">Book Your Free Demo</h1>
                  <p className="text-gray-400 text-sm">
                    30 minutes. No sales pressure. Just a live look at what REIGNOS can do for your team.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="page-mce-FNAME" className="block text-sm font-medium text-gray-200">
                        First Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="FNAME"
                        id="page-mce-FNAME"
                        required
                        placeholder="Jane"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="page-mce-LNAME" className="block text-sm font-medium text-gray-200">
                        Last Name <span className="text-purple-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="LNAME"
                        id="page-mce-LNAME"
                        required
                        placeholder="Smith"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="page-mce-EMAIL" className="block text-sm font-medium text-gray-200">
                      Work Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="EMAIL"
                      id="page-mce-EMAIL"
                      required
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="page-mce-PHONE" className="block text-sm font-medium text-gray-200">
                      Phone Number <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="PHONE"
                      id="page-mce-PHONE"
                      required
                      placeholder="(555) 123-4567"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="page-mce-MMERGE3" className="block text-sm font-medium text-gray-200">
                        Team Size <span className="text-purple-400">*</span>
                      </label>
                      <select
                        name="MMERGE3"
                        id="page-mce-MMERGE3"
                        required
                        className={inputClass}
                        style={selectStyles}
                      >
                        <option value="">Select...</option>
                        <option value="1-50">1–50</option>
                        <option value="51-200">51–200</option>
                        <option value="201-500">201–500</option>
                        <option value="501-1500">501–1,500</option>
                        <option value="1501+">1,500+</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="page-mce-MMERGE5" className="block text-sm font-medium text-gray-200">
                        Industry <span className="text-purple-400">*</span>
                      </label>
                      <select
                        name="MMERGE5"
                        id="page-mce-MMERGE5"
                        required
                        className={inputClass}
                        style={selectStyles}
                      >
                        <option value="">Select...</option>
                        <option value="Manufacturing & Industrial">Manufacturing</option>
                        <option value="Healthcare & Medical">Healthcare</option>
                        <option value="Retail & Hospitality">Retail & Hospitality</option>
                        <option value="Construction & Trades">Construction & Trades</option>
                        <option value="Technology & Software">Technology</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Logistics & Transportation">Logistics</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Booking your demo...
                      </>
                    ) : (
                      <>
                        <span>Book My Free Demo</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No credit card
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      30-min session
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No commitment
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-lg mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Mindful Measures Inc.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
