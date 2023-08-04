import SiteFooter from "@/components/sections/GlobalSections/SiteFooter";
import SiteFooter2 from "@/components/sections/GlobalSections/SiteFooter2";
import SiteFooter3 from "@/components/sections/GlobalSections/SiteFooter3";
import SiteHeader from "@/components/sections/GlobalSections/SiteHeader";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const Layout = ({ children }: any) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="relative flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <TailwindIndicator />
      </ThemeProvider>
      <Toaster />
    </>
  );
};

export default Layout;
