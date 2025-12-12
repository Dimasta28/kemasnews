
'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

export interface Category {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

// Function to generate a URL-friendly slug from a string
function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Fetch all categories
    const categoriesCol = collection(db, 'categories');
    const q = query(categoriesCol, orderBy('name', 'asc'));
    const categorySnapshot = await getDocs(q);
    const categories = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        slug: doc.data().slug || '',
        postCount: 0 // Initialize post count
    }));

    // Fetch all posts to calculate counts
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    const postCategories = postsSnapshot.docs.flatMap(doc => {
      const data = doc.data();
      // Handle both new 'categories' array and old 'category' string
      if (data.categories && Array.isArray(data.categories)) {
        return data.categories;
      }
      if (data.category && typeof data.category === 'string') {
        return [data.category];
      }
      return [];
    });

    // Create a map of category names to their counts
    const categoryCounts = postCategories.reduce((acc, categoryName) => {
        if (categoryName) {
            acc[categoryName] = (acc[categoryName] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Assign counts to categories
    const categoryList = categories.map(category => ({
        ...category,
        postCount: categoryCounts[category.name] || 0
    }));

    return categoryList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategory(id: string): Promise<Omit<Category, 'postCount'> | null> {
    const categoryDocRef = doc(db, 'categories', id);
    const docSnap = await getDoc(categoryDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            slug: data.slug,
        } as Omit<Category, 'postCount'>;
    }
    return null;
}

export async function createCategory(name: string, slug?: string): Promise<{ success: boolean; message: string; }> {
    try {
        if (!name) {
            return { success: false, message: "Category name is required." };
        }
        
        const finalSlug = slug ? createSlug(slug) : createSlug(name);
        
        const categoriesRef = collection(db, "categories");
        // Check if slug already exists
        const q = query(categoriesRef, where('slug', '==', finalSlug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return { success: false, message: 'Slug already exists. Please use a unique slug.' };
        }

        await addDoc(categoriesRef, {
            name,
            slug: finalSlug,
            createdAt: serverTimestamp(),
        });
        return { success: true, message: 'Category created successfully!' };
    } catch (error) {
        console.error("Error creating category:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateCategory(id: string, name: string, slug?: string): Promise<{ success: boolean; message: string; }> {
    try {
        if (!id || !name) {
            return { success: false, message: "ID and name are required." };
        }
        
        const finalSlug = slug ? createSlug(slug) : createSlug(name);
        const categoryDocRef = doc(db, 'categories', id);

        // Check if the new slug is unique (and not the current document's slug)
        const categoriesRef = collection(db, "categories");
        const q = query(categoriesRef, where('slug', '==', finalSlug));
        const querySnapshot = await getDocs(q);
        const conflictingDoc = querySnapshot.docs.find(d => d.id !== id);

        if (conflictingDoc) {
             return { success: false, message: 'Slug already exists. Please use a unique slug.' };
        }
        
        await updateDoc(categoryDocRef, {
            name,
            slug: finalSlug,
            updatedAt: serverTimestamp()
        });

        return { success: true, message: 'Category updated successfully!' };
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deleteCategory(id: string): Promise<void> {
    try {
        const categoryDocRef = doc(db, 'categories', id);
        await deleteDoc(categoryDocRef);
    } catch (e) {
        console.error("Error deleting category: ", e);
        throw new Error("Could not delete category");
    }
}
