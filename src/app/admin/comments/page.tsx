
import { getAllComments } from '@/services/commentService';
import { CommentsClient } from './comments-client';

export default async function CommentsPage() {
  const initialComments = await getAllComments();

  return <CommentsClient initialComments={initialComments} />;
}
