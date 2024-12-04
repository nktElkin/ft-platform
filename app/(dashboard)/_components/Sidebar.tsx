import { Logo } from "./Logo";
import { SidebarContent } from "./Sidebar-content";
import { SidebarRoutes } from "./Sidebar-routes";

export const Sidebar = () => {
    return(
        <aside role="complementary" className="hidden md:flex flex-col"> 
            <SidebarContent/>
        </aside>
    );
};