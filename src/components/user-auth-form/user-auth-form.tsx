"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setIsLoading(true);

    const signInResult = await signIn("credentials", {
      username: "kyhung1",
      password: "kyhung1",
      redirect: false,
      callbackUrl: searchParams?.get("callbackUrl") || "/",
    });

    console.log("signInResult", signInResult);
    // setIsLoading(false);

    // if (!signInResult?.ok || signInResult?.error) {
    //   return toast({
    //     title: signInResult?.error ?? "Something went wrong.",
    //     description: "Your sign in request failed. Please try again.",
    //     variant: "destructive",
    //   });
    // }

    // toast({
    //   title: "Login Success",
    // });

    // if (signInResult?.url) {
    //   router.push(signInResult.url);
    // }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              placeholder="password"
              disabled={isLoading || isGoogleLoading}
            />
          </div>
          <Button variant="default" disabled={isLoading}>
            Sign In
          </Button>
        </div>
      </form> */}
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", {
            redirect: true,
            callbackUrl: searchParams?.get("callbackUrl") || "/",
          });
        }}
        disabled={isLoading || isGoogleLoading}
      ></button>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGoogleLoading(true);
          signIn("google", {
            redirect: true,
            callbackUrl: searchParams?.get("callbackUrl") || "/",
          });
        }}
        disabled={isLoading || isGoogleLoading}
      ></button> */}
    </div>
  );
}
