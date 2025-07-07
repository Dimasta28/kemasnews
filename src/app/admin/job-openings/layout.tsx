import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Job Openings',
  description: 'Create, edit, and manage job openings.',
};

export default function JobOpeningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
