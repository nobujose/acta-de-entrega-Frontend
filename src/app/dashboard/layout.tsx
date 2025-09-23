import Header from '@/components/Header';
import AppSidebar from '@/components/Sidebar';
import { HeaderProvider } from '@/context/HeaderContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PopupManager } from '@/components/PopupManager';
import { LogoutConfirmationDialog } from '@/components/LogoutConfirmationDialog';
import { SessionManager } from '@/components/SessionManager'; // <-- Importa el nuevo componente

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <HeaderProvider>
        <div
          id='outer-container'
          className='flex h-screen overflow-hidden bg-body-dashboard text-gray-800'
        >
          <AppSidebar />
          <div id='page-wrap' className='flex flex-1 flex-col overflow-hidden'>
            <Header />
            <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8'>
              {children}
            </main>
          </div>
        </div>
        <LogoutConfirmationDialog />
        <PopupManager />
        <SessionManager /> {/* <-- Añade el gestor de sesión aquí */}
      </HeaderProvider>
    </ProtectedRoute>
  );
}
