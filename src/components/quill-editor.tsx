'use client';

import React from 'react';
import 'react-quill/dist/quill.snow.css';
import { Skeleton } from './ui/skeleton';
import dynamic from 'next/dynamic';

const QuillEditor = (props: any) => {
  // By using useMemo, we ensure the dynamically imported component
  // is not re-created on every render. This provides a more stable way
  // to handle client-side-only libraries that have initialization issues.
  const ReactQuill = React.useMemo(
    () =>
      dynamic(() => import('react-quill'), {
        ssr: false,
        loading: () => <Skeleton className="h-[300px] w-full rounded-md" />,
      }),
    []
  );

  return (
    <div className="grid gap-3 [&_.ql-container]:min-h-[300px] [&_.ql-container]:rounded-b-md [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-input [&_.ql-container]:border-input">
      <ReactQuill {...props} />
    </div>
  );
};

export default QuillEditor;
