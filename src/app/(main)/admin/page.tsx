import { PostForm } from "@/components/admin/post-form";
import { getCategories, getTags } from "@/lib/posts";

export default async function AdminPage() {
  const allTags = await getTags();
  const allCategories = await getCategories();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">Fill out the form below to publish a new article.</p>
      </header>
      <PostForm allTags={allTags} allCategories={allCategories} />
    </div>
  );
}
