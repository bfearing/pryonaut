import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChartIcon,
  Crosshair2Icon,
  FrameIcon,
  LockClosedIcon,
  LockOpen1Icon,
  LockOpen2Icon,
  MagnifyingGlassIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";

const OverviewStatCards = ({ cards, isLoading }: any) => {
  return (
    <div className="flex gap-4 py-6">
      {cards.map((data: any, i: number) => (
        <Card className="flex-1" key={i}>
          <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
            <CardTitle className="mr-4 text-sm font-medium">
              {data.title}
            </CardTitle>
            {isLoading ? (
              <SymbolIcon className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
            ) : (
              <data.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.count.toLocaleString("en-US")}
            </div>
            {data.description && (
              <p className="text-xs text-muted-foreground">
                {data.description}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OverviewStatCards;
