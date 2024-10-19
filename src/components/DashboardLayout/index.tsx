"use client";

import React from 'react'
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { useAppSelector } from '@/redux/hooks';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-gray-100">
      <Sidebar />
      <div className={`w-full flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-0' : 'ml-64'}`}>
        <Navbar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;