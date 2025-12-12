
import type { Metadata } from 'next';
import { AdminLayoutClient } from './layout-client';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin Panel',
    default: 'Admin Panel',
  },
  description: 'Admin dashboard for managing the blog.',
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
