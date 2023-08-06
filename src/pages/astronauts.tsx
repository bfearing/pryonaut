import OverviewStatCards from "@/components/summary-cards";
import { Astros, People } from "@/data/schema";
import { DataTable } from "@/components/sections/AstronautsTable/data-table";
import { columns } from "@/components/sections/AstronautsTable/columns";
import { useEffect, useState } from "react";
import { getAstros } from "@/lib/open-notify";
import AppLayout from "@/layouts/AppLayout";
import { GlobeIcon, RocketIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/page-header";

export const metadata = {
  title: "Astronauts | Pryonaut",
  description: "",
  ogImage: "",
};

const AstroCards = [
  {
    title: "Astronauts in Space",
    count: "0",
    description: "",
    icon: GlobeIcon,
  },
  {
    title: "Crafts in Space",
    count: "0",
    description: "",
    icon: RocketIcon,
  },
];

export default function DashboardPage({ astros }: { astros: Astros }) {
  const [astronautSummary, setAstronautSummary] = useState(AstroCards);
  const [isLoading, setIsLoading] = useState(true);
  const [astronauts, setAstronauts] = useState<People[]>([]);

  const updAstronautCounts = (astros: Astros) => {
    const counts = [
      astros.number.toString(),
      [...new Set(astros.people.map((item) => item.craft))].length.toString(),
    ];

    let updSummary = astronautSummary.map((data, i) => {
      return { ...data, count: counts[i] };
    });

    setAstronautSummary(updSummary);
  };

  useEffect(() => {
    if (astros) {
      // console.log("astros :>> ", astros);
      updAstronautCounts(astros);
      setAstronauts(astros.people);
      setIsLoading(false);
    }
  }, [astros]);

  return (
    <AppLayout meta={metadata}>
      <PageHeader
        title="Astronauts"
        description="Over 600 people have reached Earth orbit. How many humans are in
              space right now?"
      />
      <Separator />
      <div className="space-y-4">
        <OverviewStatCards cards={astronautSummary} isLoading={isLoading} />
        <div className="flex-col flex-1 h-full space-y-8 md:flex">
          <DataTable data={astronauts} columns={columns} />
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
