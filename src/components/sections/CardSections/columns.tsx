import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { sets, editions, labels, priorities, statuses } from "@/data/data";
import { Population, Task } from "@/data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

import Image from "next/image";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Population>[] = [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Card" />
    ),
    cell: ({ row }) => {
      const image: any = row.getValue("image");

      return (
        <div className="max-w-[56px]">
          <Image
            src={image.thumbnail.url}
            alt={row.getValue("number")}
            width={628}
            height={874}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "title",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Elestral" />
  //   ),
  //   cell: ({ row }) => {
  //     // const label = labels.find((label) => label.value === row.original.label);

  //     return (
  //       <div className="flex space-x-2">
  //         {/* {label && <Badge variant="outline">S</Badge>} */}
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.getValue("title")}
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "set",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Set" />
  //   ),
  //   cell: ({ row }) => {
  //     const set = sets.find((set) => set.value === row.getValue("set"));

  //     if (!set) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center w-auto whitespace-nowrap">
  //         {/* {set.icon && (
  //           <set.icon className="w-4 h-4 mr-2 text-muted-foreground" />
  //         )} */}
  //         <span>{set.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "edition",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Edition" />
  //   ),
  //   cell: ({ row }) => {
  //     const edition = editions.find(
  //       (edition) => edition.value === row.getValue("edition")
  //     );

  //     if (!edition) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center whitespace-nowrap">
  //         {/* {edition.icon && (
  //           <edition.icon className="w-4 h-4 mr-2 text-muted-foreground" />
  //         )} */}
  //         <span>{edition.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
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
  //   accessorKey: "registeredCount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Registered"
  //       className="justify-center"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="flex justify-center">
  //         {row.getValue("registeredCount")}
  //       </span>
  //     );
  //   },
  // },
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
              row.original.populationCount}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "currentOwner",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Owner" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">S</Badge>} */}
          <span
            className={cn(
              !row.original.currentOwner && "italic",
              "max-w-[500px] truncate font-medium"
            )}
          >
            {row.original.currentOwner
              ? row.original.currentOwner
              : "anonymous"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "registeredDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Registered" />
    ),
    cell: ({ row }) => {
      // const label = labels.find((label) => label.value === row.original.label);
      if (row.original.registeredDate === "-") {
        return "-";
      }

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
  // {
  //   accessorKey: "puller",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Registrar" />
  //   ),
  //   cell: ({ row }) => {
  //     // const label = labels.find((label) => label.value === row.original.label);

  //     return (
  //       <div className="flex space-x-2">
  //         {/* {label && <Badge variant="outline">S</Badge>} */}
  //         <span className="max-w-[500px] truncate font-medium">
  //           {row.original.originalOwner}
  //         </span>
  //       </div>
  //     );
  //   },
  // },

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
            {row.original.currentLocation}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "registered",
    header: ({ column }) => <></>,
    cell: ({ row }) => {
      return <></>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "releaseDate",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Release Date" />
  //   ),
  //   cell: ({ row }) => {
  //     return row.getValue("releaseDate");
  //   },
  // },
  // {
  //   accessorKey: "populationCount",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Population"
  //       className="justify-center"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <span className="flex justify-center">
  //         {row.getValue("populationCount")}
  //       </span>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "product",
  //   header: ({ column }) => <></>,
  //   cell: ({ row }) => {
  //     return <></>;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
