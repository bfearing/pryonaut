import Logo from "@/components/elements/logo";
import Metadata from "@/components/elements/metadata";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarNav } from "@/components/navs/sidebar-nav";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

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
  meta: { title: string; description: string; ogImage: string };
  children: React.ReactNode;
}

const AppLayout = ({ meta, children }: AppLayoutProps) => {
  // const { isLoaded, isSignedIn, user } = useUser();

  // if (!isLoaded || !isSignedIn) {
  //   return null;
  // }

  // const { user, loading, loggedOut, mutate } = useUser();

  // if logged out, redirect to the homepage
  // useEffect(() => {
  //   if (loggedOut) {
  //     Router.replace("/");
  //   }
  // }, [loggedOut]);
  // if (loggedOut) return <Loading text="redirecting..." />;
  // if (loading) return <Loading text="loading..." />;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Metadata meta={meta} />
      <div className="flex min-h-screen bg-black bg-cover bg-space">
        <div className="flex flex-col flex-1 p-5 m-2.5 sm:m-5 space-y-6 bg-white sm:p-10 dark:bg-black rounded-2xl w-[calc(100vw-20px)] sm:w-[calc(100vw-40px)]">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex flex-row items-center gap-4">
              <ModeToggle />
              {/* <UserNav /> */}
              <UserButton
                userProfileMode="modal"
                // userProfileUrl="/user"
                afterSignOutUrl="/"
                afterMultiSessionSingleSignOutUrl="/"
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="flex flex-row -mx-4 lg:flex-col lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
              <div className="hidden ml-2 lg:mt-1 lg:ml-0 lg:block">
                {/* <Button
                  variant={"ghost"}
                  onClick={() => {
                    logout();
                    mutate(undefined);
                    Router.replace("/");
                  }}
                >
                  Logout
                </Button> */}
              </div>
            </aside>
            <main className="flex-1">
              <div className="flex-1 lg:max-w-2xl">
                <div className="space-y-6">{children}</div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  );
};

export default AppLayout;
