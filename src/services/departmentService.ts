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

export interface Department {
  id: string;
  name: string;
  slug: string;
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

export async function getDepartments(): Promise<Department[]> {
  try {
    const departmentsCol = collection(db, 'departments');
    const q = query(departmentsCol, orderBy('name', 'asc'));
    const departmentSnapshot = await getDocs(q);
    const departments = departmentSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || '',
        slug: doc.data().slug || '',
    }));
    return departments;
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}

export async function getDepartment(id: string): Promise<Department | null> {
    const departmentDocRef = doc(db, 'departments', id);
    const docSnap = await getDoc(departmentDocRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            id: docSnap.id,
            name: data.name,
            slug: data.slug,
        } as Department;
    }
    return null;
}

export async function createDepartment(name: string, slug?: string): Promise<{ success: boolean; message: string; }> {
    try {
        if (!name) {
            return { success: false, message: "Department name is required." };
        }
        
        const finalSlug = slug ? createSlug(slug) : createSlug(name);
        
        const departmentsRef = collection(db, "departments");
        // Check if slug already exists
        const q = query(departmentsRef, where('slug', '==', finalSlug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return { success: false, message: 'Slug already exists. Please use a unique slug.' };
        }

        await addDoc(departmentsRef, {
            name,
            slug: finalSlug,
            createdAt: serverTimestamp(),
        });
        return { success: true, message: 'Department created successfully!' };
    } catch (error) {
        console.error("Error creating department:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function updateDepartment(id: string, name: string, slug?: string): Promise<{ success: boolean; message: string; }> {
    try {
        if (!id || !name) {
            return { success: false, message: "ID and name are required." };
        }
        
        const finalSlug = slug ? createSlug(slug) : createSlug(name);
        const departmentDocRef = doc(db, 'departments', id);

        // Check if the new slug is unique (and not the current document's slug)
        const departmentsRef = collection(db, "departments");
        const q = query(departmentsRef, where('slug', '==', finalSlug));
        const querySnapshot = await getDocs(q);
        const conflictingDoc = querySnapshot.docs.find(d => d.id !== id);

        if (conflictingDoc) {
             return { success: false, message: 'Slug already exists. Please use a unique slug.' };
        }
        
        await updateDoc(departmentDocRef, {
            name,
            slug: finalSlug,
            updatedAt: serverTimestamp()
        });

        return { success: true, message: 'Department updated successfully!' };
    } catch (error) {
        console.error("Error updating department:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}

export async function deleteDepartment(id: string): Promise<void> {
    try {
        const departmentDocRef = doc(db, 'departments', id);
        await deleteDoc(departmentDocRef);
    } catch (e) {
        console.error("Error deleting department: ", e);
        throw new Error("Could not delete department");
    }
}
