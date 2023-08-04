"use client";

import {
  Cross2Icon,
  GridIcon,
  LayoutIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import {
  sets,
  editions,
  priorities,
  statuses,
  registered,
  product,
  discovered,
} from "@/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  layout: [string, React.Dispatch<React.SetStateAction<string>>];
}

export function DataTableToolbar<TData>({
  table,
  layout,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder="Filter cards..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        {table.getColumn("set") && (
          <DataTableFacetedFilter
            column={table.getColumn("set")}
            title="Set"
            options={sets}
          />
        )}
        {table.getColumn("edition") && (
          <DataTableFacetedFilter
            column={table.getColumn("edition")}
            title="Edition"
            options={editions}
          />
        )}
        {table.getColumn("registered") && (
          <DataTableFacetedFilter
            column={table.getColumn("registered")}
            title="Status"
            options={discovered}
          />
        )}
        {table.getColumn("product") && (
          <DataTableFacetedFilter
            column={table.getColumn("product")}
            title="Type"
            options={product}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        {/* <DataTableViewOptions table={table} /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex h-8 ml-auto">
              <GridIcon className="w-4 h-4" />
              <span className="hidden sm:block sm:ml-2">Layout</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Select layout</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={layout[0] === "Grid"}
              onCheckedChange={(value) => layout[1]("Grid")}
            >
              Grid
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="capitalize"
              checked={layout[0] === "Table"}
              onCheckedChange={(value) => layout[1]("Table")}
            >
              Table
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
