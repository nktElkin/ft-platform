"use client"

import { Compass, Globe, Layout, LayoutDashboard } from "lucide-react";
import { SidebarItem } from "./Sidebar-item";

// example of menu items
const TestRoutes =[
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Globe,
        label: "Search",
        href: "/search"
    }
];


export const SidebarRoutes = () => {
const routes = TestRoutes;

    return (
            <ul className='flex-1 w-full list-none space-y-2' role="menubar">
                {routes.map((route) => (
                    <SidebarItem 
                    key={route.href} 
                    href={route.href}
                    icon={route.icon}
                    label={route.label}/>
                ))}
            </ul>
    );
}




