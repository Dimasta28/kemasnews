'use client';

import { Eye, FileText, MessageSquare, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

interface AnalyticsDashboardProps {
  stats: {
    totalViews: string;
    totalUsers: string;
  };
  chartData: {
    month: string;
    views: number;
  }[];
}

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function AnalyticsDashboard({
  stats,
  chartData,
}: AnalyticsDashboardProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Overview</CardTitle>
          <CardDescription>
            A summary of your blog&apos;s performance.
          </CardDescription>
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
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
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
              <div className="mt-1 text-2xl font-bold">73</div>
              <p className="text-xs text-muted-foreground">
                +5 since last month
              </p>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Comments</span>
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                +12 since last month
              </p>
            </div>
            <Separator />
            <div>
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                <span>Total Views (GA)</span>
                <Eye className="h-4 w-4" />
              </div>
              <div className="mt-1 text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                in the last 28 days
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
                in the last 28 days
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
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">
                    Getting Started with Next.js
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    A comprehensive guide for beginners.
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">John Doe</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Published
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-10-23
                </TableCell>
                <TableCell className="text-right">1,200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">
                    Tailwind CSS Best Practices
                  </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    Tips and tricks for clean and scalable CSS.
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  Jane Smith
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    Draft
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-10-24
                </TableCell>
                <TableCell className="text-right">530</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Mastering React Hooks</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    Deep dive into useState, useEffect, and more.
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  John Doe
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Published
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-09-15
                </TableCell>
                <TableCell className="text-right">2,500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
