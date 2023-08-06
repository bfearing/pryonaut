import Metadata from "@/components/elements/metadata";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "next-themes";

interface AuthLayoutProps {
  meta: { title: string; description: string; ogImage: string };
  children: React.ReactNode;
}

const AuthLayout = ({ meta, children }: AuthLayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Metadata meta={meta} />
      <main className="container relative grid flex-col items-center justify-center h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
        {children}
      </main>
      <TailwindIndicator />
    </ThemeProvider>
  );
};

export default AuthLayout;
