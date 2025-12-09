
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Form Submissions',
  description: 'View submissions from the Green Journey form.',
};

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
