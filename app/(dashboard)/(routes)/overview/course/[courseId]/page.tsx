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
import { create } from "domain";
import { Course } from "@prisma/client";
import { Suspense } from "react";
import LoadingSkeleton from "./_components/loading-skeletone";

//TODO: migrate t ISR

export const revalidate = 60; // next will start revalidation process every 60 seconds

export const dynamicParams = true; // if revalidation wont finished yet, next will render page on demand

// generateStaticParams for dynamical routes
export const generateStaticParams = async () => {
  const courses = await db.course.findMany({ select: { id: true } });
  return courses.map((course) => ({
    courseId: course.id,
  }));
};

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { session, currentUser } = await getSession();
  const courseId = (await params)?.courseId;
  // const courseId = courseData?.id;
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

  if (!course || !modules) alert("Course not found");

  const [courseAutor, validImageUrl] = await Promise.all([
    db.user.findUnique({ where: { id: course?.authorId } }),
    imageUrlIsValid(course?.wallpaperUrl),
  ]);

  // const courseAutor = await db.user.findUnique({ where: { id: course?.authorId } });
  // const validImageUrl = await imageUrlIsValid(course?.wallpaperUrl);

  // get progresses for current course modules
  const progress = await db.userProgress.findMany({
    where: {
      userId: currentUser?.id,
      courseModuleId: {
        in: modules.map((module) => module.id),
      },
      isDone: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // FIXME: validate that part of code - mthod V2
  const totalModules = modules.length;
  const completedModules = modules.filter((module) =>
    progress.some((p) => p.courseModuleId === module.id && !p.isDone),
  ).length;
  const progressValue =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  // FIXME: validate that part of code - mthod V1
  const progressPointModule = modules.find(
    (module) => module.id === progress[0]?.courseModuleId,
  );
  const nextCourseModule = progressPointModule
    ? modules.find((module) => module.index === progressPointModule?.index + 1)
    : null;

  // const progressValue = 50;
  // const nextCourseModule = 123;

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="flex flex-col lg:flex lg:flex-row lg:space-x-5">
        <section
          aria-description="course information"
          className="lg:w-2/3 lg:grow mb-4 lg:mb-0"
        >
          {/* Course head banner */}
          {validImageUrl && course?.wallpaperUrl ? (
            <HeaderBanner
              title={course?.title || ""}
              description={course?.description || ""}
              imageSrc={course?.wallpaperUrl || ""}
            />
          ) : (
            <div className="pb-4 px-4">
              <h1>{course?.title}</h1>
              <h5>{course?.description}</h5>
            </div>
          )}

          {/* add prhress icon here, add link with redirect */}
          <ModulesTable modules={modules} currentUser={currentUser || null} />
          {/* Study Modules */}
        </section>

        <section
          aria-description={`${courseAutor ? "author information" : ""}, course progress`}
          className="lg:w-1/3"
        >
          {/* component start*/}
          <div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-2xl">
            {/* About Author */}
            {courseAutor && (
              <>
                <Link href={`/overview/user/${courseAutor?.id}`}>
                  <UserAvatarCard user={courseAutor} />
                </Link>
                <div className="text-pretty text-base sm:text-start lg:text-pretty">
                  {/* {courseAutor.story} */}
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia natus delectus placeat necessitatibus perspiciatis,
                    sequi dolore iusto velit aliquid nam porro accusantium,
                    saepe repellat laboriosam! Sed, numquam praesentium. Et,
                    sapiente?
                  </p>
                </div>
                <Link
                  href={`/overview/user/${courseAutor?.id}`}
                  className="w-auto"
                >
                  <Button className="w-full" variant="ghost">
                    Go to author's page
                  </Button>
                </Link>
              </>
            )}

            {/* Progress/Check In Button */}
            {/* {currentUser} */}
            <hr className="border-slate-800" />
          </div>
          <div className="container flex flex-col space-y-4 py-6 px-4 sm:px-6 lg:px-4 hover:shadow-2xl">
            {progressValue > 0 && (
              <div className="flex flex-col space-y-1">
                <Progress className="h-3" value={progressValue} max={100} />
                <p className="text-xs">{progressValue}% already done!</p>
              </div>
            )}
            <Link
              href={`/overview/course/${courseId}/module/${nextCourseModule?.id}`}
            >
              <Button className="w-full hover:outline-2 hover:outline-offset-2 hover:outline-slate-800">
                {progressValue > 10 ? "Continue learning" : "Check In"}
              </Button>
            </Link>
          </div>
          {/* component end*/}
        </section>
      </div>
    </Suspense>
  );
};

export default CourseIdPage;
