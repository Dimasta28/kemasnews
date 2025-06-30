
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Category',
  description: 'Create a new post category.',
};

export default function CreateCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
