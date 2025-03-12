import { MobileSidebarar } from "./MobileSidebar";

export const Navbar = () => {
  return (
    <div className="flex justify-end items-center border-b p-4 md:ml-48 md:hidden" aria-label="Mobile Navigation bar">
      {/* <NavbarRoutes /> */}
      <MobileSidebarar />
    </div>
  );
};
