"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    google: false,
    github: false,
  });

  const handleSignIn = async (provider: string) => {
    setIsLoading((prev) => ({ ...prev, [provider]: true }));

    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleSignIn("google")}
            disabled={isLoading.google}
          >
            <FaGoogle className="h-4 w-4" />
            {isLoading.google ? "Signing in..." : "Sign in with Google"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleSignIn("github")}
            disabled={isLoading.github}
          >
            <FaGithub className="h-4 w-4" />
            {isLoading.github ? "Signing in..." : "Sign in with GitHub"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </CardFooter>
      </Card>
    </div>
  );
}
