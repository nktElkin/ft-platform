'use client';
import { SquareUserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export const NavbarRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();
    const isStudyMode = pathname?.startsWith("/study");
    // const isGuestMode = pathname?.startsWith("/");
    const isTutorMode = pathname?.startsWith("/tutor");

    return (
        <div>
        {isStudyMode || isTutorMode ? (
                <Link href="/">LogOut</Link>
            ) : (
                <>
                    {/* <Button onClick={() => router.push("/tutor")}>Tutor</Button> */}
                    <Link href="/study" >Teacher mode</Link>
                </>
            )}
        </div>
    );
};