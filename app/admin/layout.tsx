import { Metadata } from 'next';
import AdminSidebar from '@/app/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | REIGNOS',
  description: 'REIGNOS Blog Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
