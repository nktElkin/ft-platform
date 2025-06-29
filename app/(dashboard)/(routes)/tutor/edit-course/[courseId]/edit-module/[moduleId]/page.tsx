import { db } from "@/lib/db";
import { hasPermissionToEdit} from "@/lib/utils";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextEditSection from "../../_components/text-edit-section";
import EditTitleForm from "./_components/edit-moduleTitle-form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { PublishModuleForm } from "./_components/pusblish-module-form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import GCFMediaUploadFormProps from "@/components/gcs-object-upload-form";
import EditDesctiptionForm from "./_components/edit-moduleDescription-form";
import AttachmentCard from "./_components/attachment-card";

const CourseModulePage = async ({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) => {

  // getting course and module using params
  const courseId = (await params)?.courseId;
  const moduleId = (await params)?.moduleId;
  const course = await db.course.findUnique({ where: { id: courseId } });
  const modules = await db.courseModule.findMany({
    where: { courseId },
    orderBy: { index: "asc" },
  });
  const pablishedModulesOnly = await db.courseModule.findMany({
    where: { courseId, isPublished: true },
    orderBy: { index: "asc" },
  });
  const currentModule = await db.courseModule.findUnique({
    where: { id: moduleId, courseId },
  });
  const attachments = await db.attachment.findMany({
    where: { courseModuleId: moduleId },
  });

  // check pesmission + protection
  const hasPersmission = await hasPermissionToEdit(
    course ? course.authorId : null,
  );
  if (!course || !currentModule || !hasPersmission) return redirect("/");

  return (
    <>
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <LoadingSpinner state="" />
          <h1>Module editing</h1>
        </div>
        <PublishModuleForm
          courseId={courseId}
          moduleId={moduleId}
          module={currentModule}
          initialValue={currentModule?.isPublished || false}
          switcher={
            course.isPublished &&
            pablishedModulesOnly[0]?.id === currentModule.id
              ? true
              : false
          }
        />
      </div>
      <Tabs defaultValue="main-info">
        <TabsList className="mb-3">
          <TabsTrigger value="main-info">Main info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* MOBILE VIEW */}
        <div className="sm:hidden flex flex-col space-y-6">
          <TabsContent value="main-info" className="flex flex-col space-y-6">
            <EditTitleForm initials={currentModule} courseId={courseId} />
            {/* edit description form */}
            <EditDesctiptionForm initials={currentModule} courseId={courseId} />
          </TabsContent>
          <TabsContent value="content" className="flex flex-col w-full gap-6">
            <TextEditSection
              initialValue={
                currentModule?.moduleContent ? currentModule?.moduleContent : ""
              }
              courseId={courseId}
              moduleId={moduleId}
            />
          </TabsContent>
          <hr className="border-solid border-2 border-grey-100" />
          {/* <GCFMediaUploadFormProps courseId={courseId} moduleId={currentModule.id} /> */}
          <GCFMediaUploadFormProps courseId={courseId} moduleId={moduleId} />
          {attachments.length > 0 && (
            <>
              <hr className="border-solid border-2 border-grey-100" />
              <>
                {attachments.map((attachment) => (
                  <AttachmentCard attachment={attachment} />
                ))}
              </>
            </>
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden sm:block">
          <ResizablePanelGroup direction="horizontal" className="gap-x-3">
            <ResizablePanel defaultSize={1 / 3} className="px-2">
              <TabsContent
                value="main-info"
                className="flex flex-col space-y-6"
              >
                <EditTitleForm initials={currentModule} courseId={courseId} />
                {/* edit description form */}
                <EditDesctiptionForm
                  initials={currentModule}
                  courseId={courseId}
                />
              </TabsContent>
              <TabsContent
                value="content"
                className="flex flex-col w-full gap-6"
              >
                <TextEditSection
                  initialValue={
                    currentModule?.moduleContent
                      ? currentModule?.moduleContent
                      : ""
                  }
                  courseId={courseId}
                  moduleId={moduleId}
                />
              </TabsContent>
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:mx-3" />
            <ResizablePanel
              defaultSize={2 / 3}
              minSize={30}
              maxSize={60}
              className="px-2 flex flex-col space-y-6"
            >
              <GCFMediaUploadFormProps
                courseId={courseId}
                moduleId={moduleId}
              />
              {attachments.length > 0 && (
                <>
                  <hr className="border-solid border-2 border-grey-100" />
                  <>
                    {attachments.map((attachment) => (
                      <AttachmentCard attachment={attachment} />
                    ))}
                  </>
                </>
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Tabs>
    </>
  );
};

export default CourseModulePage;
