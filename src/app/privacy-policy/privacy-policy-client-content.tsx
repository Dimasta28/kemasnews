
'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import Link from 'next/link';

export function PrivacyPolicyClientContent({ content, error }: { content: string, error?: string | null }) {
    const [sanitizedContent, setSanitizedContent] = useState('');

    useEffect(() => {
        // DOMPurify needs a browser environment, so we run it on the client side.
        if (typeof window !== 'undefined' && content) {
            setSanitizedContent(DOMPurify.sanitize(content));
        }
    }, [content]);

    if (error) {
        return (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Could Not Load Content</AlertTitle>
              <AlertDescription>
                <p>There was an error loading the content for this page. This is likely a temporary issue or a problem with database permissions.</p>
                <p className="mt-2 font-mono text-xs bg-muted p-2 rounded">{error}</p>
                <Link href="/" className="text-sm mt-4 inline-block underline">Return to homepage</Link>
              </AlertDescription>
            </Alert>
        )
    }

    if (!content) {
        return <p className="text-muted-foreground">No privacy policy content has been set.</p>;
    }

    return (
        <div
            className="prose dark:prose-invert max-w-none md:prose-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
}
