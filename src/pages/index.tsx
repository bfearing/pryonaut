import Link from "next/link";
import { UserAuthForm } from "@/components/forms/user-auth-form";
import AuthLayout from "@/layouts/AuthLayout";
import useUser from "@/data/use-user";
import { useEffect, useState } from "react";
import Router from "next/router";
import { TypeAnimation } from "react-type-animation";
import Logo from "@/components/elements/logo";

export const metadata = {
  title: "Login | Pryonaut",
  description: "Login to explore space knowledge.",
  ogImage: "",
};

export default function AuthenticationPage() {
  const { user, loggedOut } = useUser();

  // if logged in, redirect to the dashboard
  useEffect(() => {
    if (user && !loggedOut) {
      Router.replace("/profile");
    }
  }, [user, loggedOut]);

  return (
    <AuthLayout meta={metadata}>
      <div className="relative flex-col hidden h-full p-10 text-white bg-muted dark:border-r lg:flex">
        <div className="absolute inset-0 bg-black bg-cover bg-space" />
        <Logo />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <TypeAnimation
              className="text-lg whitespace-pre-line"
              speed={60}
              sequence={[
                '"There are people who make things happen, there are people who watch things happen, and there are people who wonder what happened. ',
                1000,
                '"There are people who make things happen, there are people who watch things happen, and there are people who wonder what happened. To be successful, you need to be a person who makes things happen.."',
                1000,
                `"There are people who make things happen, there are people who watch things happen, and there are people who wonder what happened. To be successful, you need to be a person who makes things happen.."
                \n- Jim Lovell`,
              ]}
            />
          </blockquote>
        </div>
      </div>
      <div className="p-10 lg:p-8 bg-background rounded-2xl">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to Pryonaut
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to sign in. Bonus points if you have a
              Gravatar profile set up. 😉
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-sm text-center text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
