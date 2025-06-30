
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Category',
  description: 'Edit an existing category.',
};

export default function EditCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
