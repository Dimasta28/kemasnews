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
    authorId: string;
    authorName: string;
    authorEmail: string;
}

export async function submitComment(data: CommentFormState) {
    const { postId, comment, authorId, authorName, authorEmail } = data;

    if (!postId || !comment || !authorId) {
        return { success: false, message: 'Missing required data to submit comment.' };
    }

    try {
        const commentsRef = collection(db, "comments");
        await addDoc(commentsRef, {
            postId,
            author: authorName,
            authorEmail: authorEmail,
            authorId: authorId,
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
                authorCompany: data.authorCompany || '',
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
        // Remove the orderBy clause to avoid needing a Firestore index
        const querySnapshot = await getDocs(commentsRef);

        const commentsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const date = (data.date as Timestamp)?.toDate() || new Date();
            return {
                id: doc.id,
                postId: data.postId,
                author: data.author,
                authorEmail: data.authorEmail,
                authorCompany: data.authorCompany || '',
                comment: data.comment,
                status: data.status,
                avatar: data.avatar,
                dateObj: date, // Temporary field for sorting
                date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
            };
        });

        // Sort by date descending (newest first) in code
        commentsData.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());

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
        
        // Add post titles to comments and remove temporary field
        const commentsWithTitles = commentsData.map(({ dateObj, ...comment }) => ({
            ...comment,
            postTitle: postTitleCache[comment.postId] || 'Unknown Post'
        })) as Comment[];

        return commentsWithTitles;
    } catch (error) {
        console.error("Error fetching all comments: ", error);
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
