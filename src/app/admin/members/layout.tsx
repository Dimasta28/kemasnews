import type { Metadata } from 'next';
import { AdminLayoutClient } from '../layout-client';

export const metadata: Metadata = {
  title: 'Members',
  description: 'Manage your members.',
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
