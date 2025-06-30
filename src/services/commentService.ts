
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, Timestamp, orderBy } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';


export interface Comment {
    id: string;
    postId: string;
    author: string;
    authorEmail: string;
    authorCompany: string;
    comment: string;
    status: 'Pending' | 'Approved' | 'Spam';
    avatar: string;
    date: string;
}

interface CommentFormState {
    postId: string;
    comment: string;
    name: string;
    email: string;
    company: string;
}

export async function submitComment(data: CommentFormState) {
    const { postId, comment, name, email, company } = data;

    if (!postId || !comment || !name || !email) {
        return { success: false, message: 'Please fill out all required fields.' };
    }

    try {
        // Check if member already exists
        const membersRef = collection(db, "members");
        const q = query(membersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        // If member doesn't exist, create one
        if (querySnapshot.empty) {
            await addDoc(membersRef, {
                name,
                email,
                company,
                avatar: `https://placehold.co/100x100.png`,
                status: 'Active',
                createdAt: serverTimestamp(),
            });
        }

        // Add the comment
        const commentsRef = collection(db, "comments");
        await addDoc(commentsRef, {
            postId,
            author: name,
            authorEmail: email,
            authorCompany: company,
            comment,
            status: 'Pending',
            avatar: `https://placehold.co/100x100.png`,
            date: serverTimestamp(),
        });
        
        return { success: true, message: 'Comment submitted successfully! It will appear after moderation.' };

    } catch (error) {
        console.error("Error submitting comment: ", error);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
}


export async function getComments(postId: string): Promise<Comment[]> {
    try {
        const commentsRef = collection(db, "comments");
        // This query was simplified to avoid the need for a composite index.
        // We will filter for 'Approved' status after fetching.
        const q = query(
            commentsRef, 
            where("postId", "==", postId),
            orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);

        const comments = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.date as Timestamp)?.toDate() || new Date();
            return {
                id: doc.id,
                postId: data.postId,
                author: data.author,
                authorEmail: data.authorEmail,
                authorCompany: data.authorCompany,
                comment: data.comment,
                status: data.status,
                avatar: data.avatar,
                date: `${formatDistanceToNow(date)} ago`,
            } as Comment;
        }).filter(comment => comment.status === 'Approved');

        return comments;
    } catch (error) {
        console.error("Error fetching comments: ", error);
        return [];
    }
}
