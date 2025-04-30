"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";

const SignUpComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-sm flex justify-center items-center">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step
                  name="start"
                  className="flex flex-col gap-1 items-center w-full"
                >
                  <GalleryVerticalEnd className="size-6" />
                  <h1 className="font-bold text-2xl">Create your account</h1>
                  <span className="font-light text-sm text-muted-foreground">
                    Sudah punya account?
                    <span className="px-1 text-muted-foreground hover:text-primary text-sm hover:underline hover:underline-offset-4 transition-all">
                      <Clerk.Link navigate="sign-in">Sign in</Clerk.Link>
                    </span>
                  </span>
                  <div className="flex flex-col gap-4 mt-4 w-full">
                    <div className="w-full flex items-center gap-4">
                      <Clerk.Field
                        name={"firstName"}
                        className="w-full flex flex-col gap-2"
                      >
                        <Clerk.Label>
                          <Label>first name</Label>
                        </Clerk.Label>
                        <Clerk.Input required asChild>
                          <Input placeholder="John" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-xs text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field
                        name={"lastName"}
                        className="w-full flex flex-col gap-2"
                      >
                        <Clerk.Label>
                          <Label>last name</Label>
                        </Clerk.Label>
                        <Clerk.Input required asChild>
                          <Input placeholder="Simmons" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-xs text-destructive" />
                      </Clerk.Field>
                    </div>

                    <Clerk.Field
                      name={"emailAddress"}
                      className="flex flex-col gap-2 w-full"
                    >
                      <Clerk.Label>
                        <Label>email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input placeholder="email anda" />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-xs text-destructive" />
                    </Clerk.Field>
                  </div>
                  <SignUp.Captcha className="empty:hidden" />
                  <SignUp.Action submit asChild>
                    <Button disabled={isGlobalLoading} className="w-full mt-4">
                      <Clerk.Loading>
                        {(isLoading) => {
                          return isLoading ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            "Continue"
                          );
                        }}
                      </Clerk.Loading>
                    </Button>
                  </SignUp.Action>
                  <div className="w-full my-6 relative flex justify-center items-center">
                    <Separator orientation="horizontal" />
                    <span className="absolute left-1/2 -translate-x-1/2 bg-background z-10 px-3">
                      Or
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <Button variant={"outline"}>
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
                  <span className="text-balance text-center [&_span]:cursor-pointer text-xs text-muted-foreground pt-4 [&_span]:underline [&_span]:underline-offset-4 [&_span]:hover:text-primary">
                    By clicking continue, you agree to our{" "}
                    <span>Terms of Service</span> and{" "}
                    <span>Privacy Policy</span>.
                  </span>
                </SignUp.Step>

                <SignUp.Step
                  name="verifications"
                  className="w-full flex flex-col justify-center items-center gap-2"
                >
                  <SignUp.Strategy name="email_code">
                    <div className="flex item-center justify-center flex-col gap-4">
                      <CardTitle>Verify your email</CardTitle>
                      <CardDescription>
                        Use the verification link sent to your email address
                      </CardDescription>
                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label>Email address</Clerk.Label>
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
                        <Clerk.FieldError className="block text-xs text-destructive" />
                      </Clerk.Field>
                      <SignUp.Action
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
                      </SignUp.Action>
                      <SignUp.Action asChild submit>
                        <Button type="submit" disabled={isGlobalLoading}>
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
                      </SignUp.Action>
                    </div>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </div>
    </div>
  );
};

export default SignUpComponent;
