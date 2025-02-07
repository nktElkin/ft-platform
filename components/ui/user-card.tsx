import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import SignForm from "./signin-form";
import { Button } from "./button";
import { getSession } from "@/lib/utils";
import { Suspense } from "react";
import { Skeleton } from "./skeleton";

export async function UserCard() {
  // const session = await auth();
  const { session, currentUser } = await getSession();

  return (
    <div className="flex flex-col space-x-2 mx-auto">
      {session ? (
        <>
        
          <div className="rounded-s-md box-border size-10">
            <Avatar>
              <AvatarImage
                src={currentUser?.image || ""}
                alt={currentUser?.name || "unauthorized user"}
              />
              <AvatarFallback>
                {currentUser?.name?.slice(4) || ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <p>{session?.user?.name || ""}</p>
          <SignForm target={"signout"} />
      
        </>
      ) : (
        <SignForm target={"signin"} />
      )}
    </div>
  );
}
