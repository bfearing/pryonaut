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
import { Astros, People, atrosSchema } from "@/data/schema";
import { DataTable } from "@/components/sections/CatalogSections/data-table";
import { columns } from "@/components/sections/CatalogSections/columns";
import { useEffect, useState } from "react";
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

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

// const pulls = getCardPulls();

const AstroCards = [
  {
    title: "Astronauts in Space",
    count: 0,
    description: "",
    icon: Crosshair2Icon,
  },
  {
    title: "Crafts in Space",
    count: 0,
    description: "",
    icon: Crosshair2Icon,
  },
];

export default function DashboardPage({ astros }: { astros: Astros }) {
  const [astronautSummary, setAstronautSummary] = useState(AstroCards);
  // const [knownStellars, setKnownStellars] = useState(0);
  // const [secretStellars, setSecretStellars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [astronauts, setAstronauts] = useState<People[]>([]);

  // const [catalog, setCatalog] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     const endpoint = "/api/catalog";
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     setIsLoading(true);
  //     const response = await fetch(endpoint, options);
  //     const result = await response.json();
  //     setCatalog(result.data);
  //     setIsLoading(false);
  //   }
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log("catalog :>> ", catalog);
  // }, [catalog]);

  // const getStellarCounts = async (cards: any) => {
  //   const stellarCards: any = await cards.filter((card: any) => {
  //     if (find(card.attributes.cardInfo, ["__component", "card.stellar"])) {
  //       return find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //         .isNumbered;
  //     }
  //   });

  //   if (stellarCards) {
  //     let totalStellarCountArray = stellarCards.map((card: any) => {
  //       return find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //         .populationCount;
  //     });

  //     const totalStellarCount = totalStellarCountArray.reduce(
  //       (partialSum: any, a: any) => partialSum + a,
  //       0
  //     );

  //     setTotalStellars(totalStellarCount);

  //     //get the total count of registered stellars
  //     let registeredCountArray = stellarCards.map((card: any) => {
  //       return card.attributes.stellar_pulls.data.length;
  //     });

  //     const totalRegisteredCount = registeredCountArray.reduce(
  //       (partialSum: any, a: any) => partialSum + a,
  //       0
  //     );

  //     setTotalRegistered(totalRegisteredCount);

  //     let totalKnownCountArray = stellarCards.filter((card: any) => {
  //       return find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //         .isAnnounced;
  //     });

  //     setKnownStellars(totalKnownCountArray.length);

  //     let totalSecretCountArray = stellarCards.filter((card: any) => {
  //       return !find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //         .isAnnounced;
  //     });

  //     setSecretStellars(totalSecretCountArray.length);
  //   }
  // };

  // const mapCardData = async (cards: any) => {
  //   let stellarCards = cards.filter((card: any) => {
  //     return find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //       .isAnnounced;
  //   });

  //   stellarCards.sort((a: any, b: any) =>
  //     a.attributes.number.localeCompare(b.attributes.number)
  //   );

  //   let stellarCardsData = await stellarCards.map((card: any) => {
  //     let data = {
  //       id: card.id,
  //       image: card.attributes.image.data.attributes.formats,
  //       imageHolo: card.attributes.imageHolo.data
  //         ? card.attributes.imageHolo.data.attributes.formats
  //         : null,
  //       title: card.attributes.name,
  //       set: card.attributes.set.data.attributes.name,
  //       edition: card.attributes.edition.data.attributes.name,
  //       registeredCount: card.attributes.stellar_pulls.data.length,
  //       registered:
  //         card.attributes.stellar_pulls.data.length > 0
  //           ? "Discovered"
  //           : "Undiscovered",
  //       isAnnounced: find(card.attributes.cardInfo, [
  //         "__component",
  //         "card.stellar",
  //       ]).isAnnounced,
  //       product: find(card.attributes.cardInfo, ["__component", "card.stellar"])
  //         .product,
  //       populationCount: find(card.attributes.cardInfo, [
  //         "__component",
  //         "card.stellar",
  //       ]).populationCount,
  //     };

  //     return data;
  //   });

  //   setStellarCards(stellarCardsData);
  // };

  const updAstronautCounts = (astros: Astros) => {
    const counts = [
      astros.number,
      [...new Set(astros.people.map((item) => item.craft))].length,
    ];

    let updSummary = astronautSummary.map((data, i) => {
      return { ...data, count: counts[i] };
    });

    setAstronautSummary(updSummary);
  };

  useEffect(() => {
    if (astros) {
      console.log("astros :>> ", astros);
      updAstronautCounts(astros);
      setAstronauts(astros.people);
      // getStellarCounts(cards.data);
      // mapCardData(cards.data);
      setIsLoading(false);
    }
  }, [astros]);

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
            <h3 className="text-lg font-medium">Astronauts</h3>
            <p className="text-sm text-muted-foreground">
              How many humans are in space right now?
            </p>
          </div>
          <Separator />
          <div className="space-y-4">
            <OverviewStatCards cards={astronautSummary} isLoading={isLoading} />
            <div className="flex-col flex-1 h-full space-y-8 md:flex">
              <DataTable data={astronauts} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export async function getStaticProps() {
  const astros = await getAstros();

  return {
    props: {
      astros,
    },
  };
}
