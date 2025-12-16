
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TagsTable } from '../posts/tags-table';

export default async function TagsPage() {
  // In a real app, you would fetch real tags data here
  const initialTags: any[] = []; 

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tags</h1>
        <p className="text-muted-foreground">Use tags to add specific keywords to your posts.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Tags</CardTitle>
          <CardDescription>
            View and manage all tags used across your posts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TagsTable tags={initialTags} />
        </CardContent>
      </Card>
    </div>
  );
}
