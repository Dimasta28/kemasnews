import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Department',
  description: 'Edit an existing department.',
};

export default function EditDepartmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
