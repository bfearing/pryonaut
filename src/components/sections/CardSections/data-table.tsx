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
import { Population, Task } from "@/data/schema";
import { editions, sets } from "@/data/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { cn, getEdition, getSet } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<
  TData extends {
    id: number;
    image: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
      thumbnail: { url: string };
    };
    imageHolo: {
      large: { url: string };
      medium: { url: string };
      small: { url: string };
      thumbnail: { url: string };
    };
    title: string;
    set: string;
    edition: string;
    registered: string;
    populationCount: number;
    number: number;
    registeredDate: string;
    originalOwner: string | null;
    currentOwner: string | null;
    currentLocation: string;
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
  const [layout, setLayout] = React.useState<string>("Grid");
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
        pageSize: 100,
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
                    // onClick={() => router.push(`/catalog/${row.original.id}`)}
                    className="hover:bg-initial"
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
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8 2xl:grid-cols-10">
          {table.getRowModel().rows.map((row) => {
            const data: Population = row.original;

            return (
              <Card key={row.id} className="group">
                {/* <Link href={`/catalog/${data.id}`}> */}
                <CardContent className="relative p-0">
                  <Image
                    src={data.image.medium.url}
                    alt={data.title}
                    width={628}
                    height={874}
                    className={cn(
                      data.registered !== "Registered" && "grayscale",
                      "w-full h-full"
                    )}
                  />
                  {data.imageHolo && data.registered === "Registered" && (
                    <Image
                      src={data.imageHolo.medium.url}
                      alt={data.title}
                      width={628}
                      height={874}
                      className="absolute top-0 left-0 z-0 w-full h-full opacity-0 transition-opacity ease-in-out duration-1000 group-hover:animate-pulse group-hover:opacity-100 group-hover:[animation-delay:1000ms]"
                    />
                  )}
                </CardContent>
                <CardFooter className="items-end justify-between px-2 pb-2">
                  <div className="flex flex-col mr-2">
                    <CardTitle
                      className={cn(
                        !data.currentOwner && "italic",
                        "text-xs leading-snug break-all line-clamp-1"
                      )}
                    >
                      {data.currentOwner ? data.currentOwner : "anonymous"}
                    </CardTitle>
                    {/* <CardDescription className="flex flex-col"> */}
                    {/* <span className="line-clamp-1">
                          {data.registered === "Registered"Date === "-"
                            ? "Not yet registered === "Registered""
                            : "Last registered === "Registered" " +
                              new Date(data.registered === "Registered"Date).toLocaleDateString(
                                "en-US",
                                {
                                  timeZone: "UTC",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                        </span> */}
                    {/* <span className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {data.registeredDate === "-"
                          ? "Not yet registered"
                          : "" +
                            new Date(data.registeredDate).toLocaleDateString(
                              "en-US",
                              {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                      </span> */}
                    {/* </CardDescription> */}
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold whitespace-nowrap">
                      {data.number.toString().padStart(2, "0") +
                        " / " +
                        data.populationCount}
                    </p>
                    {/* <p className="text-xs text-muted-foreground">
                        registered === "Registered"
                      </p> */}
                  </div>
                </CardFooter>
                {/* </Link> */}
              </Card>
            );
          })}
        </div>
      )}
      <DataTablePagination table={table} />
    </div>
  );
}
