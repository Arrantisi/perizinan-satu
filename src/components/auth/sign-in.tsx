"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignInComponent = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-sm flex justify-center items-center">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step
                  name="start"
                  className="w-full flex justify-center items-center gap-2 flex-col"
                >
                  <Link href={"/"}>
                    <GalleryVerticalEnd />
                  </Link>
                  <h1 className="font-bold text-2xl">Sign in to Booren Inc.</h1>

                  <Clerk.Field
                    name={"identifier"}
                    className="w-full pt-4 flex justify-center gap-2 flex-col pb-3"
                  >
                    <Clerk.Label asChild>
                      <Label>email address</Label>
                    </Clerk.Label>
                    <Clerk.Input type="email" required asChild>
                      <Input />
                    </Clerk.Input>
                    <Clerk.FieldError className="block text-xs text-destructive" />
                  </Clerk.Field>

                  <SignIn.Action submit asChild>
                    <Button disabled={isGlobalLoading} className="w-full">
                      <Clerk.Loading>
                        {(isLoading) => {
                          return isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            "Continue"
                          );
                        }}
                      </Clerk.Loading>
                    </Button>
                  </SignIn.Action>

                  <div className="w-full relative flex items-center py-6">
                    <Separator />
                    <span className="absolute left-1/2 -translate-x-1/2 bg-background px-2 z-10 text-muted-foreground">
                      Or
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pb-3">
                    <Button variant={"outline"}>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                          fill="currentColor"
                        />
                      </svg>
                      Continue with Apple
                    </Button>
                    <Button variant={"outline"}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      Continue with Google
                    </Button>
                  </div>
                  <CardDescription className="text-balance text-center text-xs [&_span]:underline [&_span]:underline-offset-4 [&_span]:hover:text-primary">
                    By clicking continue, you agree to our{" "}
                    <span>Terms of Service</span> and{" "}
                    <span>Privacy Policy</span>.
                  </CardDescription>
                </SignIn.Step>

                <SignIn.Step name="choose-strategy">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Use another method</CardTitle>
                      <CardDescription>
                        Facing issues? You can use any of these methods to sign
                        in.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <SignIn.SupportedStrategy name="email_code" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Email code
                        </Button>
                      </SignIn.SupportedStrategy>
                      <SignIn.SupportedStrategy name="password" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Password
                        </Button>
                      </SignIn.SupportedStrategy>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action navigate="previous" asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Loader2 className="size-4 animate-spin" />
                                ) : (
                                  "Go back"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step
                  name="verifications"
                  className="w-full flex flex-col justify-center items-center gap-2"
                >
                  <SignIn.Strategy name="email_code">
                    <div className="flex item-center justify-center flex-col gap-4">
                      <h1 className="font-bold text-2xl text-center">
                        Verify your email
                      </h1>
                      <CardDescription>
                        Use the verification link sent to your email address
                      </CardDescription>
                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="sr-only">
                          Email address
                        </Clerk.Label>
                        <div className="flex justify-center text-center">
                          <Clerk.Input
                            type="otp"
                            className="flex justify-center has-[:disabled]:opacity-50"
                            autoSubmit
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                    {
                                      "z-10 ring-2 ring-ring ring-offset-background":
                                        status === "cursor" ||
                                        status === "selected",
                                    }
                                  )}
                                >
                                  {value}
                                  {status === "cursor" && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                          />
                        </div>
                        <Clerk.FieldError className="block text-center text-xs text-destructive" />
                      </Clerk.Field>
                      <SignIn.Action
                        asChild
                        resend
                        className="text-muted-foreground"
                        fallback={({ resendableAfter }) => (
                          <Button variant="link" size="sm" disabled>
                            Didn&apos;t receive a code? Resend (
                            <span className="tabular-nums">
                              {resendableAfter}
                            </span>
                            )
                          </Button>
                        )}
                      >
                        <Button variant={"link"} type="button" size={"sm"}>
                          Didn&apos;t receive a code? Resend
                        </Button>
                      </SignIn.Action>
                      <SignIn.Action asChild submit>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Loader2 className="animate-spin" size={16} />
                              ) : (
                                "Contiune"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </SignIn.Strategy>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>
    </div>
  );
};
export default SignInComponent;
