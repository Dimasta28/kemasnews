
'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from './ui/skeleton';

// Dynamically import ReactQuill to ensure it's only loaded on the client side.
// The `loading` option provides a fallback while the component is being loaded.
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Skeleton className="h-[300px] w-full rounded-md" />,
});

// We must pass the props through, but dynamic components make this tricky.
// Using `any` is a practical way to handle this without complex type gymnastics.
const QuillEditor = (props: any) => {
  return (
    <div className="grid gap-3 [&_.ql-container]:min-h-[300px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input">
      <ReactQuill {...props} />
    </div>
  );
};

export default QuillEditor;
