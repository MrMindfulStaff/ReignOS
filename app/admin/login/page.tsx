import { Metadata } from 'next';
import LoginForm from '@/app/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login | REIGNOS',
  description: 'Sign in to the REIGNOS admin dashboard',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center mb-4">
            <img
              src="/logo.png"
              alt="REIGNOS"
              className="h-16 w-auto mb-3"
            />
            <span className="text-2xl font-light text-white tracking-wide">
              REIGN<span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-medium">OS</span>
            </span>
          </div>
          <h1 className="text-xl font-semibold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Sign in to manage your blog</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <LoginForm />
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          <a href="/" className="hover:text-purple-400 transition-colors">
            &larr; Back to website
          </a>
        </p>
      </div>
    </div>
  );
}
