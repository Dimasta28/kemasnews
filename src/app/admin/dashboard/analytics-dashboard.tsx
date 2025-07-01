
'use client';

import { Eye, FileText, MessageSquare, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { DateRange, ChartData } from '@/lib/analytics';
import type { Post } from '@/services/postService';
import { cn } from '@/lib/utils';

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

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const rangeOptions: { value: DateRange; label:string }[] = [
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
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Dashboard Overview</CardTitle>
            <CardDescription>
              A summary of your blog&apos;s performance.
            </CardDescription>
          </div>
          <ToggleGroup type="single" value={range} variant="outline" size="sm">
            {rangeOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                asChild
                className={cn(
                  range === option.value && 'bg-primary text-primary-foreground'
                )}
              >
                <Link href={pathname + '?' + createQueryString('range', option.value)}>
                  {option.label}
                </Link>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </CardHeader>

        <CardContent className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartContainer
              config={chartConfig}
              className="min-h-[250px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="views" fill="var(--color-views)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
          <div className="flex flex-col justify-around space-y-4 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Posts</span>
                <FileText className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">{postsCount}</div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Comments</span>
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">{commentsCount}</div>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Views (GA)</span>
                <Eye className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                {rangeDescription}
              </p>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Users (GA)</span>
                <Users className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {rangeDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
          <CardDescription>
            Here are the most recent posts from your blog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Author</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Link href={`/admin/posts/edit/${post.id}`} className="font-medium hover:underline">
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{post.author}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant={post.status === 'Published' ? 'secondary' : 'outline'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {post.date}
                  </TableCell>
                </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No recent posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
