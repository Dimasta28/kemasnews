
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage your blog categories.',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
