import { ColumnDef } from "@tanstack/react-table";
import { crafts } from "@/data/data";
import { People } from "@/data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";

import Image from "next/image";

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "craft",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Craft" />
    ),
    cell: ({ row }) => {
      const craft = crafts.find(
        (craft) => craft.value === row.getValue("craft")
      );

      if (!craft) {
        return null;
      }

      return (
        <div className="flex items-center w-auto whitespace-nowrap">
          <span>{craft.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
