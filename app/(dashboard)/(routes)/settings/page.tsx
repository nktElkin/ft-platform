import InputCover from "@/components/ui/input-cover";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { redirect } from 'next/navigation';
import { Suspense } from "react";
import FieldContainer from "./_components/field-container";
import { Label } from "@/components/ui/label";
import EditUserNameForm from "./_components/edit-name-form";


const SkeletonLoader = () => {
    return (<div className="sm:container-flat w-full sm:w-1/2 h-full mx-auto">
        <h3>Public data</h3>
        <div className="flex flex-col space-y-6">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-full h-9" />
        </div>
        <h3>Hidden data</h3>
        <div className="flex flex-col space-y-6">
            <Skeleton className="w-full h-9" />
            <Skeleton className="w-full h-9" />
        </div>
    </div>);
};

const UserSettingsPage = async () => {
    const { session, currentUser } = await getSession();

    if (!session || !currentUser) {
        redirect('/login');
    }

    const user = await db.user.findUnique({
        where: { email: session.user?.email! },
    });

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <Suspense fallback={<SkeletonLoader />}>
            <div className="w-full sm:w-1/2 h-full mx-auto flex flex-col space-y-4">
                <section className="*:mb-2">
                    <h3>Public data</h3>
                    {/* <UserImageEditForm/> */}
                    <EditUserNameForm currentUser={currentUser}/>
                    {/* <UserStoryEditForm/> */}
                    User image
                    User name
                    User story
                </section>
                <hr />
                <section className="*:mb-2">
                    <h3>Hidden data</h3>
                    <div>
                        <Label>user email</Label>
                        <div aria-disabled='true' aria-description="user email, cannot be chnaged, hidded data" className="input-line text-zinc-700 cursor-not-allowed">{currentUser.email}</div>
                    </div>
                    <div>
                        <Label>user role</Label>
                        <div aria-disabled='true' aria-description="user role, cannot be chnaged only by administrator, hidded data" className="input-line text-zinc-700 cursor-not-allowed">{currentUser.role}</div>
                    </div>
                </section>
            </div>
        </Suspense>
    );
}

export default UserSettingsPage;