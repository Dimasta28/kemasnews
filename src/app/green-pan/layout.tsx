import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Plan',
  description: 'Our commitment and plan for a sustainable future.',
};

export default function GreenPanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
