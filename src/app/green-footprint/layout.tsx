
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jejak Hijau',
  description: 'Pelajari tentang keberlanjutan dan manufaktur ramah lingkungan kami.',
};

export default function GreenFootprintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
