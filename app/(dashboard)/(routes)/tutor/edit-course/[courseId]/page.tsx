import { auth } from "@/auth";
// import { Progress } from "@/components/ui/progress";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CourseEditingForm from "./_components/course-form";
import { hasPermissionToEdit, imageUrlIsValid } from "@/lib/utils";
import PreviewCard from "@/components/ui/preview-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseModuleCreationForm from "./_components/courseModule-form";
import DraggableTable from "./_components/draggable-table";
import { PublishCourseForm } from "./_components/pusblish-course-form";

const CourseIdPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const id = (await params)?.courseId;

  const course = await db.course.findUnique({ where: { id } });
  const modules = await db.courseModule.findMany({
    where: { courseId: id }, orderBy: { index: "asc" },
  });
  
  if (!course) redirect("/overview");
  const canEdit = await hasPermissionToEdit(course?.authorId);
  if (!canEdit) redirect("/overview");
  
  const courseWallpaper = await imageUrlIsValid(course?.wallpaperUrl);
  
  const categories = await db.category.findMany();
  const defaultCategory = categories.find((category) => category.id === course?.categoryId) || '';

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center space-y-4 sm:space-y-0">
        <h1>Let's edit your course</h1>
        <PublishCourseForm
          courseId={id}
          allowedToPublish={modules.some((module) => module.isPublished)}
          initialValue={course.isPublished}
        />
      </div>

      <div className="md:grid grid-cols-2 gap-4">
        <Tabs defaultValue="course">
          <TabsList className="mb-3">
            <TabsTrigger value="course">Course</TabsTrigger>
            <TabsTrigger value="mudule">Module</TabsTrigger>
          </TabsList>
          <TabsContent value="course">
            <CourseEditingForm
              initials={course}
              courseId={course?.id}
              categories={categories.map((item) => ({
                label: item?.categoryName,
                value: item?.id,
              }))}
              defaultCategory={
                defaultCategory ? defaultCategory.categoryName : ""
              }
              courseWallpaperIsValid={courseWallpaper}
            />
          </TabsContent>
          <TabsContent value="mudule" className="flex flex-col w-full gap-6">
            <CourseModuleCreationForm courseId={course?.id} />
          </TabsContent>
        </Tabs>
        <div className="hidden md:block">
          <h3>Course</h3>
          <PreviewCard
            object={course}
            variant="course"
            courseCategory={defaultCategory ? defaultCategory.categoryName : ""}
          />
          {modules.length ? (
            <>
              <br />
              <h3>Course modules</h3>
              <DraggableTable objects={modules} courseId={course?.id} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
