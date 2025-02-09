import TextEditSection from "@/app/(dashboard)/(routes)/tutor/edit-course/[courseId]/_components/text-edit-section";
import NotFound from "@/app/not-found";
import { db } from "@/lib/db";
import TextView from "./_components/text-view-component";
import NextModuleActionBtn from "./_components/next-module-action-btn";
import { CourseModule } from "@prisma/client";
import CompletedCourseCongratsCard from "../../_components/completed-course-congrats-card";

// generateStaticParams for dynamical routes
export const revalidate = 60; // next will start revalidation process every 60 seconds
export const dynamicParams = true; // if revalidation wont finished yet, next will render page on demand
export const generateStaticParams = async () => {
  const modules = await db.courseModule.findMany({ select: { id: true } });
  return modules.map((module) => ({
    moduleId: module.id,
  }));
};

const getNextModuleId = async (currentModule:CourseModule) =>{
    const modules = await db.courseModule.findMany({
        where: {
            courseId: currentModule.courseId,
            isPublished: true
        },
        orderBy: {
            index: 'asc'
        }
    });
    
    if (!modules || modules.length === 0) return null;
    const currentIndex = modules.findIndex(m => m.id === currentModule.id);

    if (currentIndex < 0 || currentIndex === modules.length - 1) return currentModule.id;
    return modules[currentIndex + 1].id;
}

const ModulIdPage = async ({ params }: { params: Promise<{ moduleId: string }> }) => {
  const [module] = await Promise.all([
    db.courseModule.findUnique({ where: { id: (await params).moduleId } }),
  ]);

  if (!module) return <NotFound />;

  const nextCourseModuleId = await getNextModuleId(module);


  return(<div className="mx-auto w-full sm:w-3/4 md:w-full lg:max-w-4xl space-y-4 text-wrap">
    <h1>Module {module.title}</h1>
    <section>
    <TextView  text={module.moduleContent || ''} />
    </section>
    <div>
      {/* FIXME doesn't work properly */}
      {!nextCourseModuleId && <p>To continue please contact administarator</p>}
      {nextCourseModuleId === module.id
      ?<CompletedCourseCongratsCard/>
      :<NextModuleActionBtn courseId={module.courseId} currentCourseModuleId={module.id} nextCourseModuleId={nextCourseModuleId || ''}/>
    }
    </div>
  </div>);
};

export default ModulIdPage;
