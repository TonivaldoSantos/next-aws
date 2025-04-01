"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse h-8 w-1/3 bg-muted rounded-md mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-40 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
        <p className="text-muted-foreground mb-4">Please sign in to view your dashboard</p>
        <Button asChild>
          <a href="/auth/signin">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Welcome</CardTitle>
            <CardDescription>Hello, {user.name || "User"}!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is your personal dashboard.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Authentication</CardTitle>
            <CardDescription>Your login details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-medium capitalize">{user.provider || "Unknown"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{user.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">DynamoDB</CardTitle>
            <CardDescription>Your data is stored in DynamoDB</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">Your user data is safely stored in Amazon DynamoDB.</p>
            <p className="text-xs font-mono truncate">ID: {user.id}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
