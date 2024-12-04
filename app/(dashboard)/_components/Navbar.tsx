import { Logo } from "./Logo"
import { MobileSidebarar } from "./MobileSidebar"



export const Navbar = () => {
    return(
        <div className="flex justify-between items-center border-b p-4 md:hidden">
            <Logo/>
            <MobileSidebarar/>
        </div>
    )
}