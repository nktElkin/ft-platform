import { SidebarContent } from "./Sidebar-content";


export const Sidebar = () => {
    return(
        // <aside role="complementary" className="hidden md:flex flex-col"> 
        <aside id="desktop-sidebar" className="fixed top-0 left-0 z-40  w-48 h-screen transition-transform -translate-x-full md:translate-x-0 md:justify border-r" aria-label="Sidebar">
            <SidebarContent/>
        </aside>
    );
};