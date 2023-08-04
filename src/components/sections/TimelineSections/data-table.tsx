import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Task, TimelineCardTask, TimelineTask } from "@/data/schema";
import { editions, sets } from "@/data/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn, getEdition, getSet } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<
  TData extends {
    id: number;
    cardId: number;
    title: string;
    cardNumber: number;
    cardImageData: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
      thumbnail: { url: string };
    };
    cardImageHoloData: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
      thumbnail: { url: string };
    };
    edition: string;
    set: string;
    cardProduct: string;
    cardTotalCount: number;
    name: string;
    number: number;
    owner: {
      id: number;
      location: string;
      name: string;
      originalOwner: boolean;
    };
    product: string;
    registeredDate: string;
  },
  TValue
>({ columns, data }: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [layout, setLayout] = React.useState<string>("Timeline");

  const [modData, setModData] = React.useState<TimelineCardTask>([]);

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} layout={[layout, setLayout]} />
      {layout === "Table" ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      router.push(`/catalog/${row.original.cardId}`)
                    }
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="relative flex flex-col gap-4 sm:my-10">
            {/* Vertical bar running through middle */}
            <div className="absolute w-0.5 h-full transform -translate-x-1/2 bg-muted left-[10px] sm:left-1/2"></div>

            <div className="fixed flex items-center justify-center w-5 h-5 transform sm:-translate-x-1/2 sm:left-1/2 translate-y-0 my-0.5">
              <Image
                src="https://proper-rhythm-9ab067e008.media.strapiapp.com/Stone_Square_3e17534d59.png"
                alt="Stone Square"
                width={32}
                height={32}
              />
            </div>

            {table.getRowModel().rows.map((row, i) => {
              const data: TimelineTask = row.original;

              return (
                <section
                  key={row.id}
                  className={cn(
                    i % 2 == 0
                      ? "pl-8 sm:pl-0 sm:pr-8 justify-end"
                      : "pl-8 justify-start ml-auto",
                    "flex w-full sm:w-1/2"
                  )}
                >
                  <div
                    className={cn(
                      i % 2 == 0 ? "sm:items-end" : "sm:items-start",
                      "flex flex-col gap-2 flex-1"
                    )}
                  >
                    <Badge variant="secondary" className="w-fit">
                      {"Registered in " +
                        (data.owner.location === "USA"
                          ? "the USA"
                          : data.owner.location) +
                        " on " +
                        new Date(data.registeredDate).toLocaleDateString(
                          "en-US",
                          {
                            timeZone: "UTC",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                    </Badge>
                    <Card key={data.number} className="group">
                      <Link href={`/catalog/${data.cardId}`}>
                        <CardContent className="relative p-0">
                          <Image
                            src={data.cardImageData.large.url}
                            alt={data.title}
                            width={733}
                            height={1000}
                            className="w-full h-full"
                          />
                          {data.cardImageHoloData && (
                            <Image
                              src={data.cardImageHoloData.large.url}
                              alt={data.title}
                              width={733}
                              height={1000}
                              className="absolute top-0 left-0 z-0 w-full h-full opacity-0 transition-opacity ease-in-out duration-1000 group-hover:animate-pulse group-hover:opacity-100 group-hover:[animation-delay:1000ms]"
                            />
                          )}
                        </CardContent>
                        <CardFooter className="items-end justify-between px-4 pb-4">
                          <div className="flex flex-col mr-2">
                            <CardTitle className="mb-0.5 text-xl leading-snug">
                              {data.title}
                            </CardTitle>
                            <CardDescription className="flex flex-col text-sm">
                              <span className="line-clamp-1">
                                {getSet(data.set)}
                              </span>
                              <span className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                                {getEdition(data.edition)}
                              </span>
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold whitespace-nowrap">
                              {data.number.toString().padStart(2, "0")} /{" "}
                              {data.cardTotalCount}
                            </p>
                            <p
                              className={cn(
                                !data.owner.name && "italic",
                                "text-xs text-muted-foreground"
                              )}
                            >
                              {data.owner.name ? data.owner.name : "anonymous"}
                            </p>
                          </div>
                        </CardFooter>
                      </Link>
                    </Card>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      )}
      <DataTablePagination table={table} />
    </div>
  );
}
