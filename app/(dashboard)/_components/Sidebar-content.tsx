import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";
import { auth } from "@/auth";
import Link from "next/link";
import Logout from "@/components/ui/logout-button";
import Image from "next/image";
import LoginGithub from "@/components/ui/sigin-gitgub";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getSession } from "@/lib/utils";
import LogoutBtn from "@/components/ui/logout-button";


export async function SidebarContent() {
  const { session, currentUser } = await getSession();
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="py-4 flex flex-col space-y-6">
        <Logo />
        <nav role="navigation" aria-label="Sidebar navigation">
          <SidebarRoutes />
        </nav>
        <div>
        </div>

      </div>

      <div className="flex flex-col px-4 mb-4">
        {!session?.user ? (
          <LoginGithub />
        ) : (
          <>
          <div className="flex items-center mx-auto gap-4 py-4">
            <>
            <Avatar>
              <AvatarImage src={currentUser?.image || ''} alt="user avatar" />
              <AvatarFallback>{currentUser?.name}</AvatarFallback>
            </Avatar>
            </>
            {currentUser?.name}
          </div>
          <LogoutBtn className="w-full"/>
          </>
        )}

      </div>
    </div>
  );
};