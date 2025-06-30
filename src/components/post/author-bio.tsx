import type { Post } from "@/lib/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AuthorBioProps = {
  author: Post['author'];
};

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div className="flex items-start gap-6 rounded-lg bg-secondary/50 p-6">
      <Avatar className="h-16 w-16">
        <AvatarImage src={author.imageUrl} alt={author.name} data-ai-hint="person" />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h3 className="font-semibold text-lg">About the Author</h3>
        <p className="font-bold text-primary">{author.name}</p>
        <p className="text-muted-foreground text-sm">{author.bio}</p>
      </div>
    </div>
  );
}
