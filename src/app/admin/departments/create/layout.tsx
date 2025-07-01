import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Department',
  description: 'Create a new job department.',
};

export default function CreateDepartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
