import type { Metadata } from 'next';
import { AdminLayoutClient } from '../layout-client';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage your blog categories.',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
