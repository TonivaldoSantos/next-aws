"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="animate-pulse h-32 w-32 rounded-full bg-muted mb-4" />
        <div className="animate-pulse h-8 w-40 bg-muted rounded-md mb-2" />
        <div className="animate-pulse h-4 w-60 bg-muted rounded-md" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
        <p className="text-muted-foreground mb-4">Please sign in to view your profile</p>
        <Button asChild>
          <a href="/auth/signin">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center space-y-0 gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="text-xl">
              {user.name ? user.name[0].toUpperCase() : <FaUser />}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name || "User"}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Provider</div>
              <div className="capitalize">{user.provider || "Unknown"}</div>
            </div>

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">User ID</div>
              <div className="font-mono text-xs truncate">{user.id}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
