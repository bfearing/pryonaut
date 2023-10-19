import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      isSatellite
      domain={(url) => url.host}
      signInUrl="https://club.elestrals.dev/sign-in"
      {...pageProps}
    >
      <Component {...pageProps} />
      <Analytics />
    </ClerkProvider>
  );
}
