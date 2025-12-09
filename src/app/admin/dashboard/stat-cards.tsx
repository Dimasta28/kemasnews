
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, FileText, Users } from "lucide-react";

interface StatCardsProps {
    stats: {
        totalViews: string;
        totalUsers: string;
    };
    postsCount: number;
    rangeDescription: string;
}

export function StatCards({ stats, postsCount, rangeDescription }: StatCardsProps) {
    const cardData = [
        {
            title: "Total Posts",
            value: postsCount.toString(),
            icon: FileText,
            description: "All time",
        },
        {
            title: "Total Views",
            value: stats.totalViews,
            icon: Eye,
            description: rangeDescription,
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            description: rangeDescription,
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cardData.map((card) => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        {card.description && <p className="text-xs text-muted-foreground">{card.description}</p>}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
