
'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from './ui/skeleton';
import type { ComponentProps } from 'react';

// Dynamically import ReactQuill to ensure it's only loaded on the client side.
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full rounded-md" /> 
});

// Create a wrapper component for ReactQuill to encapsulate its styles
// and ensure consistent loading behavior.
const QuillEditor = (props: ComponentProps<typeof ReactQuill>) => {
    return (
        <div className="grid gap-3 [&_.ql-container]:min-h-[300px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input">
            <ReactQuill {...props} />
        </div>
    );
};

export default QuillEditor;
