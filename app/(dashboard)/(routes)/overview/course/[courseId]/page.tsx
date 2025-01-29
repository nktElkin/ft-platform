import { db } from "@/lib/db";
import { getSession, imageUrlIsValid } from "@/lib/utils";
import { redirect } from "next/navigation";
import HeaderBanner from "./_components/header-banner";
import ModulesTable from "./_components/modules-table";


const CourseIdPage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { session, currentUser } = await getSession();
    const courseId = (await params)?.courseId;
    // const courseId = courseData?.id;
    if (!courseId || !session) redirect('/');

    const course = await db.course.findUnique({ where: { id: courseId } });
    const courseAutor = await db.user.findUnique({ where: { id: course?.authorId } });
    const modules = currentUser?.role === 'STUDENT' ?
        (await db.courseModule.findMany({ where: { courseId },orderBy: {index: 'asc'} })).filter((module) => module.isPublished === true) :
        (await db.courseModule.findMany({ where: { courseId },orderBy: {index: 'asc'}}));
    const validImageUrl = await imageUrlIsValid(course?.wallpaperUrl);

    console.log('student: ', modules)



    return (
        <div className="flex flex-col lg:flex lg:flex-row">
            <section aria-description="course information" className="lg:w-2/3">
                {/* Course head banner */}
                {(validImageUrl && course?.wallpaperUrl)
                    ? <HeaderBanner title={course?.title || ''} description={course?.description || ''} imageSrc={course?.wallpaperUrl || ''} />
                    : <div className="pb-4 px-4">
                        <h1>{course?.title}</h1>
                        <h5>{course?.description}</h5>
                    </div>}

                    {/* add prhress icon here, add link with redirect */}
                <ModulesTable modules={modules} currentUser={currentUser}/>
                {/* Study Modules */}
            </section>
            <section aria-description={`${courseAutor ? 'author information' : ''}, course progress`}>
                {/* About Author */}
                {/* Progress/Check In Button */}
            </section>
        </div>
    );
}


export default CourseIdPage;