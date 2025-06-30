'use server';

import { revalidatePath } from 'next/cache';
import { addSocialLink, deleteSocialLink, updateSocialLink, type SocialLink } from '@/lib/posts';

export async function createSocialLinkAction(data: Omit<SocialLink, 'id'>) {
  const result = await addSocialLink(data);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function updateSocialLinkAction(id: string, data: Omit<SocialLink, 'id'>) {
  const result = await updateSocialLink(id, data);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}

export async function deleteSocialLinkAction(id: string) {
  const result = await deleteSocialLink(id);
  if (result.success) {
    revalidatePath('/(main)', 'layout');
  }
  return result;
}
