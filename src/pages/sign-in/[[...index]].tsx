import Loading from "@/components/elements/loading";
import Logo from "@/components/elements/logo";
import AuthLayout from "@/layouts/AuthLayout";
import { SignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export const metadata = {
  title: "",
  description: "",
  ogImage: "",
};

export default function AuthenticationPage() {
  const { isLoaded, isSignedIn, user } = useUser();

  // if (!isLoaded) return <Loading text="loading..." />;

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
          {isLoaded ? <SignIn /> : <Loading text="loading..." />}
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
