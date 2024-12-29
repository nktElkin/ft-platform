import { Logo } from "./Logo";
import { SidebarRoutes } from "./Sidebar-routes";
import { auth } from "@/auth";
import Link from "next/link";
import Logout from "@/components/ui/logout-button";
import Image from "next/image";
import LoginGithub from "@/components/ui/sigin-gitgub";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export async function SidebarContent() {
  const session = await auth();
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
          <div className="flex items-center gap-4 py-4">
            <>
            <Avatar>
              <AvatarImage src={session?.user?.image || ''} alt="user avatar" />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
            </>
            {session?.user?.name}
          </div>
          <Logout />
          </>
        )}

      </div>
    </div>
  );
};