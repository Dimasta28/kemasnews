'use client';

import { getFrontendSettings } from '@/services/settingsService';
import { getPosts } from '@/services/postService';
import { SiteHeader } from './site-header';
import { useEffect, useState } from 'react';
import type { FrontendSettings } from '@/services/settingsService';
import type { Post } from '@/services/postService';

export function SiteHeaderWrapper() {
  const [settings, setSettings] = useState<FrontendSettings | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    async function fetchData() {
        const [settingsData, postsData] = await Promise.all([
            getFrontendSettings(),
            getPosts()
        ]);
        setSettings(settingsData);
        const publishedPosts = postsData.filter(p => p.status === 'Published');
        setPosts(publishedPosts);
    }
    fetchData();
  }, []);


  if (!settings) {
    // You can return a skeleton or null while loading
    return null;
  }
  
  return <SiteHeader settings={settings} posts={posts} />;
}
