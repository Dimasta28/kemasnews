
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promo Banner',
  description: 'Manage the sidebar promotional banner.',
};

export default function PromoBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
