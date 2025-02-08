"use client";

import {CirclePlus, LayoutDashboard, Settings, LucideProps } from "lucide-react";
import { SidebarItem } from "./Sidebar-item";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UserRole } from "@prisma/client";

type Route = { icon: React.ComponentType<LucideProps>, label: string, href: string }[];

const PublicRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const TutorRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: LayoutDashboard,
    label: "My courses",
    href: "/tutor",
  },
  {
    icon: CirclePlus,
    label: "New course",
    href: "/tutor/create-course",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];
const RootRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/overview",
  },
  {
    icon: LayoutDashboard,
    label: "My courses",
    href: "/tutor",
  },
  {
    icon: CirclePlus,
    label: "New course",
    href: "/tutor/create-course",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const SideBarSuspense = () => {
  return(
    <ul className="flex-1 w-full list-none" role="menubar">
    {PublicRoutes.map((route) => (
      <SidebarItem
        key={route.href}
        href={route.href}
        icon={route.icon}
        label={route.label}
      />
    ))}
    {Array(4).fill(null).map((_, index) => (
      <Skeleton className="h-11 w-full mb-2" key={index} />
    ))}
  </ul>
  );
}


export const SidebarRoutes = ({userRole='STUDENT'} : {userRole:UserRole}) => {
const routes: Route = (() => {
  switch(userRole){
    case UserRole.ROOT:
      return RootRoutes;
    case UserRole.TUTOR:
      return TutorRoutes;
    default:
      return PublicRoutes;
  }
})();

  return (
    <Suspense fallback={<SideBarSuspense />}>
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
    </Suspense>
  );
};
