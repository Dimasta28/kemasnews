
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media Library',
  description: 'Manage all your media content including posts, categories, and tags.',
};

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
