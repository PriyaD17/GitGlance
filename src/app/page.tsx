"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserProfileCard, UserProfile } from "@/components/user-profile-card";
import { RepoCard, Repo } from "@/components/repo-card";
import { ProfileSkeleton } from "@/components/profile-skeleton";
import { RepoSkeleton } from "@/components/repo-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (e: FormEvent) => {
    e.preventDefault();
    if (!username) return;

    if (!process.env.NEXT_PUBLIC_GITHUB_API_TOKEN) {
      setError("GitHub API token is missing.");
      return;
    }

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
          },
        }),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, {
          headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_API_TOKEN}`,
          },
        }),
      ]);

      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 ? "User not found" : "Failed to fetch user data");
      }

      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories data");
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-16 md:p-8 lg:p-12">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <SiGithub className="w-10 h-10" />
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            GitHub Profile Viewer
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Enter a GitHub username to see their profile and latest repositories.
        </p>
      </div>

      <form
        onSubmit={fetchGitHubData}
        className="flex w-full max-w-md mx-auto items-center space-x-2 mb-8"
      >
        <Input
          type="text"
          placeholder="e.g., torvalds"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          aria-label="GitHub username"
        />
        <Button type="submit" disabled={loading || !username} aria-label="Search GitHub profile">
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive" className="max-w-md mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        <div className="lg:col-span-1">
          {loading && <ProfileSkeleton />}
          {user && <UserProfileCard user={user} />}
        </div>
        <div className="lg:col-span-2">
          {repos.length > 0 && !loading && (
            <h2 className="text-2xl font-bold mb-4">Latest Repositories</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading && Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)}
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
            {user && repos.length === 0 && !loading && (
              <div className="md:col-span-2 text-center text-muted-foreground mt-8">
                This user has no public repositories.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}