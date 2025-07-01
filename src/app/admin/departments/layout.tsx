import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Departments',
  description: 'Manage your job departments.',
};

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
