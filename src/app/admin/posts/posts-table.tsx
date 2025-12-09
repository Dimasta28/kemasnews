import { getCategories } from '@/services/categoryService';
import { PostForm } from '../post-form';

export default async function CreatePostPage() {
  const categories = await getCategories();
  
  // In a real app, you'd also fetch tags
  const tags: string[] = [];

  return (
    <PostForm 
      categories={categories.map(c => ({ value: c.name, label: c.name }))} 
      allTags={tags}
    />
  );
}