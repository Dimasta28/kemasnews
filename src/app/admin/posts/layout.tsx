import type { Metadata } from 'next';
import { AdminLayoutClient } from '../layout-client';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Manage your blog posts.',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
