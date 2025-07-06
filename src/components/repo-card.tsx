import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Star, Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
};

interface RepoCardProps {
  repo: Repo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">
            <Link href={repo.html_url} target="_blank" className="hover:underline">
              {repo.name}
            </Link>
          </CardTitle>
          {repo.language && <Badge variant="outline">{repo.language}</Badge>}
        </div>
      </CardHeader>
      
    
      <CardContent className="flex-grow">
        <CardDescription className={cn(
          "text-sm",
    
          "line-clamp-3", 

          !repo.description && "italic text-muted-foreground/80"
        )}>
          {repo.description || "No description provided."}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex gap-4 text-sm text-muted-foreground pt-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-4 w-4" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{repo.watchers_count.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}