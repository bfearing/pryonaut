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

import { OverviewChart } from "@/components/sections/OverviewSections/OverviewChart";
import { OverviewRecent } from "@/components/sections/OverviewSections/OverviewRecent";
import { Search } from "@/components/search";

import OverviewStatCards from "@/components/sections/OverviewSections/OverviewStatCards";

import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { Task, taskSchema } from "@/data/schema";
import { DataTable } from "@/components/sections/CatalogSections/data-table";
import { columns } from "@/components/sections/CatalogSections/columns";
import { useEffect, useState } from "react";
import qs from "qs";
import { getCardCatalog, getCardPulls } from "@/lib/cards";
import { Widget } from "@typeform/embed-react";
import SidePanel from "@/components/sections/GlobalSections/SidePanel";
import Link from "next/link";
import Head from "next/head";
import Layout from "@/layouts/Layout";

// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "src/data/tasks.json")
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

// export async function getStaticProps() {
//   const data = await getTasks();
//   return {
//     props: {
//       data,
//     },
//   };
// }

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const pulls = getCardPulls();

export default function DashboardPage({
  data,
  cards,
}: {
  data: Task[];
  cards: any;
}) {
  const [totalStellars, setTotalStellars] = useState(0);
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [stellarRate, setStellarRate] = useState("1 in 3,600");
  const [knownStellars, setKnownStellars] = useState(0);
  const [secretStellars, setSecretStellars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [stellarCards, setStellarCards] = useState<Task[]>([]);

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

  const getStellarCounts = async (cards: any) => {
    const stellarCards: any = await cards.filter((card: any) => {
      if (find(card.attributes.cardInfo, ["__component", "card.stellar"])) {
        return find(card.attributes.cardInfo, ["__component", "card.stellar"])
          .isNumbered;
      }
    });

    if (stellarCards) {
      //get the total count of numbered stellars
      let totalStellarCountArray = stellarCards.map((card: any) => {
        return find(card.attributes.cardInfo, ["__component", "card.stellar"])
          .populationCount;
      });

      const totalStellarCount = totalStellarCountArray.reduce(
        (partialSum: any, a: any) => partialSum + a,
        0
      );

      setTotalStellars(totalStellarCount);

      //get the total count of registered stellars
      let registeredCountArray = stellarCards.map((card: any) => {
        return card.attributes.stellar_pulls.data.length;
      });

      const totalRegisteredCount = registeredCountArray.reduce(
        (partialSum: any, a: any) => partialSum + a,
        0
      );

      setTotalRegistered(totalRegisteredCount);

      //get the total count of known stellars
      let totalKnownCountArray = stellarCards.filter((card: any) => {
        return find(card.attributes.cardInfo, ["__component", "card.stellar"])
          .isAnnounced;
      });

      setKnownStellars(totalKnownCountArray.length);

      //get the total count of secret stellars
      let totalSecretCountArray = stellarCards.filter((card: any) => {
        return !find(card.attributes.cardInfo, ["__component", "card.stellar"])
          .isAnnounced;
      });

      setSecretStellars(totalSecretCountArray.length);
    }
  };

  const mapCardData = async (cards: any) => {
    let stellarCards = cards.filter((card: any) => {
      return find(card.attributes.cardInfo, ["__component", "card.stellar"])
        .isAnnounced;
    });

    stellarCards.sort((a: any, b: any) =>
      a.attributes.number.localeCompare(b.attributes.number)
    );

    let stellarCardsData = await stellarCards.map((card: any) => {
      let data = {
        id: card.id,
        image: card.attributes.image.data.attributes.formats,
        imageHolo: card.attributes.imageHolo.data
          ? card.attributes.imageHolo.data.attributes.formats
          : null,
        title: card.attributes.name,
        set: card.attributes.set.data.attributes.name,
        edition: card.attributes.edition.data.attributes.name,
        registeredCount: card.attributes.stellar_pulls.data.length,
        registered:
          card.attributes.stellar_pulls.data.length > 0
            ? "Discovered"
            : "Undiscovered",
        isAnnounced: find(card.attributes.cardInfo, [
          "__component",
          "card.stellar",
        ]).isAnnounced,
        product: find(card.attributes.cardInfo, ["__component", "card.stellar"])
          .product,
        populationCount: find(card.attributes.cardInfo, [
          "__component",
          "card.stellar",
        ]).populationCount,
      };

      return data;
    });

    setStellarCards(stellarCardsData);
  };

  useEffect(() => {
    if (cards) {
      //console.log("cards :>> ", cards);
      getStellarCounts(cards.data);
      mapCardData(cards.data);
      setIsLoading(false);
    }
  }, [cards]);

  return (
    <Layout>
      <Head>
        <title>StellarPull | Official Stellar Tracker</title>
        <meta
          property="og:title"
          content="StellarPull | Official Stellar Tracker"
          key="title"
        />
        <meta
          name="twitter:title"
          content="StellarPull | Official Stellar Tracker"
        />
        <meta
          name="description"
          content="Register, track, and research the elusive Stellar rare cards of Elestrals. StellarPull is an official app produced and maintained by the Elestrals team."
        />
        <meta
          property="og:description"
          content="Register, track, and research the elusive Stellar rare cards of Elestrals. StellarPull is an official app produced and maintained by the Elestrals team."
        />
        <meta
          name="twitter:description"
          content="Register, track, and research the elusive Stellar rare cards of Elestrals. StellarPull is an official app produced and maintained by the Elestrals team."
        />
        <meta property="og:image" content="/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="elestrals.com" />
        <meta property="og:url" content="https://www.stellarpull.com" />
        <meta property="twitter:url" content="https://www.stellarpull.com" />
      </Head>
      <div className="flex-col">
        <div className="flex-1 p-4 pt-6 space-y-4 lg:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Catalog</h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <Search /> */}
              {/* <Sheet>
                <SheetTrigger asChild>
                  <Button>Register Stellar Pull</Button>
                </SheetTrigger>
                <SheetContent>
                  <Widget id="Nyv8fsj5" className="w-full h-full" />
                </SheetContent>
              </Sheet> */}

              <Button asChild>
                <Link
                  href="https://elestrals.typeform.com/stellarpull-upd"
                  target="_blank"
                >
                  Register Stellar
                </Link>
              </Button>
            </div>
          </div>
          {/* <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <OverviewStatCards />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <OverviewChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Pulls</CardTitle>
                    <CardDescription>
                      There have been 6 Stellars pulled in the last 30 days.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OverviewRecent />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs> */}
          <div className="space-y-4">
            <OverviewStatCards
              data={[
                totalStellars,
                totalRegistered,
                knownStellars,
                secretStellars,
              ]}
              isLoading={isLoading}
            />
            <div className="flex-col flex-1 h-full space-y-8 md:flex">
              <DataTable data={stellarCards} columns={columns} />
            </div>
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <OverviewChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Pulls</CardTitle>
                  <CardDescription>
                    There have been 6 Stellars pulled in the last 30 days.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OverviewRecent />
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const cards = await getCardCatalog();

  return {
    props: {
      cards,
    },
  };
}
