import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { ShoppingBagIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SiteFooter = () => {
  return (
    <div className="border-t">
      <div className="flex flex-col items-center gap-4 px-4 py-4 sm:flex-row">
        <p className="flex-1 order-3 text-xs sm:order-none text-muted-foreground">
          © Elestrals LLC
        </p>
        <Link
          href="https://www.elestrals.com"
          className="order-2 sm:order-none"
          target="_blank"
        >
          <Image
            src="https://proper-rhythm-9ab067e008.media.strapiapp.com/Elestrals_Logo_Colored_304764681a.png"
            width={1948}
            height={556}
            className="w-auto h-12 "
            alt="Elestrals logo flex-auto"
          />
        </Link>

        <nav className="flex justify-end flex-1 order-1 sm:order-none">
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <DiscordLogoIcon className="w-4 h-4" />
              <span className="sr-only">Discord</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.shopify}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <ShoppingBagIcon className="w-4 h-4" />
              <span className="sr-only">Shop</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <TwitterIcon className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <Link
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <YoutubeIcon className="w-4 h-4" />
              <span className="sr-only">YouTube</span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SiteFooter;
