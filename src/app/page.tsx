"use client";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/layout/nav-bar";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">NextAuth + DynamoDB Boilerplate</h1>

        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          A complete authentication solution with Google and GitHub OAuth, DynamoDB integration,
          and user profile management.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {isLoading ? (
            <div className="animate-pulse h-10 w-40 bg-muted rounded-md" />
          ) : user ? (
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" onClick={() => signIn()}>
              Sign In
            </Button>
          )}

          <Button asChild variant="outline" size="lg">
            <a href="https://github.com/your-username/nextauth-dynamodb" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>

        {!isLoading && user && (
          <p className="mt-8 text-muted-foreground">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
        )}
      </div>
    </main>
  );
}
