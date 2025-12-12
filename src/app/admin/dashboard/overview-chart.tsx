
'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import type { ChartData } from '@/lib/analytics';

const chartConfig = {
  views: {
    label: 'Views',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

interface OverviewChartProps {
    chartData: ChartData;
}

export function OverviewChart({ chartData }: OverviewChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Page Views Overview</CardTitle>
                <CardDescription>Total page views over the selected period.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            fontSize={12}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar dataKey="views" fill="var(--color-views)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
