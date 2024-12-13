import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";

export const SidebarContent = () => {
    return(
        <div className="px-5 py-4 flex flex-col gap-4">
            <Logo/>
            <nav role="navigation" aria-label="Sidebar navigation">
                    <SidebarRoutes/>
            </nav>
        </div>
    );
};