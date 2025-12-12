
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'Learn about our vision, mission, and certifications.',
};

export default function WhoWeAreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
