
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

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  // Sanitize the content by stripping HTML tags for the meta description
  const description = post.description || (post.content
    ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)
    : 'An article from the blog.');

  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      images: [
        { 
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }, 
        ...previousImages
      ],
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
