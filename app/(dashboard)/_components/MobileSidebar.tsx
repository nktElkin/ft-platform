import { Bars3Icon } from "@heroicons/react/16/solid"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { SidebarContent } from "./Sidebar-content"

export const MobileSidebarar = () => {
    return(
        <Sheet>
        <SheetTrigger>
            <Bars3Icon className="size-6 text-stone-800"/>
        </SheetTrigger>
        <SheetContent className="p-0">
            <SidebarContent/>
        </SheetContent>
      </Sheet>
    )
}