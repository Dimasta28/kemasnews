
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
  description: 'Member management has been removed.',
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
