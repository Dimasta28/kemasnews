
import { getPost } from '@/services/postService';
import { getCategories } from '@/services/categoryService';
import { notFound } from 'next/navigation';
import { PostForm } from '../../post-form';

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const [post, categories] = await Promise.all([
    getPost(params.id),
    getCategories(),
  ]);

  if (!post) {
    notFound();
  }

  // In a real app, you'd fetch all existing tags
  const allTags: string[] = post.tags;

  return (
    <PostForm 
      post={post}
      categories={categories.map(c => ({ value: c.name, label: c.name }))}
      allTags={allTags}
    />
  );
}
