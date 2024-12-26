
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import SignForm from "./signin-form";
import { Button } from "./button";


export async function UserCard() {
    const session = await auth();

    return (
        <div className="flex space-x-2 mx-auto">
            {session ? (
                <>
                <div className="rounded-s-md box-border size-10">
                    <Avatar>
                        <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || 'unauthorized user'} />
                        <AvatarFallback>{session?.user?.name || ''}</AvatarFallback>
                    </Avatar>
                </div>
                    <p>{session?.user?.name || ''}</p>
                    <SignForm target={'signout'}/>
                </>
            ) : (
                <SignForm target={'signin'}/>
            )}
        </div>
    );
}

