'use server';

import { revalidatePath } from 'next/cache';
import { addTag, deleteTag, updateTag } from '@/lib/posts';

export async function createTagAction(name: string) {
  const result = await addTag(name);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function updateTagAction(oldName: string, newName: string) {
  const result = await updateTag(oldName, newName);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function deleteTagAction(name: string) {
  const result = await deleteTag(name);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}
