'use server';

// In a real application, this would be your database.
// For now, we'll use a mock data array.
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    status: 'Published',
    date: '2023-10-23',
    author: 'John Doe',
  },
  {
    id: '2',
    title: 'Tailwind CSS Best Practices',
    status: 'Draft',
    date: '2023-10-24',
    author: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Mastering React Hooks',
    status: 'Published',
    date: '2023-09-15',
    author: 'John Doe',
  },
  {
    id: '4',
    title: 'A Guide to Server Components',
    status: 'Published',
    date: '2023-08-01',
    author: 'Emily White',
  },
  {
    id: '5',
    title: 'The Future of Web Development',
    status: 'Archived',
    date: '2023-07-19',
    author: 'Michael Brown',
  },
];

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
