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


const CourseModulePage = async ({ params }: { params: Promise<{ courseId: string, moduleId: string }> }) => {

    const { session, currentUser } = await getSession();
    const courseId = (await params)?.courseId;
    const moduleId = (await params)?.moduleId;

    const course = await db.course.findUnique({ where: { id: courseId } });
    const modules = await db.courseModule.findMany({ where: { courseId }, orderBy: { index: 'asc' } });
    const module = await db.courseModule.findUnique({ where: { id: moduleId, courseId } });

    const hasPersmission = await hasPersmissionToEdit(course ? course.authorId : null);
    if (!course || !hasPersmission) return redirect('/');

    const defaultCategory = await db.category.findUnique({ where: { id: course?.categoryId } }) || '';

    const courseWallpaperIsValid = await imageUrlIsValid(course?.wallpaperUrl ? course?.wallpaperUrl : '');
    return (
        <>
            <h1>Module editing</h1>
            <Tabs defaultValue="main-info">
                <TabsList className="mb-3">
                    <TabsTrigger value="main-info">Main info</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>

                {/* MOBILE VIEW */}
                <div className="sm:hidden flex flex-col space-y-6">
                <TabsContent value="main-info">
                            <EditTitleForm initials={module} courseId={courseId} />
                        </TabsContent>
                        <TabsContent value="content" className="flex flex-col w-full gap-6">
                            <TextEditSection />
                </TabsContent>

                {/* modify element: table to upload images/video */}
                <DraggableTable objects={modules} courseId={courseId} />
                </div>

                 {/* DESKTOP VIEW */}
                <div className="hidden sm:block">
                <ResizablePanelGroup direction="horizontal" className="gap-x-3">
                    <ResizablePanel defaultSize={1/3} className="px-2">
                        <TabsContent value="main-info">
                            <EditTitleForm initials={module} courseId={courseId} />
                        </TabsContent>
                        <TabsContent value="content" className="flex flex-col w-full gap-6">
                            <TextEditSection />
                        </TabsContent>
                    </ResizablePanel>
                    <ResizableHandle withHandle className="hover:mx-3"/>
                    <ResizablePanel defaultSize={2/3}>
                        <DraggableTable objects={modules} courseId={courseId} />
                    </ResizablePanel>
                </ResizablePanelGroup>
                </div>
                
            </Tabs>
        </>
    );
}

export default CourseModulePage;