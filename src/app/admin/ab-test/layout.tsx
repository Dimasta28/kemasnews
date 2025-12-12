
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A/B Testing',
  description: 'Manage A/B tests for forms and buttons.',
};

export default function ABTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
