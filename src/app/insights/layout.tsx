
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Our blog, news, and industry education.',
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
