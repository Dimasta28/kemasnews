
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Solutions',
  description: 'From products to solutions, our journey towards sustainability.',
};

export default function OurSolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
