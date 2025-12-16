
import { getCategories } from '@/services/categoryService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CategoriesTable } from '../posts/categories-table';

export default async function CategoriesPage() {
  const initialCategories = await getCategories();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Organize your posts by grouping them into categories.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            View, create, and manage all your post categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={initialCategories} />
        </CardContent>
      </Card>
    </div>
  );
}
