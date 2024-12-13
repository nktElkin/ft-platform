import { SquareUserRound } from "lucide-react"
import { MobileSidebarar } from "./MobileSidebar"



export const Navbar = () => {
    return(
        <div className="flex justify-between items-center border-b p-4 md:hidden">
            <SquareUserRound/>
            <MobileSidebarar/>
        </div>
    )
}