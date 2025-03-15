import { db } from "@/lib/db";
import { getSession, imageUrlIsValid } from "@/lib/utils";
import { redirect } from "next/navigation";
import HeaderBanner from "./_components/header-banner";
import ModulesTable from "./_components/modules-table";
import { Suspense } from "react";
import LoadingSkeleton from "./_components/loading-skeletone";
import UserCard from "./_components/user-card";
import CheckInCourseCard from "./_components/checkin-course-card";
import { Course, CourseModule, User, UserProgress } from "@prisma/client";
import NotFound from "@/app/not-found";
import CompletedCourseCongratsCard from "./_components/completed-course-congrats-card";
import Link from "next/link";

export const revalidate = 60; // next will start revalidation process every 60 seconds
export const dynamicParams = true; // if revalidation wont finished yet, next will render page on demand
// generateStaticParams for dynamical routes
export const generateStaticParams = async () => {
  const courses = await db.course.findMany({ select: { id: true } });
  return courses.map((course) => ({
    courseId: course.id,
  }));
};

const getProgressPointModuleUrl = async (progress : UserProgress[] | [], course:Course| null, modules:CourseModule[] | null):Promise<string> => {
  if (!course || !modules) return '';
  // return course route to enroll
  if (!progress.length) return `/overview/course/${course?.id}`;
  const notDoneModules = modules.filter((module) => progress.some((p) => p.courseModuleId === module.id && !p.isDone));
  return `/overview/course/${course?.id}/module/${notDoneModules[0]?.id}`;
}

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { session, currentUser } = await getSession();
  const courseId = (await params)?.courseId;
  if (!courseId || !session) redirect("/");

  const [course, modules] = await Promise.all([
    db.course.findUnique({ where: { id: courseId } }),
    currentUser?.role === "STUDENT"
      ? db.courseModule.findMany({
          where: { courseId, isPublished: true },
          orderBy: { index: "asc" },
        })
      : db.courseModule.findMany({
          where: { courseId },
          orderBy: { index: "asc" },
        }),
  ]);

  if (!course || !modules) return (<NotFound/>);

  const [courseAutor, validImageUrl] = await Promise.all([
    db.user.findUnique({ where: { id: course?.authorId } }),
    imageUrlIsValid(course?.wallpaperUrl),
  ]);

  const progress = await db.userProgress.findMany({
    where: {
      userId: currentUser?.id,
      courseModuleId: {
        in: modules.map((module) => module.id),
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const completedModules = modules.filter((module) =>
    progress.some((p) => p.courseModuleId === module.id && p.isDone),
  );
  if (modules?.length === completedModules?.length) return <>All done</>

  const progressValue =
  modules.length > 0 ? Math.round((completedModules?.length / modules.length) * 100) : 0;

  const progressPointModule = modules.find(
    (module) => module.id === progress[0]?.courseModuleId,
  );

  const moduleUrl : string= await getProgressPointModuleUrl(progress, course ,modules);


  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {currentUser?.role !== "STUDENT" && 
      <section className="my-4 py-2 w-full flex justify-around bg-repeat-x bg-white/25 bg-[url(https://img.freepik.com/free-vector/caution-colors-background_1095-46.jpg?t=st=1739350882~exp=1739354482~hmac=7f62354ec5ae7fd70799f4e583315d4c849953be4af7704284c6f3d7ffee1d89&w=826)]">
      <div className="px-4 py-2 bg-white/80 font-semibold rounded-sm">
      <span>ON TUTOR MODE, <Link href={`/tutor/edit-course/${course?.id}`}>click to edit</Link></span>
      </div>
      </section>}
      <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5">
        {/* course information section */}
        <section
          aria-label="Course information"
          className="lg:w-2/3 lg:grow mb-4 lg:mb-0"
        >
          {/* Course head banner */}
          {validImageUrl && course?.wallpaperUrl ? (
            <HeaderBanner
              title={course?.title || ""}
              description={course?.description || ""}
              imageSrc={course?.wallpaperUrl || 'https://placehold.co/600x400/EEE/31343C?font=source-sans-pro&text=course'}
            />
          ) : (
            <div className="pb-4 px-4">
              <h1>{course?.title}</h1>
              <h5>{course?.description}</h5>
            </div>
          )}

          {/* add progress icon here, add link with redirect */}
          <ModulesTable completedModules={completedModules} modules={modules} currentUser={currentUser || null} />
          {/* Study Modules */}
        </section>

        {/* user card, check in section */}
        <section
          aria-label={`${courseAutor ? "Author information" : ""}, Course progress`}
          className="lg:ml-2 lg:w-1/3 space-y-4">
          <UserCard user={courseAutor}/>
          {progressValue !==100 
          ? <CheckInCourseCard progress={progressValue} redirectHref={moduleUrl}/>
          : <CompletedCourseCongratsCard/>}
        </section>
      </div>
    </Suspense>
  );
};

export default CourseIdPage;
