
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Post',
  description: 'Create a new blog post.',
};

export default function CreatePostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
