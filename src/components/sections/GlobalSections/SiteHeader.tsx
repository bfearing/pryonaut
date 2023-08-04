import TeamSwitcher from "@/components/team-switcher";
import { UserNav } from "@/components/user-nav";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
import { Button, buttonVariants } from "@/components/ui/button";
import { SunIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ShoppingBagIcon } from "lucide-react";

const SiteHeader = () => {
  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        {/* <TeamSwitcher /> */}
        <Link href="/">
          <p className="text-3xl font-bold leading-none tracking-tight">
            StellarPull
          </p>
        </Link>
        <MainNav className="mx-6" />
        <div className="flex items-center ml-auto space-x-4">
          {/* <span className="hidden md:block">
            <Search />
          </span> */}
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
          {/* <UserNav /> */}
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
