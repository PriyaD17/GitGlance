"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserProfileCard, UserProfile } from "@/components/user-profile-card";
import { RepoCard, Repo } from "@/components/repo-card";
import { ProfileSkeleton } from "@/components/profile-skeleton";
import { RepoSkeleton } from "@/components/repo-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Github, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (e: FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`),
      ]);

      if (!userResponse.ok) {
        throw new Error(userResponse.status === 404 ? "User not found" : "Failed to fetch user data");
      }

      const userData = await userResponse.json();
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      setError(err.message);
      setUser(null);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-4">
      <motion.div
        layout
        transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
        className={cn(
          "w-full max-w-5xl flex flex-col items-center transition-all duration-300",
          user || loading ? "justify-start pt-8" : "justify-center min-h-[calc(100vh-8rem)]"
        )}
      >
        <div className="text-center w-full max-w-md">
          <motion.div
            className="flex justify-center items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Github className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-slate-500 to-primary bg-clip-text text-transparent animate-text-gradient bg-[200%_auto]">
              Git-Glance
            </h1>
          </motion.div>

          <motion.p
            className="text-muted-foreground mt-3 text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Instantly view any GitHub profile and their latest repositories.
          </motion.p>

          <motion.form
            onSubmit={fetchGitHubData}
            className="flex w-full items-center space-x-2 mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              type="text"
              placeholder="Enter a GitHub username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              className="h-12 text-base"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" disabled={loading || !username} className="h-12 px-5">
                {loading ? "..." : <Search className="h-5 w-5" />}
              </Button>
            </motion.div>
          </motion.form>
        </div>

        <AnimatePresence>
          {(loading || user || error) && (
            <motion.div
              className="w-full mt-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {error && (
                <Alert variant="destructive" className="max-w-md mx-auto">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                <div className="lg:col-span-1 flex justify-center lg:justify-end">
                  {loading && <ProfileSkeleton />}
                  {user && <UserProfileCard user={user} />}
                </div>
                <div className="lg:col-span-2">
                  {(repos.length > 0 || loading) && (
                    <h2 className="text-2xl font-bold mb-4">Latest Repositories</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {loading && Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)}
                    {repos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                    {user && repos.length === 0 && !loading && (
                      <div className="md:col-span-2 text-center text-muted-foreground mt-8 bg-card p-6 rounded-lg">
                        This user doesn't have any public repositories yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}