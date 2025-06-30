import { getCategories, getPosts, getSocialLinks, getTags } from "@/lib/posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Folder, Rss, Tag, FileText } from "lucide-react";

export default async function AdminDashboardPage() {
    const posts = await getPosts();
    const categories = await getCategories();
    const tags = await getTags();
    const socialLinks = await getSocialLinks();

    const stats = [
        { name: "Total Posts", value: posts.length, icon: FileText },
        { name: "Total Categories", value: categories.length, icon: Folder },
        { name: "Total Tags", value: tags.length, icon: Tag },
        { name: "Social Links", value: socialLinks.length, icon: Rss },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
