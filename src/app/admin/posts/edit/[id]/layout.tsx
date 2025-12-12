
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Post',
  description: 'Edit an existing post.',
};

export default function EditPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
