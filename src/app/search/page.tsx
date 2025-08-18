
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, type Post } from '@/services/postService';
import { getFrontendSettings, type FrontendSettings } from '@/services/settingsService';
import { SiteHeaderWrapper } from '@/components/site-header-wrapper';
import { SiteFooter } from '@/components/site-footer';
import { Card, CardContent } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';

function SearchResults({ query }: { query: string }) {
  // This is a placeholder. In a real app, you would fetch and filter data here.
  // For this example, we'll just display the query.
  
  return (
    <div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Search Results</h1>
        <p className="text-xl text-muted-foreground">
            You searched for: <span className="font-semibold text-foreground">{query}</span>
        </p>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || '';
  const [allPosts, settings] = await Promise.all([getPosts(), getFrontendSettings()]);

  const filteredPosts = allPosts.filter(post => 
    post.status === 'Published' && (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
    )
  );

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <SiteHeaderWrapper />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
                {query ? (
                    <p className="text-lg text-muted-foreground">
                        {filteredPosts.length} results for <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
                    </p>
                ) : (
                    <p className="text-lg text-muted-foreground">Please enter a search term to see results.</p>
                )}
            </div>
            
            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden group border-border hover:border-primary transition-all duration-300">
                    <CardContent className="p-0">
                        <Link href={`/post/${post.id}`}>
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                            data-ai-hint="cosmetics packaging"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-1">{post.categories.join(', ')}</p>
                            <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                            {format(parseISO(post.date), "dd LLL yyyy")}
                            </p>
                        </div>
                        </Link>
                    </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                </div>
            )}
        </div>
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
