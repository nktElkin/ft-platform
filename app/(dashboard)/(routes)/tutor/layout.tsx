import { getSession } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function TutorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const {currentUser} = await getSession();
    if (currentUser?.role === 'STUDENT') redirect('/not-found');
  return (
        <>
          {children}
        </>
  );
}