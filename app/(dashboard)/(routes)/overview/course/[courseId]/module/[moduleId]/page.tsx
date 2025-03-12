import NotFound from "@/app/not-found";
import { db } from "@/lib/db";
import TextView from "./_components/text-view-component";
import NextModuleActionBtn from "./_components/next-module-action-btn";
import { CourseModule } from "@prisma/client";
import CompletedCourseCongratsCard from "../../_components/completed-course-congrats-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FinilizeCourseBtn from "../../_components/finilize-course-btn";

// generateStaticParams for dynamical routes
export const revalidate = 300000; // next will start revalidation process every 5 mins
export const dynamicParams = true; // if revalidation wont finished yet, next will render page on demand
export async function generateStaticParams() {
  const modules = await db.courseModule.findMany({
    select: { id: true, courseId: true },
  });
  return modules.map((module) => ({
    courseId: module.courseId,
    moduleId: module.id,
  }));
}

async function getModuleData(moduleId: string) {
  const module = await db.courseModule.findUnique({
    where: { id: moduleId },
  });
  return module;
}

async function getClosestModulesId(currentModule: CourseModule): Promise<{ previousModuleId: string | null, nextModuleId: string | null }> {
  let previousModuleId = null;
  let nextModuleId = null;
  
  const modules = await db.courseModule.findMany({
    where: {
      courseId: currentModule.courseId,
      isPublished: true,
    },
    orderBy: {
      index: "asc",
    },
  });
  if (!modules || modules.length === 0) return { previousModuleId: null, nextModuleId: null };

  const currentIndex = modules.findIndex((m) => m.id === currentModule.id);

  if (currentIndex > 0 && currentModule.id > modules[0].id) previousModuleId = modules[currentIndex - 1].id; // has prev
  if (currentIndex < 0 || currentIndex === modules.length - 1) nextModuleId = currentModule.id; // is last
  if (modules[currentIndex+1]) nextModuleId = modules[currentIndex + 1].id; // has next
  return {previousModuleId, nextModuleId};
}

const ModulIdPage = async ({ params }: { params: Promise<{ courseId: string; moduleId: string }> }) => {
  const module = await getModuleData((await params).moduleId);
  if (!module) return <NotFound />;


  const {previousModuleId,nextModuleId} = await getClosestModulesId(module); 


  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-full lg:max-w-4xl space-y-4 text-wrap">
      <Suspense fallback={<Skeleton className="h-12 m-auto w-4/5" />}>
        <h1>{module.title}</h1>
        <section>
          <TextView text={module.moduleContent || ''} />
        </section>
        <div>
          {!nextModuleId && <p>To continue please contact administarator</p>}
          {nextModuleId === module.id
            ? <>
                <CompletedCourseCongratsCard />
                <br/>
                <FinilizeCourseBtn courseId={module.courseId} currentCourseModuleId={module.id}/>
            </>
            : <NextModuleActionBtn courseId={module.courseId} currentCourseModuleId={module.id} nextCourseModuleId={nextModuleId || ''} />
          }
        </div>
      </Suspense>
    </div>
  );
};

export default ModulIdPage;
