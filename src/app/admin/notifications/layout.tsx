import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Notifications',
  description: 'Manage the content of the header notifications.',
};

export default function NotificationsAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
