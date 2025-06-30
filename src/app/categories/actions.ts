'use server';

import { revalidatePath } from 'next/cache';
import { addCategory, deleteCategory, updateCategory } from '@/lib/posts';

export async function createCategoryAction(name: string) {
  const result = await addCategory(name);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function updateCategoryAction(oldName: string, newName: string) {
  const result = await updateCategory(oldName, newName);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function deleteCategoryAction(name: string) {
  const result = await deleteCategory(name);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}
