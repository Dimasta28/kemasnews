import type { Metadata } from 'next';
import { AdminLayoutClient } from '../layout-client';

export const metadata: Metadata = {
  title: 'Comments',
  description: 'Manage your blog comments.',
};

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
