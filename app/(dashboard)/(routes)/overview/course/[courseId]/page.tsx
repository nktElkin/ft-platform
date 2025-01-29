import { db } from "@/lib/db";
import { getSession, imageUrlIsValid } from "@/lib/utils";
import { redirect } from "next/navigation";
import HeaderBanner from "./_components/header-banner";
import ModulesTable from "./_components/modules-table";
import UserAvatarCard from "./_components/author-card";
import Link from "next/link";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


// generateStaticParams for dynamical routes
export const generateStaticParams = async () => {
    const courses = await db.course.findMany({ select: { id: true } });
    return courses.map(course => ({
        courseId: course.id,
    }));
};

const CourseIdPage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { session, currentUser } = await getSession();
    const courseId = (await params)?.courseId;
    // const courseId = courseData?.id;
    if (!courseId || !session) redirect('/');

    const course = await db.course.findUnique({ where: { id: courseId } });
    const courseAutor = await db.user.findUnique({ where: { id: course?.authorId } });
    const modules = currentUser?.role === 'STUDENT' ?
        (await db.courseModule.findMany({ where: { courseId }, orderBy: { index: 'asc' } })).filter((module) => module.isPublished === true) :
        (await db.courseModule.findMany({ where: { courseId }, orderBy: { index: 'asc' } }));
    const validImageUrl = await imageUrlIsValid(course?.wallpaperUrl);



    const progressValue = 0;
    const nextCourseModule = 123;

    return (
        <div className="flex flex-col lg:flex lg:flex-row">
            <section aria-description="course information" className="lg:w-2/3 lg:grow mb-4 lg:mb-0">
                {/* Course head banner */}
                {(validImageUrl && course?.wallpaperUrl)
                    ? <HeaderBanner title={course?.title || ''} description={course?.description || ''} imageSrc={course?.wallpaperUrl || ''} />
                    : <div className="pb-4 px-4">
                        <h1>{course?.title}</h1>
                        <h5>{course?.description}</h5>
                    </div>}

                {/* add prhress icon here, add link with redirect */}
                <ModulesTable modules={modules} currentUser={currentUser || null} />
                {/* Study Modules */}
            </section>


            <section aria-description={`${courseAutor ? 'author information' : ''}, course progress`} className="lg:pl-5 lg:w-1/3">

            {/* component start*/}
                <div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-2xl">
                    {/* About Author */}
                    {courseAutor && <>
                        <Link href={`/overview/user/${courseAutor?.id}`}><UserAvatarCard user={courseAutor} /></Link>
                        <div className="text-pretty text-base sm:text-start lg:text-pretty">
                        {/* {courseAutor.story} */}
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia natus delectus placeat necessitatibus perspiciatis, sequi dolore iusto velit aliquid nam porro accusantium, saepe repellat laboriosam! Sed, numquam praesentium. Et, sapiente?</p>
                        </div>
                        <Link href={`/overview/user/${courseAutor?.id}`} className="w-auto">
                            <Button className="w-full" variant='ghost'>Go to author's page</Button>
                        </Link>
                    </>}

                    {/* Progress/Check In Button */}
                    {/* {currentUser} */}
                    <hr className="border-slate-800" />
                </div>
                    <div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-2xl">
                        {progressValue>0 && <>
                        <Progress value={progressValue} max={100} />
                        <p>{progressValue}% already done, continue</p>
                        </>}
                        <Link href={`/overview/course/${courseId}/module/${nextCourseModule?.id}`}>
                        <Button className="w-full hover:outline-2 hover:outline-offset-2 hover:outline-slate-800">{progressValue>10 ? 'Continue learning' : 'Check In'}</Button>
                        </Link>
                    </div>
            {/* component end*/}

            </section>
        </div>
    );
};





export default CourseIdPage;