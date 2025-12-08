
import { MetadataRoute } from 'next';
import { getPosts } from '@/services/postService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kemaspkg.com'; // Replace with your actual domain

  // Get all published posts
  const posts = await getPosts();
  const postUrls = posts
    .filter(post => post.status === 'Published')
    .map(post => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    
  // Define static pages
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/green-journey`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
     {
      url: `${baseUrl}/green-plan`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  return [...staticUrls, ...postUrls];
}
