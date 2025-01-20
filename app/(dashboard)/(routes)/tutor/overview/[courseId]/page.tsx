import { auth } from "@/auth";
// import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseCreationForm from "./_components/course-form";
import { imageUrlIsValid } from "@/lib/utils";
import PreviewCard from "@/components/ui/preview-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseModuleCreationForm from "./_components/courseModule-form";

// import { describe } from "node:test";

interface PageProps {
    params: {
        courseId: string;
    }
}




const CourseIdPage = async ({ params }: PageProps) => {
    const session = await auth();


    const id = params?.courseId;

    const currentUser = await db.user.findUnique({ where: { email: session?.user?.email || "" } });
    const course = await db.course.findUnique({ where: { id } });
    const modules = await db.courseModule.findMany({ where: { courseId: id }, orderBy: { index: 'asc' } });
    if (!course || course?.authorId !== currentUser?.id) return redirect('/');
    const courseWallpaperIsValid = await imageUrlIsValid(course?.wallpaperUrl ? course?.wallpaperUrl : '');



    const categories = await db.category.findMany();
    const defaultCategory = await db.category.findUnique({ where: { id: course?.categoryId } }) || '';

    return (
        <>
            <h1>Let's edit your course</h1>
            <div className="md:grid grid-cols-2 gap-4">
                <Tabs defaultValue="course-info">
                    <TabsList className="mb-3">
                        <TabsTrigger value="course-info">Info</TabsTrigger>
                        <TabsTrigger value="course-mudule">Module</TabsTrigger>
                    </TabsList>
                    <TabsContent value="course-info">
                        <CourseCreationForm initials={course} courseId={course?.id} categories={categories.map((item) => ({
                            label: item?.categoryName,
                            value: item?.id,
                        }))} defaultCategory={defaultCategory ? defaultCategory.categoryName : ''} courseWallpaperIsValid={courseWallpaperIsValid} />
                    </TabsContent>
                    <TabsContent value="course-mudule" className="flex flex-col w-full gap-6">
                        <CourseModuleCreationForm courseId={course?.id}/>
                    </TabsContent>
                </Tabs>
                <div className="hidden md:block">
                    <h3>Course</h3>
                    <PreviewCard object={course} variant="course" />
                    <br />
                    <h3>Course modules</h3>
                    <div className="flex flex-col gap-4">
                        {[modules].length ? modules.map((module) =>
                            <PreviewCard object={module} variant="module" />) : ''}
                    </div>
                </div>
            </div>
        </>
    );

}

export default CourseIdPage;