
import { getCategories } from '@/services/categoryService';
import { CategoriesClient } from './categories-client';

export default async function CategoriesPage() {
  const initialCategories = await getCategories();

  return <CategoriesClient initialCategories={initialCategories} />;
}
