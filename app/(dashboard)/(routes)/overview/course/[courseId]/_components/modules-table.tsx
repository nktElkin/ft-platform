import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Indicator from "@/components/ui/indicator";
import { CourseModule, User } from "@prisma/client";

interface ModulesTableProps {
  modules: CourseModule[];
  currentUser: User | null;
}

const ModulesTable = ({ modules, currentUser }: ModulesTableProps) => {
  if (!modules.length)
    return (
      <>
        <h3 className="text-zinc-500">
          Unfortunatelly in this course is nothing to study currenly, please
          visit later...
        </h3>
      </>
    );

  return (
    <>
      <Accordion
        type="single"
        collapsible
        aria-label="Course study modules"
        role="region"
      >
        {modules.map((module: CourseModule) => {
          return (
            <AccordionItem
              role="presentation"
              value={module?.id}
              key={module?.id}
            >
              <AccordionTrigger
                role="button"
                aria-controls={`content-${module?.id}`}
                id={`trigger-${module?.id}`}
              >
                <span className="sr-only">
                  {!module.isPublished ? "draft" : "published"} module
                </span>
                <span>
                  {currentUser?.role !== "STUDENT" && (
                    <span className="inline-block mr-3">
                      <Indicator
                        state={module.isPublished}
                        data={["published", "draft"]}
                      />
                    </span>
                  )}
                  <span className="inline-block">{module?.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent
                id={`content-${module?.id}`}
                aria-labelledby={`trigger-${module?.id}`}
                role="region"
              >
                <div className="flex flex-col items-start">
                  {module?.description || (
                    <>
                      Looks like authout did't add description for that course.
                      <br /> Let's try it!
                    </>
                  )}
                  {/* <Link href={`/overview/course/${module.courseId}/module/${module.id}`}><ArrowRight/></Link> */}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default ModulesTable;
