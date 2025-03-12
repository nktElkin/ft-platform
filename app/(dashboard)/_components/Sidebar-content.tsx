import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/utils";
import LogoutBtn from "@/components/ui/logout-button";
import Link from "next/link";

export async function SidebarContent() {
  const { currentUser } = await getSession();
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="py-4 flex flex-col space-y-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav role="navigation" aria-label="Sidebar navigation">
            <SidebarRoutes userRole={currentUser?.role ||"STUDENT"} />
        </nav>
      </div>

      <section className="flex flex-col px-4 mb-4">
            <div className="flex items-center mx-auto gap-4 py-4">
                <Avatar>
                  <AvatarImage
                    src={currentUser?.image || "https://avatars.githubusercontent.com/u/136516840?v=4&size=64"}
                    alt="user avatar"
                  />
                  <AvatarFallback>{currentUser?.name}</AvatarFallback>
                </Avatar>
              {currentUser?.name}
            </div>
            <LogoutBtn className="w-full" />
      </section>
    </div>
  );
}
