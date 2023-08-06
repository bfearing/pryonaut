import Loading from "@/components/loading";
import { ModeToggle } from "@/components/mode-toggle";
import SiteFooter from "@/components/sections/GlobalSections/SiteFooter";
import SiteFooter2 from "@/components/sections/GlobalSections/SiteFooter2";
import SiteFooter3 from "@/components/sections/GlobalSections/SiteFooter3";
import SiteHeader from "@/components/sections/GlobalSections/SiteHeader";
import { SidebarNav } from "@/components/sidebar-nav";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import useUser from "@/data/use-user";
import { logout } from "@/lib/auth";
import { ThemeProvider } from "next-themes";
import Router from "next/router";
import { useEffect } from "react";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Astronauts",
    href: "/astronauts",
  },
  {
    title: "ISS Location",
    href: "/iss-location",
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user, loading, loggedOut, mutate } = useUser();

  // if logged out, redirect to the homepage
  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return <Loading text="redirecting..." />;
  if (loading) return <Loading text="loading..." />;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-black bg-cover bg-space">
        <div className="flex flex-col flex-1 p-5 m-5 space-y-6 bg-white sm:p-10 dark:bg-black rounded-2xl">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center text-2xl font-bold">
              <svg
                width="100%"
                height="100%"
                viewBox="-10.5 -9.45 21 18.9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex w-6 h-6 mr-2 animate-[spin_3s_linear_infinite]"
              >
                <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <ellipse rx="10" ry="4.5"></ellipse>
                  <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                  <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                </g>
              </svg>
              <h2 className="tracking-tight">Pryonaut</h2>
            </div>
            {/* <p className="text-muted-foreground">
              Trusted data for all of your astro-knowledge needs.
            </p> */}
            <div className="flex flex-row items-center gap-4">
              <ModeToggle />
              <Avatar className="w-6 h-6">
                <AvatarImage src={user?.avatar} alt={user!.name} />
                <AvatarFallback>{user?.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="flex flex-row -mx-4 lg:flex-col lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
              <div className="ml-2 lg:mt-1 lg:ml-0">
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    logout();
                    mutate(undefined); // optimistically update the data and revalidate
                    Router.replace("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            </aside>
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  );
};

export default AppLayout;
