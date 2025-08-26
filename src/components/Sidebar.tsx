import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="font-semibold">
          Home
        </Link>
        <Link href="/dashboard/actas">Actas</Link>
        <Link href="/dashboard/perfil">Perfil</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
