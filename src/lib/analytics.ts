'use server';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import {
  format,
  subMonths,
  startOfMonth,
  parse,
  subDays,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

export type DateRange = '7days' | '28days' | '90days' | '365days';
export type ChartData = { period: string; views: number }[];

const MOCK_STATS = {
    totalViews: '12,5K',
    totalUsers: '+342',
};

const MOCK_CHART_DATA: ChartData = [
    { period: 'Jan', views: 1860 },
    { period: 'Feb', views: 3050 },
    { period: 'Mar', views: 2370 },
    { period: 'Apr', views: 2730 },
    { period: 'May', views: 2090 },
    { period: 'Jun', views: 2140 },
    { period: 'Jul', views: 2500 },
    { period: 'Aug', views: 3100 },
    { period: 'Sep', views: 2800 },
    { period: 'Oct', views: 3200 },
    { period: 'Nov', views: 3500 },
    { period: 'Dec', views: 4000 },
];


function areCredentialsSet() {
    return propertyId && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;
}

function getDateRange(range: DateRange) {
    const endDate = new Date();
    switch (range) {
        case '7days':
            return { startDate: subDays(endDate, 6), endDate };
        case '28days':
            return { startDate: subDays(endDate, 27), endDate };
        case '90days':
            return { startDate: subDays(endDate, 89), endDate };
        case '365days':
            return { startDate: subDays(endDate, 364), endDate };
    }
}


export async function getStats(range: DateRange = '28days') {
  if (!areCredentialsSet()) {
    console.warn("Google Analytics environment variables not set. Returning mock data.");
    return MOCK_STATS;
  }

  try {
    const { startDate, endDate } = getDateRange(range);
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
        },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' },
      ],
    });

    const totalViews = response.rows?.[0]?.metricValues?.[0]?.value ?? '0';
    const totalUsers = response.rows?.[0]?.metricValues?.[1]?.value ?? '0';

    return {
      totalViews: Number(totalViews).toLocaleString(),
      totalUsers: `+${Number(totalUsers).toLocaleString()}`,
    };
  } catch (error) {
    console.error('Error fetching Google Analytics stats:', error);
    return { totalViews: 'N/A', totalUsers: 'N/A' };
  }
}

export async function getChartData(range: DateRange = '28days'): Promise<ChartData> {
    if (!areCredentialsSet()) {
        console.warn("Google Analytics environment variables not set. Returning mock chart data.");
        const days = parseInt(range.replace('days', ''));
        return Array.from({ length: days }).map((_, i) => {
            const date = subDays(new Date(), days - 1 - i);
            return { period: format(date, 'MMM d'), views: Math.floor(Math.random() * 200) + 100 };
        });
    }
    
    try {
        const { startDate, endDate } = getDateRange(range);
        const isYearly = range === '365days';
        
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{
                startDate: format(startDate, 'yyyy-MM-dd'),
                endDate: format(endDate, 'yyyy-MM-dd')
            }],
            dimensions: [{ name: isYearly ? 'month' : 'date' }],
            metrics: [{ name: 'screenPageViews' }],
            orderBys: [{
                dimension: { orderType: 'ALPHANUMERIC', dimensionName: isYearly ? 'month' : 'date' },
            }]
        });
        
        if (!response.rows) return [];

        return response.rows.map(row => {
            const dimensionValue = row.dimensionValues?.[0]?.value ?? '';
            let period = dimensionValue;
            if (isYearly) {
                // '1' -> 'Jan'
                period = format(parse(dimensionValue, 'M', new Date()), 'MMM');
            } else {
                // '20240726' -> 'Jul 26'
                period = format(parse(dimensionValue, 'yyyyMMdd', new Date()), 'MMM d');
            }
            const views = Number(row.metricValues?.[0]?.value ?? '0');
            return { period, views };
        });

    } catch (error) {
        console.error('Error fetching Google Analytics chart data:', error);
         return Array.from({ length: 12 }).map((_, i) => {
            const date = subMonths(new Date(), 11 - i);
            return { period: format(date, 'MMM'), views: 0 };
        });
    }
}
