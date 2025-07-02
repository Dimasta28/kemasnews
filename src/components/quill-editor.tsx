'use client';

import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from './ui/skeleton';
import dynamic from 'next/dynamic';

// Use next/dynamic to load ReactQuill only on the client side.
// ssr: false is crucial to prevent the findDOMNode error during server rendering.
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  // Provide a loading component to avoid layout shift.
  loading: () => <Skeleton className="h-[300px] w-full rounded-md" />,
});

const QuillEditor = (props: any) => {
  // The ReactQuill component will only be rendered on the client after it has loaded.
  return (
    <div className="grid gap-3 [&_.ql-container]:min-h-[300px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input">
      <ReactQuill {...props} />
    </div>
  );
};

export default QuillEditor;
