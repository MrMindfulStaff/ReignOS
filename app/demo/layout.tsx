import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Demo',
  description:
    'See REIGNOS in action. Get a live, personalized 30-minute demo of the world\'s first AI-powered Workforce Operating System — no credit card, no commitment.',
  alternates: {
    canonical: 'https://www.reignos.com/demo',
  },
  openGraph: {
    title: 'Book a Free REIGNOS Demo',
    description:
      'Get a live walkthrough of REIGNOS — the AI-powered workforce OS that cuts labor costs 15–25% and boosts productivity 20–30%.',
    url: 'https://www.reignos.com/demo',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
