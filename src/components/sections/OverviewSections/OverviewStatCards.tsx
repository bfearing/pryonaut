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

const OverviewStatCards = ({ data, isLoading }: any) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-6 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <CardTitle className="mr-4 text-sm font-medium">
            Total Serialized Stellars
          </CardTitle>
          {isLoading ? (
            <SymbolIcon className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
          ) : (
            <FrameIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data[0].toLocaleString("en-US")}
          </div>
          <p className="text-xs text-muted-foreground">
            {Math.round((1 - data[1] / data[0]) * 100)}% unregistered
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <CardTitle className="mr-4 text-sm font-medium">
            Registered Stellars
          </CardTitle>
          {isLoading ? (
            <SymbolIcon className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
          ) : (
            <Crosshair2Icon className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data[1]}</div>
          {/* <p className="text-xs text-muted-foreground">
            {Math.round((data[1] / data[0]) * 100)}% registered
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <CardTitle className="mr-4 text-sm font-medium">
            Known Stellar Elestrals
          </CardTitle>
          {isLoading ? (
            <SymbolIcon className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
          ) : (
            <LockOpen2Icon className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data[2]}</div>
          {/* <p className="text-xs text-muted-foreground">
            Based on known print quantities
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <CardTitle className="mr-4 text-sm font-medium">
            Secret Stellar Elestrals
          </CardTitle>
          {isLoading ? (
            <SymbolIcon className="w-4 h-4 text-muted-foreground animate-spin shrink-0" />
          ) : (
            <LockClosedIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data[3]}</div>
          {/* <p className="text-xs text-muted-foreground">
            Based on known information
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewStatCards;
