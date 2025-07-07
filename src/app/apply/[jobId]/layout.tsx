import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Job',
  description: 'Submit your application for an open position.',
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
