"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session, status, update } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");

  if (status === "loading") {
    return (
      <div className="space-y-4">
        <div className="animate-pulse h-8 w-1/4 bg-muted rounded-md mb-8" />
        <div className="animate-pulse h-64 w-full max-w-md bg-muted rounded-lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">You are not signed in</h1>
        <p className="text-muted-foreground mb-4">Please sign in to access settings</p>
        <Button asChild>
          <a href="/auth/signin">Sign In</a>
        </Button>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would update the user in DynamoDB in a real app
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the session
      await update({ name });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <form onSubmit={handleUpdateProfile}>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium mb-1 block">
                  Display Name
                </label>
                <Input
                  id="name"
                  placeholder={user.name || "Enter your name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium mb-1 block">
                  Email Address
                </label>
                <Input
                  id="email"
                  value={user.email || ""}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading || !name}>
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
