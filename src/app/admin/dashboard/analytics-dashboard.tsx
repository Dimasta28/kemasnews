
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { DateRange, ChartData } from '@/lib/analytics';
import type { Post } from '@/services/postService';
import { cn } from '@/lib/utils';

import { StatCards } from './stat-cards';
import { OverviewChart } from './overview-chart';
import { RecentPosts } from './recent-posts';

interface AnalyticsDashboardProps {
  stats: {
    totalViews: string;
    totalUsers: string;
  };
  chartData: ChartData;
  range: DateRange;
  recentPosts: Post[];
  postsCount: number;
  commentsCount: number;
}

const rangeOptions: { value: DateRange; label: string }[] = [
  { value: '7days', label: '7 Days' },
  { value: '28days', label: '28 Days' },
  { value: '90days', label: '90 Days' },
  { value: '365days', label: '1 Year' },
];

export function AnalyticsDashboard({
  stats,
  chartData,
  range,
  recentPosts,
  postsCount,
  commentsCount,
}: AnalyticsDashboardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const rangeDescription = {
    '7days': 'in the last 7 days',
    '28days': 'in the last 28 days',
    '90days': 'in the last 90 days',
    '365days': 'in the last year',
  }[range];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">An overview of your blog's performance.</p>
        </div>
        <ToggleGroup type="single" value={range} variant="outline" size="sm" className='w-full sm:w-auto'>
          {rangeOptions.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              asChild
              className={cn(
                'w-full sm:w-auto',
                range === option.value && 'bg-primary text-primary-foreground'
              )}
            >
              <Link href={pathname + '?' + createQueryString('range', option.value)}>
                {option.label}
              </Link>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <StatCards 
        stats={stats}
        postsCount={postsCount}
        commentsCount={commentsCount}
        rangeDescription={rangeDescription}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <OverviewChart chartData={chartData} />
        </div>
        <div className="lg:col-span-2">
          <RecentPosts recentPosts={recentPosts} />
        </div>
      </div>
    </div>
  );
}
