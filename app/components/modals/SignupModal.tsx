'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useModal } from '../../contexts/ModalContext';

export default function SignupModal() {
  const { activeModal, closeModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const data = {
      FNAME: (form.elements.namedItem('FNAME') as HTMLInputElement).value,
      LNAME: (form.elements.namedItem('LNAME') as HTMLInputElement).value,
      EMAIL: (form.elements.namedItem('EMAIL') as HTMLInputElement).value,
      PHONE: (form.elements.namedItem('PHONE') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitStatus('success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer?.push({
        event: 'sign_up',
        event_category: 'form',
        event_label: 'signup_modal',
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
    // Reset form state after animation
    setTimeout(() => {
      setSubmitStatus('idle');
    }, 300);
  };

  return (
    <Modal isOpen={activeModal === 'signup'} onClose={handleClose}>
      {submitStatus === 'success' ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">You're on the list!</h3>
          <p className="text-gray-300 text-lg mb-6">
            Check your email for confirmation. We'll be in touch soon with early access details.
          </p>
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all"
          >
            Close
          </button>
        </div>
      ) : submitStatus === 'error' ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Something went wrong</h3>
          <p className="text-gray-300 text-lg mb-6">
            Please try again, or email us directly at{' '}
            <a href="mailto:Reginald@reignos.com" className="text-purple-400 hover:text-purple-300">Reginald@reignos.com</a>.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all border border-white/20"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Join <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Early Access</span>
            </h2>
            <p className="text-gray-300">
              Be among the first to shape the future of unbiased workforce intelligence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="signup-modal-FNAME" className="block text-sm font-medium text-gray-200">
                  First Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="FNAME"
                  id="signup-modal-FNAME"
                  required
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="signup-modal-LNAME" className="block text-sm font-medium text-gray-200">
                  Last Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="LNAME"
                  id="signup-modal-LNAME"
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="signup-modal-EMAIL" className="block text-sm font-medium text-gray-200">
                Email Address <span className="text-purple-400">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                id="signup-modal-EMAIL"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="signup-modal-PHONE" className="block text-sm font-medium text-gray-200">
                Phone Number <span className="text-purple-400">*</span>
              </label>
              <input
                type="tel"
                name="PHONE"
                id="signup-modal-PHONE"
                required
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
              />
            </div>

            {/* Submit Button */}
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
        </>
      )}
    </Modal>
  );
}
