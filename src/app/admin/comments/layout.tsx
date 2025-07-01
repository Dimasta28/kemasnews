
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comments',
  description: 'Manage your blog comments.',
};

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
