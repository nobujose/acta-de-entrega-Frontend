import React from 'react';
// import Sidebar from '@/components/Sidebar'; // We will create this component later

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      {/* <Sidebar /> */}
      <main className="flex-1 p-8">{children}</main>
    </section>
  );
}
