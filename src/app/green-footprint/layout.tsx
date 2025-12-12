
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Footprint',
  description: 'Learn about our sustainability and green manufacturing.',
};

export default function GreenFootprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
