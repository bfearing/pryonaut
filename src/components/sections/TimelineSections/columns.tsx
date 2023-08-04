import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { sets, editions, labels, priorities, statuses } from "@/data/data";
import { Task, TimelineTask } from "@/data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<TimelineTask>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Task" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "cardImageData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[56px]">
          <Image
            src={row.original.cardImageData.thumbnail.url}
            alt={row.original.title}
            width={628}
            height={874}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Elestral" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "set",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Set" />
    ),
    cell: ({ row }) => {
      const set = sets.find((set) => set.value === row.original.set);

      if (!set) {
        return null;
      }

      return (
        <div className="flex items-center w-auto whitespace-nowrap">
          {/* {set.icon && (
            <set.icon className="w-4 h-4 mr-2 text-muted-foreground" />
          )} */}
          <span>{set.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "edition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Edition" />
    ),
    cell: ({ row }) => {
      const edition = editions.find(
        (edition) => edition.value === row.original.edition
      );

      if (!edition) {
        return null;
      }

      return (
        <div className="flex items-center whitespace-nowrap">
          {/* {edition.icon && (
            <edition.icon className="w-4 h-4 mr-2 text-muted-foreground" />
          )} */}
          <span>{edition.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.number.toString().padStart(2, "0") +
              " / " +
              row.original.cardTotalCount}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "registeredDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registered Date" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {new Date(row.original.registeredDate).toLocaleDateString("en-US", {
              timeZone: "UTC",
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "registrar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registrar" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span
            className={cn(
              !row.original.owner.name && "italic",
              "max-w-[500px] truncate font-medium"
            )}
          >
            {row.original.owner.name ? row.original.owner.name : "anonymous"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.original.owner.location}
          </span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="w-4 h-4 mr-2 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="w-4 h-4 mr-2 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "releaseDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Release Date" />
  //   ),
  //   cell: ({ row }) => {
  //     return row.getValue("releaseDate");
  //   },
  // },

  {
    accessorKey: "product",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
