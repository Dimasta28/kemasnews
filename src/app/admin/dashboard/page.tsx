
import { getStats, getChartData, DateRange } from '@/lib/analytics';
import { getPosts } from '@/services/postService';
import { AnalyticsDashboard } from './analytics-dashboard';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { range?: string };
}) {
  const range = (searchParams?.range || '28days') as DateRange;

  // Fetch initial data on the server
  const [stats, chartData, allPosts] = await Promise.all([
    getStats(range),
    getChartData(range),
    getPosts(),
  ]);

  const recentPosts = allPosts.slice(0, 5);
  const postsCount = allPosts.length;

  return (
    <AnalyticsDashboard 
      stats={stats} 
      chartData={chartData} 
      range={range}
      recentPosts={recentPosts}
      postsCount={postsCount}
    />
  );
}
