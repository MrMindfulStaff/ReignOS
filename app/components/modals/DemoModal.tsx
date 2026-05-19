'use client';

import { useState } from 'react';
import Modal from '../Modal';
import { useModal } from '../../contexts/ModalContext';

export default function DemoModal() {
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
        event_label: 'demo_modal',
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
    <Modal isOpen={activeModal === 'demo'} onClose={handleClose}>
      {submitStatus === 'success' ? (
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
          <p className="text-gray-300 text-lg mb-6">
            We've received your request. Check your email for confirmation and we'll be in touch soon to schedule your demo.
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
              Get a <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Demo</span>
            </h2>
            <p className="text-gray-300">
              See how REIGNOS transforms workforce decisions with verified, bias-free intelligence.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* First Name */}
              <div className="space-y-2">
                <label htmlFor="modal-mce-FNAME" className="block text-sm font-medium text-gray-200">
                  First Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="FNAME"
                  id="modal-mce-FNAME"
                  required
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label htmlFor="modal-mce-LNAME" className="block text-sm font-medium text-gray-200">
                  Last Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  name="LNAME"
                  id="modal-mce-LNAME"
                  required
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="modal-mce-EMAIL" className="block text-sm font-medium text-gray-200">
                Email Address <span className="text-purple-400">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                id="modal-mce-EMAIL"
                required
                placeholder="john@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="modal-mce-PHONE" className="block text-sm font-medium text-gray-200">
                Phone Number <span className="text-purple-400">*</span>
              </label>
              <input
                type="tel"
                name="PHONE"
                id="modal-mce-PHONE"
                required
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Organization Size */}
              <div className="space-y-2">
                <label htmlFor="modal-mce-MMERGE3" className="block text-sm font-medium text-gray-200">
                  Organization Size <span className="text-purple-400">*</span>
                </label>
                <select
                  name="MMERGE3"
                  id="modal-mce-MMERGE3"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50 appearance-none cursor-pointer"
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
                <label htmlFor="modal-mce-MMERGE5" className="block text-sm font-medium text-gray-200">
                  Industry <span className="text-purple-400">*</span>
                </label>
                <select
                  name="MMERGE5"
                  id="modal-mce-MMERGE5"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-400/50 appearance-none cursor-pointer"
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

            <p className="text-center text-gray-400 text-sm">
              By submitting, you agree to receive communications from REIGNOS.
            </p>
          </form>
        </>
      )}
    </Modal>
  );
}
