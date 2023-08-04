import { Button } from "@/components/ui/button";
import Layout from "@/layouts/Layout";
import { getAllCardIds, getCardData } from "@/lib/cards";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { find } from "lodash";
import { CalendarIcon } from "@radix-ui/react-icons";
import { CalendarCheckIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEdition, getSet } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/sections/CardSections/data-table";
import { columns } from "@/components/sections/CardSections/columns";
import { Population, Task } from "@/data/schema";

export default function CardDetail({ cardData }: any) {
  // const [card, setCard] = useState<Task[]>([]);
  const [population, setPopulation] = useState<Population[]>([]);

  const mapCardData = (card: any) => {
    const populationCount = find(card.attributes.cardInfo, [
      "__component",
      "card.stellar",
    ]).populationCount;

    let popData = [];
    for (let i = 1; i <= populationCount; i++) {
      const registered = card.attributes.stellar_pulls.data.find(
        (e: any) => e.attributes.number === i
      );

      const originalOwner = registered
        ? registered.attributes.ownershipArray.find(
            (e: any) => e.originalOwner == true
          )
        : null;
      const currentOwner = registered
        ? registered.attributes.ownershipArray.find(
            (e: any) => e.currentOwner == true
          )
        : null;

      let data = {
        id: i,
        image: card.attributes.image.data.attributes.formats,
        imageHolo: card.attributes.imageHolo.data.attributes.formats,
        title: card.attributes.name,
        set: card.attributes.set.data.attributes.name,
        edition: card.attributes.edition.data.attributes.name,
        registered: registered ? "Registered" : "Unregistered",
        populationCount: populationCount,
        number: i,
        registeredDate: registered ? currentOwner.ownedStartDate : "-",
        originalOwner: registered ? originalOwner.name : "-",
        currentOwner: registered ? currentOwner.name : "-",
        currentLocation: registered ? currentOwner.location : "-",
      };

      popData.push(data);
    }

    setPopulation(popData);
  };

  useEffect(() => {
    if (cardData) {
      mapCardData(cardData);
    }
  }, [cardData]);

  const getFirstRegistered = (pulls: any) => {
    pulls.sort(
      (a: any, b: any) =>
        new Date(a.attributes.registeredDate as string).valueOf() -
        new Date(b.attributes.registeredDate as string).valueOf()
    );
    return pulls[0];
  };

  return (
    <Layout>
      <div className="flex-col">
        <div className="flex-1 p-4 pt-6 space-y-4 lg:p-8">
          <nav className="flex items-center gap-3">
            <Button asChild variant={"link"} size={"sm"} className="px-0">
              <Link href="/">Back to Catalog</Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <Button
              variant={"link"}
              size={"sm"}
              disabled
              className="!opacity-100 text-muted-foreground px-0"
            >
              {cardData.attributes.name} (
              {cardData.attributes.set.data.attributes.initialism} -{" "}
              {cardData.attributes.edition.data.attributes.name})
            </Button>
          </nav>
          <div className="flex flex-col items-start gap-x-10 gap-y-5 md:flex-row">
            <div className="flex items-center justify-center flex-1 w-full border rounded-lg bg-muted border-muted-foreground/10">
              <Image
                src={
                  cardData.attributes.image.data.attributes.formats.large.url
                }
                width={
                  cardData.attributes.image.data.attributes.formats.large.width
                }
                height={
                  cardData.attributes.image.data.attributes.formats.large.height
                }
                alt={cardData.attributes.image.data.attributes.alternativeText}
                className="w-auto"
              />
            </div>
            <div className="flex-1 w-full md:max-w-lg">
              <h2 className="mb-6 text-3xl font-bold tracking-tight">
                {cardData.attributes.name}
              </h2>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Card Details
              </p>
              <div className="flex flex-col mb-2 divide-y">
                <div className="flex justify-between py-2 text-base">
                  <p>Set</p>
                  <p>{getSet(cardData.attributes.set.data.attributes.name)}</p>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <p>Edition</p>
                  <p>
                    {getEdition(
                      cardData.attributes.edition.data.attributes.name
                    )}
                  </p>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <p>Release Date</p>
                  <p>
                    {new Date(
                      cardData.attributes.set.data.attributes.releaseDate
                    ).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm font-medium text-muted-foreground">
                Quick Stats
              </p>
              <div className="flex gap-2">
                <Card className="flex-1">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-2xl font-bold">
                      {cardData.attributes.stellar_pulls.data.length}
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      total pulled
                    </p>
                  </CardContent>
                </Card>
                <Card className="flex-1">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-2xl font-bold">
                      {
                        find(cardData.attributes.cardInfo, [
                          "__component",
                          "card.stellar",
                        ]).populationCount
                      }
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      total population
                    </p>
                  </CardContent>
                </Card>
                {/* <Card className="flex-1">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-2xl font-bold">0.02%</div>
                    <p className="text-xs text-center text-muted-foreground">
                      est. pull rate
                    </p>
                  </CardContent>
                </Card> */}
              </div>
              {!!cardData.attributes.stellar_pulls.data.length && (
                <div className="mt-6">
                  <p className="mb-4 text-sm font-medium text-muted-foreground">
                    Discovered By
                  </p>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="" alt="" />
                          <AvatarFallback>
                            {getFirstRegistered(
                              cardData.attributes.stellar_pulls.data
                            )
                              .attributes.ownershipArray[0].name.substring(0, 1)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="mb-1 font-semibold leading-5 font-sm">
                            {
                              getFirstRegistered(
                                cardData.attributes.stellar_pulls.data
                              ).attributes.ownershipArray[0].name
                            }
                          </p>
                          <div className="flex text-muted-foreground">
                            <CalendarCheckIcon className="w-4 h-4" />
                            <p className="ml-1 text-xs">
                              {new Date(
                                getFirstRegistered(
                                  cardData.attributes.stellar_pulls.data
                                ).attributes.registeredDate
                              ).toLocaleDateString("en-US", {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-lg font-bold">
                          {getFirstRegistered(
                            cardData.attributes.stellar_pulls.data
                          )
                            .attributes.number.toString()
                            .padStart(2, "0")}{" "}
                          /{" "}
                          {
                            find(cardData.attributes.cardInfo, [
                              "__component",
                              "card.stellar",
                            ]).populationCount
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
          <div className="py-6">
            <Tabs defaultValue="detail" className="space-y-4">
              <TabsList>
                <TabsTrigger value="detail">Population Detail</TabsTrigger>
                <TabsTrigger value="reactions" disabled>
                  Pull History
                </TabsTrigger>
                <TabsTrigger value="reactions" disabled>
                  Reaction Videos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="space-y-4">
                <div className="flex-col flex-1 h-full space-y-8 md:flex">
                  <DataTable data={population} columns={columns} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllCardIds();

  // console.log(paths, "PATHS");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const cardData = await getCardData(params.id);

  return {
    props: {
      cardData,
    },
  };
}
