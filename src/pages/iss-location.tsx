// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { find } from "lodash";

// const inter = Inter({ subsets: ['latin'] })
import { GetStaticPaths, Metadata } from "next";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";

import { Search } from "@/components/search";

import OverviewStatCards from "@/components/sections/OverviewSections/OverviewStatCards";

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { Astros, ISSNow, People, atrosSchema } from "@/data/schema";
import { DataTable } from "@/components/sections/CatalogSections/data-table";
import { columns } from "@/components/sections/CatalogSections/columns";
import { useEffect, useRef, useState } from "react";
import qs from "qs";
import { getAstros } from "@/lib/open-notify";
import { Widget } from "@typeform/embed-react";
import SidePanel from "@/components/sections/GlobalSections/SidePanel";
import Link from "next/link";
import Head from "next/head";
import Layout from "@/layouts/Layout";
import AppLayout from "@/layouts/AppLayout";
import { Crosshair2Icon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import World from "@/components/globe";
import { TypeAnimation } from "react-type-animation";
// import GlobeMap from "@/components/globe";
// import ReactGlobe from "react-globe";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const ISSCards = [
  {
    title: "Latitute",
    count: "0",
    description: "",
    icon: Crosshair2Icon,
  },
  {
    title: "Longitute",
    count: "0",
    description: "",
    icon: Crosshair2Icon,
  },
];

// const pulls = getCardPulls();

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ISSPage() {
  const { data, error, isLoading } = useSWR<ISSNow>("/api/iss", fetcher, {
    refreshInterval: 1000,
  });
  const [issSummary, setISSSummary] = useState(ISSCards);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // const [location, setLocation] = useState<ISSNow>();

  const updISSCounts = (iss: ISSNow) => {
    const counts = [iss.iss_position.latitude, iss.iss_position.longitude];

    let updSummary = issSummary.map((data, i) => {
      return {
        ...data,
        count: counts[i],
        description: `as of ${new Date(
          iss.timestamp * 1000
        ).toLocaleTimeString()}`,
      };
    });

    setISSSummary(updSummary);
  };

  useEffect(() => {
    if (data) {
      console.log("data :>> ", data);
      updISSCounts(data);
    }
  }, [data]);

  // const [globeData, setGlobeData] = useState<any>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     fetcher("/api/iss").then((res) => {
  //       console.log(res, "res");
  //       setLocation(res);
  //       setIsLoading(false);
  //     });
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     setGlobeData([
  //       {
  //         color: "white",
  //         lat: data.iss_position.latitude,
  //         lng: data.iss_position.longitude,
  //         size: 0.5,
  //       },
  //     ]);
  //   }
  // }, [data]);

  return (
    <AppLayout>
      <Head>
        <title>Pryonaut | Trusted Space Answers</title>
        <meta
          property="og:title"
          content="Pryonaut | Trusted Space Answers"
          key="title"
        />
        <meta name="twitter:title" content="Pryonaut | Trusted Space Answers" />
        <meta
          name="description"
          content="Trusted data for all of your astro-knowledge needs."
        />
        <meta
          property="og:description"
          content="Trusted data for all of your astro-knowledge needs."
        />
        <meta
          name="twitter:description"
          content="Trusted data for all of your astro-knowledge needs."
        />
        <meta property="og:image" content="/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="elestrals.com" />
        <meta property="og:url" content="https://www.pryonaut.com" />
        <meta property="twitter:url" content="https://www.pryonaut.com" />
      </Head>
      <div className="flex-1 lg:max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">ISS Location</h3>
            <p className="text-sm text-muted-foreground">
              The International Space Station is moving at close to 28,000 km/h!
              Where is it right now?
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <OverviewStatCards cards={issSummary} isLoading={isLoading} />
            <div className="flex-col flex-1 h-full space-y-8 md:flex">
              {isLoading || !data ? (
                <p>Loading ISS Location</p>
              ) : (
                <Card
                  className="overflow-hidden aspect-square"
                  ref={mapContainerRef}
                >
                  <World gData={data} container={mapContainerRef} />
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
