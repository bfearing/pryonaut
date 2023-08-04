import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import {
  FacebookIcon,
  InstagramIcon,
  ShoppingBagIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navigation = {
  stellarpull: [
    { name: "Catalog", href: "/" },
    { name: "Timeline", href: "/timeline" },
  ],
  elestrals: [
    { name: "How to Play", href: "#" },
    { name: "Lore", href: "#" },
    { name: "Cards", href: "#" },
    { name: "News", href: "#" },
    { name: "Creators", href: "#" },
  ],
  shop: [
    { name: "New Releases", href: "#" },
    { name: "TCG", href: "#" },
    { name: "Pins & Plush", href: "#" },
    { name: "Shattered Stars", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
  social: [
    {
      name: "Instagram",
      href: "#",
      icon: (props: any) => <InstagramLogoIcon />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: (props: any) => <TwitterLogoIcon />,
    },
    {
      name: "Shop",
      href: "#",
      icon: (props: any) => <ShoppingBagIcon />,
    },
  ],
};

export default function SiteFooter2() {
  return (
    <footer aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="px-4 py-10 border-t sm:px-8 xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="grid grid-cols-2 gap-8 mt-16 xl:col-span-2 xl:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                StellarPull
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.stellarpull.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Elestrals
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.elestrals.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">
                Shop
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Legal
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-300 hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <Link href="https://www.elestrals.com">
            <Image
              className="w-auto h-10"
              src="https://proper-rhythm-9ab067e008.media.strapiapp.com/Elestrals_Logo_Colored_304764681a.png"
              alt="Elestrals Logo"
              width={1948}
              height={556}
            />
          </Link>
          <div>
            <h3 className="text-sm font-semibold">
              Subscribe to our Stellar newsletter
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0  px-3 py-1.5 text-base  shadow-sm ring-1 ring-inset ring-background/10 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-pink-500 sm:w-64 sm:text-sm xl:w-full"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold bg-pink-500 rounded-md shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-between px-4 py-8 border-t sm:px-8">
        <p className="text-xs text-muted-foreground">
          &copy; 2022 - {new Date().getFullYear()} Elestrals LLC. All rights
          reserved.
        </p>
        <div className="flex space-x-6">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-muted-foreground hover:text-muted-foreground/80"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
