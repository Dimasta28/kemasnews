
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wawasan',
  description: 'Blog, berita, dan edukasi seputar industri kami.',
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
