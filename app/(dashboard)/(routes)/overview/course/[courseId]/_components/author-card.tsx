import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";

interface AuthorInfoCardProps {
  user: User | null;
}

const UserAvatarCard = ({ user }: AuthorInfoCardProps) => {
  return (
    <>
      {user && (
        <div className="m-auto sm:m-0 sm:left-0 lg:m-auto flex flex-row items-center space-x-8 w-max">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={`${user?.image || "https://avatars.githubusercontent.com/u/136516840?v=4&size=64"}`}
            />
            <AvatarFallback>Author</AvatarFallback>
          </Avatar>
          <p className="text-xl">{user?.name}</p>
        </div>
      )}
    </>
  );
};

export default UserAvatarCard;
