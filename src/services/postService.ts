
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp, Timestamp, doc, getDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore"; 

// In a real application, this would be your database.
// For now, we'll use a mock data array.

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  status: 'Published' | 'Draft' | 'Archived';
  categories: string[];
  tags: string[];
  featuredImage: string;
  date: string; // ISO String
  author: string;
}

// Simulate fetching data from a database
export async function getPosts(): Promise<Post[]> {
  const postsCol = collection(db, 'posts');
  // Query posts and order by 'createdAt' in descending order (newest first)
  const q = query(postsCol, orderBy('createdAt', 'desc'));
  const postSnapshot = await getDocs(q);

  const postList = postSnapshot.docs.map(doc => {
    const data = doc.data();
    // Use createdAt for date, fallback to current date
    const date = (data.createdAt as Timestamp)?.toDate() || new Date();
    
    // Backward compatibility for categories
    let categories: string[] = [];
    if (data.categories && Array.isArray(data.categories)) {
      categories = data.categories;
    } else if (data.category && typeof data.category === 'string') {
      categories = [data.category];
    }
    
    return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        status: data.status || 'Draft',
        author: data.author || 'KEMAS', // Default author
        date: date.toISOString(),
        content: data.content || '',
        categories: categories, // Use categories array
        tags: data.tags || [],
        featuredImage: data.featuredImage || 'https://placehold.co/600x400.png'
    } as Post;
  });
  // The sorting is now handled by the Firestore query, so client-side sort is not needed.
  return postList;
}

export async function getPost(id: string): Promise<Post | null> {
    const postDocRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postDocRef);
  
    if (postSnap.exists()) {
      const data = postSnap.data();
      const date = (data.createdAt as Timestamp)?.toDate() || new Date();
      
      // Backward compatibility for categories
      let categories: string[] = [];
      if (data.categories && Array.isArray(data.categories)) {
        categories = data.categories;
      } else if (data.category && typeof data.category === 'string') {
        categories = [data.category];
      }
      
      return {
          id: postSnap.id,
          title: data.title || '',
          description: data.description || '',
          content: data.content || '',
          status: data.status || 'Draft',
          categories: categories, // Use categories array
          tags: data.tags || [],
          featuredImage: data.featuredImage || 'https://placehold.co/300x300.png',
          author: data.author || 'KEMAS',
          date: date.toISOString(),
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
            author: 'KEMAS', // Or get current user
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
