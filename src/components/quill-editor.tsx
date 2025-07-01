
'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from './ui/skeleton';
import { useState, useEffect } from 'react';

// Dynamically import ReactQuill to ensure it's only loaded on the client side.
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

// We must pass the props through, but dynamic components make this tricky.
// Using `any` is a practical way to handle this without complex type gymnastics.
const QuillEditor = (props: any) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // This effect runs only on the client, after the component mounts.
        // This is a common workaround for libraries that have issues with SSR or React 18's Strict Mode.
        setIsMounted(true);
    }, []);

    return (
        <div className="grid gap-3 [&_.ql-container]:min-h-[300px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input">
            {isMounted ? (
                <ReactQuill {...props} />
            ) : (
                // Show a skeleton loader while the component is mounting on the client.
                <Skeleton className="h-[300px] w-full rounded-md" />
            )}
        </div>
    );
};

export default QuillEditor;
