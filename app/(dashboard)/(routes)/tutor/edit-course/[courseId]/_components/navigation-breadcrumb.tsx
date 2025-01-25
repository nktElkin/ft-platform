'use client';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';

const getPathWithNext = (pathname: string, matchPattern: string): string => {
    if (matchPattern === 'overview' && (pathname.includes('tutor') || pathname.includes('student'))) return '/overview'
    const parts = pathname.split('/').filter(Boolean);
    const matchIndex = parts.findIndex(part => part.includes(matchPattern));

    // If no matches, return an empty string
    if (matchIndex === -1) return '';

    // Include the next element if it exists
    const pathParts = parts.slice(0, matchIndex + 2);
    return '/' + pathParts.join('/');
};

interface ItemInterface {
    href: string,
    label: string
}

const setItemsArray = (overview: string, course: string, module: string): ItemInterface[] => {
    const items: ItemInterface[] = [];
    items.push({ href: "/", label: "Home" });
    if (overview) items.push({ href: overview, label: "Overview" });
    if (course) items.push({ href: course, label: "Course" });
    if (module) items.push({ href: module, label: "Module" });
    return items;
}

const NavigationBreadcrumbs = () => {
    const [open, setOpen] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const pathname = usePathname()

    const items: ItemInterface[] = setItemsArray(getPathWithNext(pathname, 'overview'), getPathWithNext(pathname, 'course'), getPathWithNext(pathname, 'module'));
    console.log(items);
    const ITEMS_TO_DISPLAY = 3;

    return (<>

        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hover:underline hover:text-zinc-700">
                    <BreadcrumbLink href={items[0].href}>{items[0].label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                {items.length > ITEMS_TO_DISPLAY ? (
                    <>
                        <BreadcrumbItem>
                            {!isMobile ? (
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1"
                                        aria-label="Toggle menu"
                                    >
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-inherit" align="start">
                                        {items.slice(1, -2).map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Link href={item.href ? item.href : "#"}>
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader className="text-left">
                                            <DrawerTitle>Go to</DrawerTitle>
                                            <DrawerDescription>
                                                Select a page
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-1 px-4">
                                            {items.slice(1, -2).map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href ? item.href : "#"}
                                                    className="py-1 text-sm"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <DrawerFooter className="pt-4">
                                            <DrawerClose asChild>
                                                <Button variant="outline">Close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ) : null}
                {items.length > 1 ? items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                    <BreadcrumbItem className={`hover:underline hover:text-zinc-700 ${item?.href === pathname ? 'text-zinc-700' : ''}`} key={index}>
                        {item.href ? (
                            <>
                                <BreadcrumbLink
                                    asChild
                                    className="max-w-20 truncate md:max-w-none"
                                >
                                    <Link href={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                                {item.label}
                            </BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                )) : null}
            </BreadcrumbList>
        </Breadcrumb>


        {/* 
        {isMobile ? <>
        </> : <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hover:underline hover:text-zinc-700">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator><span>|</span></BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/overview">Overview</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={getPathWithNext(pathname, 'course')}>{course.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem className="">
                        <BreadcrumbLink href={getPathWithNext(pathname, 'module')}>{module.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </>} */}
    </>
    );
}

export default NavigationBreadcrumbs;