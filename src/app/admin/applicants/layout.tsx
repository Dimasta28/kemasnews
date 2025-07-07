import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Applicants',
  description: 'View and manage job applicants.',
};

export default function ApplicantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
