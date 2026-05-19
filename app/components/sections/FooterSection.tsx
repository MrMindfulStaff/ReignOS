'use client';

import Link from 'next/link';
import { useModal } from '../../contexts/ModalContext';

export default function FooterSection() {
  const { openModal } = useModal();

  return (
    <footer className="bg-slate-950 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img src="/1x/Asset 1.png" alt="REIGNOS" className="h-8 w-auto" />
            </div>
            <p className="text-sm">Building equitable workplaces through science and technology.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <button
                  onClick={() => openModal('demo')}
                  className="hover:text-white transition text-left"
                >
                  Book a Demo
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('signup')}
                  className="hover:text-white transition text-left"
                >
                  Early Access
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:info@mindfulmeasuresinc.com"
                  onClick={() => (window as any).dataLayer?.push({ event: 'cta_click', event_category: 'navigation', event_label: 'footer_email' })}
                  className="hover:text-white transition"
                >
                  Email Us
                </a>
              </li>
              <li>
                <Link
                  href="/demo"
                  onClick={() => (window as any).dataLayer?.push({ event: 'cta_click', event_category: 'navigation', event_label: 'footer_book_demo' })}
                  className="hover:text-white transition"
                >
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mindful Measures Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
