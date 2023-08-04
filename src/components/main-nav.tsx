import Link from "next/link";

import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          router.pathname === "/" || router.pathname?.startsWith("/catalog")
            ? ""
            : "text-muted-foreground"
        )}
      >
        Catalog
      </Link>
      <Link
        href="/timeline"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          router.pathname === "/timeline" ? "" : "text-muted-foreground"
        )}
      >
        Timeline
      </Link>
      {/* <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        Products
      </Link> */}
      {/* <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
      >
        Settings
      </Link> */}
    </nav>
  );
}
