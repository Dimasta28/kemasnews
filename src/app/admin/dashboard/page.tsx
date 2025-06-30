import { getStats, getChartData, DateRange } from '@/lib/analytics';
import { AnalyticsDashboard } from './analytics-dashboard';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { range?: string };
}) {
  const range = (searchParams?.range || '28days') as DateRange;

  const [stats, chartData] = await Promise.all([
    getStats(range),
    getChartData(range),
  ]);

  return (
    <AnalyticsDashboard stats={stats} chartData={chartData} range={range} />
  );
}
