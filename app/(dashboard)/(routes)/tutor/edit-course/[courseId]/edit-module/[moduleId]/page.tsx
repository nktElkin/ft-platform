import { auth } from "@/auth";
import PreviewCard from "@/components/ui/preview-card";
import { db } from "@/lib/db";
import { hasPersmissionToEdit, getSession, imageUrlIsValid } from "@/lib/utils";
import { redirect } from "next/navigation";
import DraggableTable from "../../_components/draggable-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NavigationBreadcrumbs from "../../_components/navigation-breadcrumb";
import TextEditSection from "../../_components/text-edit-section";
import CourseModuleCreationForm from "../../_components/courseModule-form";
import EditTitleForm from "./_components/edit-moduleTitle-form";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { PublishModuleForm } from "./_components/pusblish-module-form";
import UploadCourseMediaForm from "./_components/upload-moduleMedia-form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { log } from "console";


const handleMarkdownUpload = async (value: string) => {
    console.log('server handle upload: ', value);
}

const CourseModulePage = async ({ params }: { params: Promise<{ courseId: string, moduleId: string }> }) => {
    let allowedToPublish = false;

    // getting course and module using params
    const courseId = (await params)?.courseId;
    const moduleId = (await params)?.moduleId;
    const course = await db.course.findUnique({ where: { id: courseId } });
    const modules = await db.courseModule.findMany({ where: { courseId }, orderBy: { index: 'asc' } });
    const pablishedModulesOnly = await db.courseModule.findMany({ where: { courseId, isPublished : true }, orderBy: { index: 'asc' } });
    const currentModule = await db.courseModule.findUnique({ where: { id: moduleId, courseId } });

    // check pesmission + protection
    const hasPersmission = await hasPersmissionToEdit(course ? course.authorId : null);
    if (!course || !currentModule || !hasPersmission) return redirect('/');

    // publishing data
    const fullFilled = Object.keys(currentModule).filter(key => currentModule[key as keyof typeof currentModule] !== null && currentModule[key as keyof typeof currentModule] !== '' && currentModule[key as keyof typeof currentModule] !== undefined).length === Object.keys(currentModule).length;
    if (currentModule && fullFilled) allowedToPublish = true;

    return (
        <>
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <LoadingSpinner state='' />
                    <h1>Module editing</h1>
                </div>
                <PublishModuleForm courseId={courseId} moduleId={moduleId} allowedToPublish={allowedToPublish} initialValue={currentModule?.isPublished || false} switcher={course.isPublished && pablishedModulesOnly[0]?.id === currentModule.id ? true : false}/>
            </div>
            <Tabs defaultValue="main-info">
                <TabsList className="mb-3">
                    <TabsTrigger value="main-info">Main info</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>

                {/* MOBILE VIEW */}
                <div className="sm:hidden flex flex-col space-y-6">
                    <TabsContent value="main-info">
                        <EditTitleForm initials={currentModule} courseId={courseId} />
                    </TabsContent>
                    <TabsContent value="content" className="flex flex-col w-full gap-6">
                        <TextEditSection initialValue={currentModule?.moduleContent ? currentModule?.moduleContent : ''} courseId={courseId} moduleId={moduleId} />
                    </TabsContent>

                    {/* modify element: table to upload images/video */}
                    <UploadCourseMediaForm />
                    {/* <DraggableTable objects={modules} courseId={courseId} /> */}
                </div>

                {/* DESKTOP VIEW */}
                <div className="hidden sm:block">
                    <ResizablePanelGroup direction="horizontal" className="gap-x-3">
                        <ResizablePanel defaultSize={1 / 3} className="px-2">
                            <TabsContent value="main-info">
                                <EditTitleForm initials={currentModule} courseId={courseId} />
                            </TabsContent>
                            <TabsContent value="content" className="flex flex-col w-full gap-6">
                                <TextEditSection initialValue={currentModule?.moduleContent ? currentModule?.moduleContent : ''} courseId={courseId} moduleId={moduleId}/>
                            </TabsContent>
                        </ResizablePanel>
                        <ResizableHandle withHandle className="hover:mx-3" />
                        <ResizablePanel defaultSize={2 / 3}>
                            <UploadCourseMediaForm />
                            {/* <DraggableTable objects={modules} courseId={courseId} /> */}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>

            </Tabs>
        </>
    );
}

export default CourseModulePage;