import { TagsTable } from "@/components/admin/tags-table";
import { getTags } from "@/lib/posts";

export default async function AdminTagsPage() {
  const tags = await getTags();

  return <TagsTable tags={tags} />;
}
