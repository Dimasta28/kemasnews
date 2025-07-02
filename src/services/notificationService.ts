'use server';

import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  query,
  where,
  Timestamp,
  writeBatch,
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

export interface Notification {
  id: string;
  title: string;
  description: string;
  link: string;
  read: boolean;
  createdAt: string;
}

// Get all notifications, newest first
export async function getNotifications(): Promise<Notification[]> {
  const notificationsCollection = collection(db, 'notifications');
  const q = query(notificationsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const notifications: Notification[] = snapshot.docs.map(doc => {
    const data = doc.data();
    const createdAt = (data.createdAt as Timestamp)?.toDate() || new Date();
    return {
      id: doc.id,
      title: data.title || '',
      description: data.description || '',
      link: data.link || '#',
      read: data.read || false,
      createdAt: `${formatDistanceToNow(createdAt)} ago`,
    };
  });
  return notifications;
}

// Create a new notification
export async function createNotification(data: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'notifications'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Update a notification
export async function updateNotification(id: string, data: Partial<Omit<Notification, 'id' | 'createdAt' | 'read'>>): Promise<void> {
  const docRef = doc(db, 'notifications', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// Delete a notification
export async function deleteNotification(id: string): Promise<void> {
  const docRef = doc(db, 'notifications', id);
  await deleteDoc(docRef);
}

// Mark a single notification as read
export async function markNotificationAsRead(id: string): Promise<void> {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, { read: true });
}

// Mark all unread notifications as read
export async function markAllNotificationsAsRead(): Promise<void> {
    const notificationsCollection = collection(db, 'notifications');
    const q = query(notificationsCollection, where('read', '==', false));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
        return;
    }

    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
        batch.update(doc.ref, { read: true });
    });

    await batch.commit();
}
