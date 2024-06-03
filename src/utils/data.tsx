import {
  BoxIcon,
  ClipboardIcon,
  FilterIcon,
  GroupIcon,
  LayoutDashboard,
} from "lucide-react";

export const ADMIN_ROUTES = [
  {
    icon: <LayoutDashboard size={16} />,
    label: "dashboard",
    path: "/dashboard",
  },
  {
    icon: <GroupIcon size={16} />,
    label: "contacts",
    path: "/contacts",
  },
  {
    icon: <FilterIcon size={16} />,
    label: "Sales Pipelines",
    path: "/sales-pipelines",
  },
  {
    icon: <ClipboardIcon size={16} />,
    label: "Tasks",
    path: "/tasks",
  },
  {
    icon: <BoxIcon size={16} />,
    label: "Archive",
    path: "/archive",
  },
];
