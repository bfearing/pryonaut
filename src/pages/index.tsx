import Logo from "@/components/elements/logo";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Router from "next/router";
import { TypeAnimation } from "react-type-animation";

export const metadata = {
  title: "",
  description: "",
  ogImage: "",
};

export default function AuthenticationPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (isSignedIn) {
    Router.replace("/profile");
  }

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
      <div className="m-2.5 p-10 bg-background rounded-2xl">
        <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6">
          <h3 className="text-3xl font-semibold">Get Started</h3>
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            <Link href="/sign-in" className="flex flex-1 flex-col">
              <Button size="lg">Sign In</Button>
            </Link>
            <Link href="/sign-up" className="flex flex-1 flex-col">
              <Button size="lg" variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
          <p className="px-8 text-sm text-center text-muted-foreground w-[360px]">
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
