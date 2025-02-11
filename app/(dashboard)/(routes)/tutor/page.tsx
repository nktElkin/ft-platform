import { db } from "@/lib/db";
import { getSession } from "@/lib/utils";
import { Category, Course } from "@prisma/client";
import { redirect } from "next/navigation";
import TutorLayoutPage from "./_components/tutor-page-layout";


export const revalidate = 120; // 2 minutes 


const TutorDataPage = async () => {
    const { session, currentUser } = await getSession();
    if (!session) redirect('/login');

    const [courses, categories] = await Promise.all([
        db.course.findMany({ where: { authorId: currentUser?.id } }).catch(() => null),
        db.category.findMany().catch(() => null)
    ]);
    if (!courses || !categories) return <>No data available</>;

    return (<TutorLayoutPage courses={courses} categories={categories} />);
}

export default TutorDataPage;
