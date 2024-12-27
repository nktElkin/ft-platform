import { auth } from "@/auth";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseCreationForm from "./_components/course-form";

interface PageProps {
    params: {
        courseId: string;
    }
}

const CourseIdPage = async ({params}:PageProps) => {
    const session = await auth();
    const currentUser = await db.user.findUnique({where: {email: session?.user?.email || ""}});
    const course = await db.course.findUnique({where: {id: params?.courseId}});

    if (!course || course?.authorId !== currentUser?.id) return redirect('/');

    return (
        <>  
        <p>Course overview page<br />Lets finish course creation</p>
        <CourseCreationForm initials={course} courseId={course?.id}/>
        </>
    );

}
 
export default CourseIdPage;