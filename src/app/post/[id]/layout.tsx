
import { getPost } from '@/services/postService';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const post = await getPost(id)

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post?.title || 'Post Not Found',
    description: post?.content.substring(0, 160) || 'An article from the blog.',
    openGraph: {
      images: [post?.featuredImage || '', ...previousImages],
    },
  }
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
