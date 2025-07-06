import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitFork, Star, Eye } from "lucide-react";
import Link from "next/link";

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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg">
            <Link href={repo.html_url} target="_blank" className="hover:underline">
                {repo.name}
            </Link>
            </CardTitle>
            {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
        </div>
        <CardDescription className="pt-2">{repo.description || "No description provided."}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{repo.watchers_count}</span>
        </div>
      </CardContent>
    </Card>
  );
}