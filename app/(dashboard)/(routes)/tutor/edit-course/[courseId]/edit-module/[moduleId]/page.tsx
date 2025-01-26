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


const handleMarkdownUpload = async (value: string) => {
    console.log('server handle upload: ', value);
}

const CourseModulePage = async ({ params }: { params: Promise<{ courseId: string, moduleId: string }> }) => {

    const { session, currentUser } = await getSession();
    const courseId = (await params)?.courseId;
    const moduleId = (await params)?.moduleId;

    const course = await db.course.findUnique({ where: { id: courseId } });
    const modules = await db.courseModule.findMany({ where: { courseId }, orderBy: { index: 'asc' } });
    const currentModule = await db.courseModule.findUnique({ where: { id: moduleId, courseId } });

    const hasPersmission = await hasPersmissionToEdit(course ? course.authorId : null);
    if (!course || !hasPersmission) return redirect('/');

    const defaultCategory = await db.category.findUnique({ where: { id: course?.categoryId } }) || '';

    const courseWallpaperIsValid = await imageUrlIsValid(course?.wallpaperUrl ? course?.wallpaperUrl : '');
    return (
        <>
            <div className="flex md:flex-row flex-col justify-between items-start md:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                    <LoadingSpinner state='' />
                    <h1>Module editing</h1>
                </div>
                <PublishModuleForm allowedToPublish={true} initialValue={currentModule?.isPublished || false} />
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