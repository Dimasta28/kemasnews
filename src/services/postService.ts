'use server';

// In a real application, this would be your database.
// For now, we'll use a mock data array.
const mockPosts: Post[] = [];

export interface Post {
  id: string;
  title: string;
  status: 'Published' | 'Draft' | 'Archived';
  date: string;
  author: string;
}

// Simulate fetching data from a database
export async function getPosts(): Promise<Post[]> {
  // In a real app, you'd fetch this from your database.
  // We'll add a small delay to simulate network latency.
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPosts;
}

// In the future, you could add functions like:
// export async function createPost(post: Omit<Post, 'id'>): Promise<Post> { ... }
// export async function updatePost(id: string, data: Partial<Post>): Promise<Post> { ... }
// export async function deletePost(id: string): Promise<void> { ... }
