
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp } from "firebase/firestore"; 

// In a real application, this would be your database.
// For now, we'll use a mock data array.

export interface Post {
  id: string;
  title: string;
  content: string;
  status: 'Published' | 'Draft' | 'Archived';
  category: string;
  tags: string[];
  featuredImage: string;
  date: string;
  author: string;
}

// Simulate fetching data from a database
export async function getPosts(): Promise<Post[]> {
  const postsCol = collection(db, 'posts');
  const postSnapshot = await getDocs(postsCol);
  const postList = postSnapshot.docs.map(doc => {
    const data = doc.data();
    const date = (data.createdAt as Timestamp)?.toDate() || new Date();
    return {
        id: doc.id,
        title: data.title || '',
        status: data.status || 'Draft',
        author: data.author || 'Admin', // Default author
        date: date.toLocaleDateString(),
        // Make sure other required fields have defaults
        content: data.content || '',
        category: data.category || '',
        tags: data.tags || [],
        featuredImage: data.featuredImage || ''
    } as Post;
  });
  return postList;
}

export async function createPost(post: Omit<Post, 'id' | 'date' | 'author'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            ...post,
            author: 'Admin', // Or get current user
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not create post");
    }
}
