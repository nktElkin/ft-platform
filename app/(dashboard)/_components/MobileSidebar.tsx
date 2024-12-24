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
import { AlignJustify } from "lucide-react"

export const MobileSidebarar = () => {
    return(
      <div className="md:hidden">
        <Sheet>
        <SheetTrigger>
            <AlignJustify />
        </SheetTrigger>
        <SheetContent className="p-0" side='right'>
            <SidebarContent/>
        </SheetContent>
      </Sheet>

      </div>
    )
}