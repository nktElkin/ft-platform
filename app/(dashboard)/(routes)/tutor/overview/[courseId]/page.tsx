import { db } from "@/lib/db";

const CourseIdPage = async ({params}:{params: {courseId: string}}) => {
    const course = await db.course.findUnique({where: {id: params?.courseId}});

    return (
        <>
        <p>CourseId overview page</p>
        </>
    );
}
 
export default CourseIdPage;