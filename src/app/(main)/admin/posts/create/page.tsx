import { PostForm } from "@/components/admin/post-form";
import { getCategories, getTags } from "@/lib/posts";

export default async function AdminCreatePostPage() {
  const allTags = await getTags();
  const allCategories = await getCategories();

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Create New Post</h2>
        <p className="text-sm text-muted-foreground">Fill out the form below to publish a new article.</p>
      </header>
      <PostForm allTags={allTags} allCategories={allCategories} />
    </div>
  );
}
