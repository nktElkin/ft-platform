import { User } from "@prisma/client";
import Link from "next/link";
import UserAvatarCard from "./author-card";
import { Button } from "@/components/ui/button";


const UserCard = ({user}:{user:User | null}) => {
    if (!user) return '';
    return ( <div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-2xl">
        {/* About Author */}
        {user && (
          <>
            <Link href={`/overview/user/${user?.id}`}>
              <UserAvatarCard user={user} />
            </Link>
            <div className="text-pretty text-base sm:text-start lg:text-pretty">
              <p>
                {(user?.story && user?.story.length > 0)
                ? `${user?.story}`
              : "No story provided"}
              </p>
            </div>
            <Link
              href={`/overview/user/${user?.id}`}
              className="w-auto"
            >
              <Button className="w-full" variant="link">
                Go to author's page
              </Button>
            </Link>
          </>
        )}

        {/* Progress/Check In Button */}
        <hr className="border-slate-800" />
      </div>);
}
 
export default UserCard;