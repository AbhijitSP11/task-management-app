"use client";

import React from 'react';
import StoreProvider from '@/redux/provider';
import DashboardLayout from '../DashboardLayout';

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;