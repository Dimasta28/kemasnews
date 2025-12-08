
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Manage all your media content including posts, categories, and tags.',
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
