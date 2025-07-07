
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

  // If the post doesn't exist, return a simple metadata object.
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  // Sanitize the content by stripping HTML tags for the meta description
  const description = post.content
    ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)
    : 'An article from the blog.';

  return {
    title: post.title,
    description: description,
    openGraph: {
      images: [post.featuredImage, ...previousImages],
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
