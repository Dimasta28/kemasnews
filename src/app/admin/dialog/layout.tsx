
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dialog Examples',
  description: 'Showcases different dialog components.',
};

export default function DialogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

    