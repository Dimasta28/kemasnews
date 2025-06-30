import { getStats, getViewsByMonth } from '@/lib/analytics';
import { AnalyticsDashboard } from './analytics-dashboard';

export default async function DashboardPage() {
  const [stats, chartData] = await Promise.all([
    getStats(),
    getViewsByMonth(),
  ]);

  return <AnalyticsDashboard stats={stats} chartData={chartData} />;
}
