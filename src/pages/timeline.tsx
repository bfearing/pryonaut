import Layout from "@/layouts/Layout";
import Head from "next/head";
import { Metadata } from "next";
import { DataTable } from "@/components/sections/TimelineSections/data-table";
import { useEffect, useState } from "react";
import { getCardPulls, getCardData } from "@/lib/cards";
import { Task, TimelineTask } from "@/data/schema";
import { columns } from "@/components/sections/TimelineSections/columns";
import { find } from "lodash";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Active Space Timeline of Card Pulls",
};

export default function TimelinePage({ pulls }: { pulls: any }) {
  const [stellarPulls, setStellarPulls] = useState<TimelineTask[]>([]);

  const mapCardData = async (pulls: any) => {
    let stellarPullsData = pulls.map((pull: any) => {
      let currentOwner = pull.attributes.ownershipArray.find(
        (e: any) => e.currentOwner == true
      );

      let ownerData = {
        id: currentOwner.id,
        location: currentOwner.location,
        name: currentOwner.name,
        originalOwner: currentOwner.originalOwner,
      };

      let imageData = {
        large: {
          url: pull.attributes.card.data.attributes.image.data.attributes
            .formats.large.url,
        },
        medium: {
          url: pull.attributes.card.data.attributes.image.data.attributes
            .formats.medium.url,
        },
        small: {
          url: pull.attributes.card.data.attributes.image.data.attributes
            .formats.small.url,
        },
        thumbnail: {
          url: pull.attributes.card.data.attributes.image.data.attributes
            .formats.thumbnail.url,
        },
      };

      let imageHoloData = {
        large: {
          url: pull.attributes.card.data.attributes.imageHolo.data.attributes
            .formats.large.url,
        },
        medium: {
          url: pull.attributes.card.data.attributes.imageHolo.data.attributes
            .formats.medium.url,
        },
        small: {
          url: pull.attributes.card.data.attributes.imageHolo.data.attributes
            .formats.small.url,
        },
        thumbnail: {
          url: pull.attributes.card.data.attributes.imageHolo.data.attributes
            .formats.thumbnail.url,
        },
      };

      let data = {
        id: pull.id,
        cardId: pull.attributes.card.data.id,
        title: pull.attributes.card.data.attributes.name,
        cardNumber: pull.attributes.card.data.attributes.number,
        cardImageData: imageData,
        cardImageHoloData: imageHoloData,
        edition:
          pull.attributes.card.data.attributes.edition.data.attributes.name,
        set: pull.attributes.card.data.attributes.set.data.attributes.name,
        cardProduct: find(pull.attributes.card.data.attributes.cardInfo, [
          "__component",
          "card.stellar",
        ]).product,
        cardTotalCount: find(pull.attributes.card.data.attributes.cardInfo, [
          "__component",
          "card.stellar",
        ]).populationCount,
        name: pull.attributes.name,
        number: pull.attributes.number,
        owner: ownerData,
        product: pull.attributes.product,
        registeredDate: pull.attributes.registeredDate,
      };

      return data;
    });

    setStellarPulls(stellarPullsData);
  };

  useEffect(() => {
    if (pulls) {
      // console.log(pulls, "pulls");
      mapCardData(pulls.data);
    }
  }, [pulls]);

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
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Timeline</h2>
          </div>
          <div className="space-y-4">
            <div className="flex-col flex-1 h-full space-y-8 md:flex">
              <DataTable data={stellarPulls} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const pulls = await getCardPulls();

  return {
    props: {
      pulls,
    },
  };
}
