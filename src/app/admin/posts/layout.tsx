
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Manage your blog posts.',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
