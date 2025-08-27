import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen bg-white text-gray-800'>
      {' '}
      {/* Fondo blanco */}
      <Sidebar />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
          {' '}
          {/* Fondo blanco */}
          {children}
        </main>
      </div>
    </div>
  );
}
