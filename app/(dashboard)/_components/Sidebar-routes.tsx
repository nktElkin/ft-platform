"use client";

import { Compass, Globe, Layout, LayoutDashboard } from "lucide-react";
import { SidebarItem } from "./Sidebar-item";
import { usePathname } from "next/navigation";

// example of menu items
const TestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Globe,
    label: "Search",
    href: "/search",
  },
];

const StudyRoutes = [
  {
    icon: LayoutDashboard,
    label: "Chapters",
    href: "/",
  },
  {
    icon: Globe,
    label: "Search",
    href: "/search",
  },
];
const TutorRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/tutor/overview",
  },
  {
    icon: Globe,
    label: "T-Search",
    href: "/search",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const isStudyMode = pathname?.startsWith("/study");
  const isTutorMode = pathname?.startsWith("/tutor");

  const routes = isTutorMode
    ? TutorRoutes
    : isStudyMode
      ? StudyRoutes
      : TestRoutes;

  return (
    <ul className="flex-1 w-full list-none" role="menubar">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </ul>
  );
};
