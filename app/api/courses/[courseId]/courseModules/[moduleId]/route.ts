import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(
    _req: Request,
    { params }: { params: { courseId: string, moduleId: string } }
) {
    try {
        const session = await auth();
        if (!session) return new NextResponse("Unauthorized", { status: 403 });
        // find user via filter
        const user = await db.user.findUnique({
            where: {
                email: session?.user?.email || "",
            }
        });
        if (!user) return new NextResponse("User not found", { status: 404 });
        if (user?.role === "STUDENT") return new NextResponse("Permission denied", { status: 403 });
        
        const courseId = await params.courseId;
        const moduleId = await params.moduleId;
     
        
        const actionCourseModule = await db.courseModule.findFirst({
            where: {
                id: moduleId,
                courseId: courseId
            }
        });
        if (!actionCourseModule) return new NextResponse("Course module not found", { status: 404 });
        const actionModuleIndex = actionCourseModule.index;

        const deleteCourseModule = await db.courseModule.delete({
            where: {
                id: moduleId,
                courseId: courseId
            }
        });

        //updating course and other modules index 
        if (deleteCourseModule) {

            // //updating next moduels index
            // const courseModules = await db.courseModule.findMany({
            //     where: {
            //         courseId: courseId
            //     },
            //     orderBy: {
            //         index: 'asc'
            //     }
            // });
            // for (let i = actionModuleIndex; i < courseModules.length; i++) {
            //     await db.courseModule.update({
            //         where: {
            //             id: courseModules[i + 1].id
            //         },
            //         data: {
            //             index: i
            //         }
            //     });
            // }

            //updating course updatedAt
            await db.course.update({
                where: {
                    id: courseId
                },
                data: {
                    updatedAt: new Date()
                }
            });
}
        return NextResponse.json({ deleteCourseModule }, { status: 201 });
    } catch (error) {
        console.error('[DELETE-COURSE-MODULE]', error);
        return new NextResponse("Failed to delete course module", { status: 500 });
    }
}