import SiteFooter from "@/components/sections/GlobalSections/SiteFooter";
import SiteFooter2 from "@/components/sections/GlobalSections/SiteFooter2";
import SiteFooter3 from "@/components/sections/GlobalSections/SiteFooter3";
import SiteHeader from "@/components/sections/GlobalSections/SiteHeader";
import { SidebarNav } from "@/components/sidebar-nav";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
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
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen bg-black bg-cover bg-space">
        <div className="flex flex-col flex-1 p-10 m-5 space-y-6 bg-white dark:bg-black rounded-2xl">
          <div className="space-y-0.5">
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
                <g stroke="currentColor" stroke-width="1" fill="none">
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
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col flex-1 space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="flex flex-row -mx-4 lg:flex-col lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
              <div className="ml-2 lg:mt-1 lg:ml-0">
                <Button variant={"ghost"}>Logout</Button>
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
