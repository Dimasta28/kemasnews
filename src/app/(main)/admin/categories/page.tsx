import { CategoriesTable } from "@/components/admin/categories-table";
import { getCategories } from "@/lib/posts";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return <CategoriesTable categories={categories} />;
}
