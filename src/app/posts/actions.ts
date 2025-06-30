'use server';

import { revalidatePath } from 'next/cache';
import { addPost } from '@/lib/posts';

interface PostData {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
}

export async function createPostAction(data: PostData) {
  const result = await addPost(data);
  if (result.success) {
    revalidatePath('/');
    revalidatePath('/(main)', 'layout');
    if (result.newSlug) {
        revalidatePath(`/posts/${result.newSlug}`);
    }
  }
  return result;
}
