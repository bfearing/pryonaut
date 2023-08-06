import OverviewStatCards from "@/components/summary-cards";
import { ISSNow } from "@/data/schema";
import { useEffect, useRef, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { Crosshair2Icon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import useSWR from "swr";
import World from "@/components/sections/Globe/globe";
import PageHeader from "@/components/page-header";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "ISS Location | Pryonaut",
  description: "",
  ogImage: "",
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ISSPage() {
  const { data, error, isLoading } = useSWR<ISSNow>("/api/iss", fetcher, {
    refreshInterval: 1000,
  });
  const [issSummary, setISSSummary] = useState(ISSCards);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <AppLayout meta={metadata}>
      <PageHeader
        title="ISS Location"
        description="The International Space Station is moving at close to 28,000 km/h!
              Where is it right now?"
      />
      <Separator />
      <div className="space-y-4">
        <OverviewStatCards cards={issSummary} isLoading={isLoading} />
        <div className="flex-col flex-1 h-full space-y-8 md:flex">
          <Card className="overflow-hidden aspect-square" ref={mapContainerRef}>
            {isLoading || !data ? (
              <div className="flex items-center justify-center w-full h-full">
                <p>loading globe...</p>
              </div>
            ) : (
              <World gData={data} container={mapContainerRef} />
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
