
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, serverTimestamp, Timestamp, doc, updateDoc, deleteDoc, getDoc, orderBy } from "firebase/firestore";
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
    postTitle?: string;
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
        // We will filter and sort after fetching.
        const q = query(
            commentsRef, 
            where("postId", "==", postId)
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
                dateObj: date, // Temporary field for sorting
                date: `${formatDistanceToNow(date)} ago`,
            };
        })
        .filter(comment => comment.status === 'Approved')
        // Sort by date descending (newest first)
        .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
        // Remove temporary field and cast to Comment
        .map(({ dateObj, ...rest }) => rest as Comment); 

        return comments;
    } catch (error) {
        console.error("Error fetching comments: ", error);
        return [];
    }
}

export async function getAllComments(): Promise<Comment[]> {
    try {
        const commentsRef = collection(db, "comments");
        const q = query(commentsRef, orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        const commentsData = querySnapshot.docs.map(doc => {
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
                date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            } as Comment;
        });

        const postTitleCache: { [key: string]: string } = {};

        // Fetch post titles for all unique post IDs
        const postIds = [...new Set(commentsData.map(c => c.postId))];
        for (const postId of postIds) {
            if (!postTitleCache[postId]) {
                const postRef = doc(db, 'posts', postId);
                const postSnap = await getDoc(postRef);
                postTitleCache[postId] = postSnap.exists() ? postSnap.data().title : 'Unknown Post';
            }
        }
        
        // Add post titles to comments
        const commentsWithTitles = commentsData.map(comment => ({
            ...comment,
            postTitle: postTitleCache[comment.postId] || 'Unknown Post'
        }));

        return commentsWithTitles;
    } catch (error) {
        console.error("Error fetching all comments: ", error);
        // The query might fail if the index doesn't exist. Return empty for now.
        return [];
    }
}

export async function updateCommentStatus(commentId: string, status: 'Approved' | 'Pending' | 'Spam'): Promise<void> {
    try {
        const commentRef = doc(db, 'comments', commentId);
        await updateDoc(commentRef, { status });
    } catch (e) {
        console.error("Error updating comment status: ", e);
        throw new Error("Could not update comment status");
    }
}

export async function deleteComment(commentId: string): Promise<void> {
    try {
        const commentRef = doc(db, 'comments', commentId);
        await deleteDoc(commentRef);
    } catch (e) {
        console.error("Error deleting comment: ", e);
        throw new Error("Could not delete comment");
    }
}
