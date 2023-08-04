import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export const sets = [
  {
    value: "Base Set",
    label: "Base Set (BS1)",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "Centaurbor Starter Deck",
    label: "Centaurbor Starter Deck (SD01)",
  },
  {
    value: "Trifernal Starter Deck",
    label: "Trifernal Starter Deck (SD02)",
  },
  {
    value: "Majesea Starter Deck",
    label: "Majesea Starter Deck (SD03)",
  },
  {
    value: "Ohmperial Starter Deck",
    label: "Ohmperial Starter Deck (SD04)",
  },
  {
    value: "Penterror Starter Deck",
    label: "Penterror Starter Deck (SD05)",
  },
  // {
  //   value: "Shattered Stars",
  //   label: "Shattered Stars",
  //   icon: CircleIcon,
  // },
];

export const editions = [
  // {
  //   value: "Prototype",
  //   label: "Prototype",
  //   icon: QuestionMarkCircledIcon,
  // },
  {
    value: "Founders",
    label: "Founders Edition",
    // icon: CircleIcon,
  },
  // {
  //   value: "First Edition",
  //   label: "First Edition",
  //   icon: StopwatchIcon,
  // },
];

export const discovered = [
  {
    value: "Discovered",
    label: "Discovered",
  },
  {
    value: "Undiscovered",
    label: "Undiscovered",
  },
];

export const registered = [
  {
    value: "Registered",
    label: "Registered",
  },
  {
    value: "Unregistered",
    label: "Unregistered",
  },
];

export const product = [
  {
    value: "Booster Box Topper",
    label: "Booster Box Topper",
  },
  {
    value: "Booster/Blister Pack",
    label: "Booster/Blister Pack",
  },
  {
    value: "Starter Deck",
    label: "Starter Deck",
  },
];

export const productPull = [
  {
    value: "Booster Box",
    label: "Booster Box",
  },
  {
    value: "Blister Pack",
    label: "Blister Pack",
  },
  {
    value: "Starter Deck",
    label: "Starter Deck",
  },
];
