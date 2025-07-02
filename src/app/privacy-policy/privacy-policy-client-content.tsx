
'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export function PrivacyPolicyClientContent({ content }: { content: string }) {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {
        // DOMPurify needs a browser environment, so we run it on the client side.
        if (typeof window !== 'undefined') {
            setSanitizedContent(DOMPurify.sanitize(content));
        }
    }, [content]);

    return (
        <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
}
