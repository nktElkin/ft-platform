"use client"

import { Compass, Layout } from "lucide-react";
import { MagnifyingGlassCircleIcon, HomeIcon } from '@heroicons/react/16/solid'
import { SidebarItem } from "./Sidebar-item";

// example of menu items
const TestRoutes =[
    {
        icon: HomeIcon,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: MagnifyingGlassCircleIcon,
        label: "Search",
        href: "/search"
    }
];


export const SidebarRoutes = () => {
const routes = TestRoutes;

    return (
        <nav className='flex-1 pt-1' aria-label="Sidebar navigation">
            <ul>
                {routes.map((route) => (
                    <SidebarItem 
                    key={route.href} 
                    href={route.href}
                    icon={route.icon}
                    label={route.label}/>
                ))}
            </ul>
        </nav>
    );
}




