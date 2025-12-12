
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Banners',
  description: 'Manage the homepage and sidebar promotional banners.',
};

export default function PromoBannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
