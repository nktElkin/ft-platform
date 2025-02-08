"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

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


  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    (pathname?.startsWith(`${href}/`) && href !== "/tutor");


  return (
    <li role="link">
      <Link href={href} className="w-auto h-auto">
      <button
        // labels
        aria-current={isActive ? "page" : undefined}
        aria-label={`Navigate to ${label}`}
        className={cn(
          "flex justify-center md:justify-normal md:pl-4 items-center w-full text-base font-medium hover:bg-gray-200 transform ease-in-out duration-150 py-3",
          isActive && "font-semibold bg-white/70 md:border-r-4 ",
        )}
      >
        <div className="flex items-center gap-x-2" role="presentation">
          <Icon className={cn("size-6", isActive && "size-7")} />
          <span>{label}</span>
        </div>
      </button>
      </Link>
    </li>
  );
};
