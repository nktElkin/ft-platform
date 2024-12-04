'use client';

import {H1Icon} from '@heroicons/react/16/solid';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import path from 'path';

interface SidebarItemProps {
    icon: typeof H1Icon;
    label: string;
    href: string;
}

export const SidebarItem = ({
    // remap icon as a Component Icon
    icon: Icon,
    label,
    href,
}: SidebarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();


    // check e cases for routes - root, ./2nd level, ./.../3rd level
    const isActive = (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

    // redirect to href path
    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex text-stone-800 gap-x-2 w-full defaultText text-sm font-medium px-3 py-2 hover:bg-gray-200 transition-all',
                isActive && 'bg-purple-100 font-semibold'
            )}
        >
            <div className="flex items-center gap-x-2">
                <Icon className={cn(
                    "size-4 text-stone-800",
                    isActive && ""
                )}/>
                <span>{label}</span>
            </div>
        </button>
    );
};