import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { HeaderProvider } from '@/context/HeaderContext';
import { ModalProvider } from '@/components/ModalProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PopupManager } from '@/components/PopupManager';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <HeaderProvider>
        <div className='flex h-screen bg-body-dashboard text-gray-800'>
          <Sidebar />
          <div className='flex flex-1 flex-col overflow-hidden'>
            <Header />
            <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
              {children}
            </main>
          </div>
        </div>
        <ModalProvider />
        <PopupManager />
      </HeaderProvider>
    </ProtectedRoute>
  );
}
