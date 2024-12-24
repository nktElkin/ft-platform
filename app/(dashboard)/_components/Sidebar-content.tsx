import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";

export const SidebarContent = () => {
  return (
    <div className="py-4 flex flex-col space-y-6">
      <Logo />
      <nav role="navigation" aria-label="Sidebar navigation">
        <SidebarRoutes />
      </nav>
      <div>
      </div>

    </div>
  );
};