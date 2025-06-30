'use server';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { format, subMonths, startOfMonth, parse } from 'date-fns';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

const MOCK_STATS = {
    totalViews: '12,5K',
    totalUsers: '+342', 
};

const MOCK_CHART_DATA = [
    { month: 'January', views: 186 },
    { month: 'February', views: 305 },
    { month: 'March', views: 237 },
    { month: 'April', views: 273 },
    { month: 'May', views: 209 },
    { month: 'June', views: 214 },
];

function areCredentialsSet() {
    return propertyId && process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;
}

export async function getStats() {
  if (!areCredentialsSet()) {
    console.warn("Google Analytics environment variables not set. Returning mock data.");
    return MOCK_STATS;
  }

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '28daysAgo',
          endDate: 'today',
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

export async function getViewsByMonth() {
    if (!areCredentialsSet()) {
        console.warn("Google Analytics environment variables not set. Returning mock chart data.");
        return Array.from({ length: 6 }).map((_, i) => {
            const date = subMonths(new Date(), 5 - i);
            return { month: format(date, 'MMMM'), views: MOCK_CHART_DATA[i]?.views || Math.floor(Math.random() * 200) + 100 };
        });
    }
    
    try {
        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [{
                startDate: format(startOfMonth(subMonths(new Date(), 5)), 'yyyy-MM-dd'),
                endDate: 'today'
            }],
            dimensions: [{ name: 'month' }],
            metrics: [{ name: 'screenPageViews' }],
            orderBys: [{
                dimension: { orderType: 'NUMERIC', dimensionName: 'month' },
            }]
        });

        const monthViews = new Map<string, number>();
        for (let i = 5; i >= 0; i--) {
            const monthName = format(subMonths(new Date(), i), 'MMMM');
            monthViews.set(monthName, 0);
        }

        response.rows?.forEach(row => {
            const monthNumber = row.dimensionValues?.[0]?.value;
            if (monthNumber) {
                const monthName = format(parse(monthNumber, 'M', new Date()), 'MMMM');
                const views = Number(row.metricValues?.[0]?.value ?? '0');
                if (monthViews.has(monthName)) {
                    monthViews.set(monthName, views);
                }
            }
        });

        return Array.from(monthViews.entries()).map(([month, views]) => ({ month, views }));

    } catch (error) {
        console.error('Error fetching Google Analytics chart data:', error);
        return Array.from({ length: 6 }).map((_, i) => {
            const date = subMonths(new Date(), 5 - i);
            return { month: format(date, 'MMMM'), views: 0 };
        });
    }
}
