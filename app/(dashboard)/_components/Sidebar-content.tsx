import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";

export const SidebarContent = () => {
    return(
        <aside role="complementary"> 
        <div className='h-full w-full md:flex flex-col md:w-48 justify-items-center fixed bg-gray-50 border-r pt-4'>
            <div>
                <Logo/>
            </div>
            <div>
                <SidebarRoutes/>
            </div>
        </div>
        </aside>
    );
};