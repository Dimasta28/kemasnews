
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 

// In a real application, this would be your database.
// For now, we'll use a mock data array.

export interface Post {
  id: string;
  title: string;
  description: string;
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
    // Use createdAt for date, fallback to current date
    const date = (data.createdAt as Timestamp)?.toDate() || new Date();
    return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'Draft',
        author: data.author || 'Admin', // Default author
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        // Make sure other required fields have defaults
        content: data.content || '',
        category: data.category || '',
        tags: data.tags || [],
        featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
    } as Post;
  });
   // Sort posts by date in descending order (newest first)
  return postList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(id: string): Promise<Post | null> {
    const postDocRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postDocRef);
  
    if (postSnap.exists()) {
      const data = postSnap.data();
      const date = (data.createdAt as Timestamp)?.toDate() || new Date();
      return {
          id: postSnap.id,
          title: data.title || '',
          description: data.description || '',
          content: data.content || '',
          status: data.status || 'Draft',
          category: data.category || '',
          tags: data.tags || [],
          featuredImage: data.featuredImage || 'https://placehold.co/300x300.png',
          author: data.author || 'Admin',
          date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      } as Post;
    } else {
      console.log("No such document!");
      return null;
    }
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

export async function updatePost(id: string, postData: Partial<Omit<Post, 'id' | 'date' | 'author'>>): Promise<void> {
    try {
        const postDocRef = doc(db, 'posts', id);
        await updateDoc(postDocRef, {
            ...postData,
            updatedAt: serverTimestamp()
        });
    } catch (e) {
        console.error("Error updating document: ", e);
        throw new Error("Could not update post");
    }
}

export async function deletePost(id: string): Promise<void> {
    try {
        const postDocRef = doc(db, 'posts', id);
        await deleteDoc(postDocRef);
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw new Error("Could not delete post");
    }
}
