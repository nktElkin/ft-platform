import { auth } from "@/auth";
import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseCreationForm from "./_components/course-form";
import { describe } from "node:test";

interface PageProps {
    params: {
        courseId: string;
    }
}




const CourseIdPage = async ({params}:PageProps) => {
    const session = await auth();

    const id = await params?.courseId;

    const currentUser = await db.user.findUnique({where: {email: session?.user?.email || ""}});
    const course = await db.course.findUnique({where: {id}});
    if (!course || course?.authorId !== currentUser?.id) return redirect('/');

    const categories = await db.category.findMany();
    const defaultCategory = await db.category.findUnique({where: {id: course?.categoryId}}) || '';

    return (
        <>
        <h1>Let's edit your course</h1>
        <div className="md:grid grid-cols-2 gap-4">  
            {/* <EditForm/> */}
            {/* <EditDataPreview/> */}
        <CourseCreationForm initials={course} courseId={course?.id} categories={categories.map((item) => ({
       label: item?.categoryName,
       value: item?.id,
    }))} defaultCategory={defaultCategory?.categoryName}/>

        </div>
        </>
    );

}
 
export default CourseIdPage;