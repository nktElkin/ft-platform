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
            {/* <NavigationBreadcrumbs course={course} module={module}/> */}
            <h1>Module editing</h1>
            <Tabs defaultValue="main-info">
                <TabsList className="mb-3">
                    <TabsTrigger value="main-info">Main info</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
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
                {/* <div className="grid grid-cols-3 gap-4 *:transition *:ease-in-out">
                    <div className='col-span-2'>
                        <TabsContent value="main-info">
                        <EditTitleForm initials={module} courseId={courseId}/>
                        </TabsContent>
                        <TabsContent value="content" className="flex flex-col w-full gap-6">
                            <TextEditSection />
                        </TabsContent>
                    </div>
                    <div className="col-span-1">
                        create not draggble table + combine with img/vide uploader 
                        <DraggableTable objects={modules} courseId={courseId} />
                    </div>
                </div> */}
            </Tabs>
        </>
    );
}

export default CourseModulePage;