import { MobileSidebarar } from "./MobileSidebar";
import { NavbarRoutes } from "@/components/navbar-routes";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b p-4 md:ml-48 lg:justify-end">
      <NavbarRoutes />
      <MobileSidebarar />
    </div>
  );
};
