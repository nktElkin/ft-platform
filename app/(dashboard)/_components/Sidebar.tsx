import { Logo } from "./Logo";
import { SidebarContent } from "./Sidebar-content";
import { SidebarRoutes } from "./Sidebar-routes";

export const Sidebar = () => {
    return(
        // <aside role="complementary" className="hidden md:flex flex-col"> 
        <aside id="desktop-sidebar" className="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full md:translate-x-0" aria-label="Sidebar">
            <SidebarContent/>
        </aside>
    );
};