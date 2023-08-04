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
import { Task } from "@/data/schema";
import { editions, sets } from "@/data/data";
import Link from "next/link";
import { useRouter } from "next/router";
import { getEdition, getSet } from "@/lib/utils";

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
    // status: string;
    // label: string;
    // priority: string;
    set: string;
    edition: string;
    registeredCount: number;
    registered: string;
    isAnnounced: boolean;
    product: string;
    populationCount: number;
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
                    onClick={() => router.push(`/catalog/${row.original.id}`)}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
          {table.getRowModel().rows.map((row) => {
            const data: Task = row.original;

            return (
              <Card key={row.id} className="group">
                <Link href={`/catalog/${data.id}`}>
                  <CardContent className="relative p-0">
                    <Image
                      src={data.image.large.url}
                      alt={data.title}
                      width={733}
                      height={1000}
                      className="w-full h-full"
                    />
                    {data.imageHolo && (
                      <Image
                        src={data.imageHolo.large.url}
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
                        <span className="line-clamp-1">{getSet(data.set)}</span>
                        <span className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                          {getEdition(data.edition)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold whitespace-nowrap">
                        {data.registeredCount} of {data.populationCount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        registered
                      </p>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
      <DataTablePagination table={table} />
    </div>
  );
}
