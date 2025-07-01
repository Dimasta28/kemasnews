
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Careers',
  description: 'Manage the content of the careers page.',
};

export default function CareersAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
