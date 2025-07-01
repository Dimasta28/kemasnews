
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Manage your blog tags.',
};

export default function TagsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
