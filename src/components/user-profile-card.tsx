import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Link as LinkIcon} from "lucide-react";
import Link from "next/link";

export type UserProfile = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

interface UserProfileCardProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 border-2 border-primary">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold mt-4">{user.name}</CardTitle>
        <p className="text-muted-foreground">@{user.login}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {user.bio && <p className="text-center text-muted-foreground">{user.bio}</p>}
        
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          {user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          )}
          <Link href={user.html_url} target="_blank" className="flex items-center gap-1 hover:text-primary transition-colors">
            <LinkIcon className="h-4 w-4" />
            <span>GitHub Profile</span>
          </Link>
        </div>
        
        <div className="flex justify-around pt-4 border-t">
          <div className="text-center">
            <p className="text-xl font-bold">{user.public_repos}</p>
            <p className="text-xs text-muted-foreground">REPOSITORIES</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{user.followers}</p>
            <p className="text-xs text-muted-foreground">FOLLOWERS</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{user.following}</p>
            <p className="text-xs text-muted-foreground">FOLLOWING</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}