'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard } from 'lucide-react';

interface SidebarItemProps {
    icon: any;
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
        <li>
            <button
                // labels
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${label}`}
                //styles
                type="button"
                onClick={onClick}
                className={cn(
                    'flex items-center gap-x-2 w-full text-base font-medium hover:bg-gray-200 transition-all py-2 px-2',
                    isActive && 'text-xl font-semibold px-1'
                )}
            >
                <div className="flex items-center gap-x-2" role="presentation">
                    <Icon className={cn(
                        "size-6",
                        isActive && "size-7"
                    )}/>
                    <span>{label}</span>
                </div>
            </button>
        </li>
    );
};