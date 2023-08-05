import SiteFooter from "@/components/sections/GlobalSections/SiteFooter";
import SiteFooter2 from "@/components/sections/GlobalSections/SiteFooter2";
import SiteFooter3 from "@/components/sections/GlobalSections/SiteFooter3";
import SiteHeader from "@/components/sections/GlobalSections/SiteHeader";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const AuthLayout = ({ children }: any) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        {children}
      </main>
      <TailwindIndicator />
    </ThemeProvider>
  );
};

export default AuthLayout;
