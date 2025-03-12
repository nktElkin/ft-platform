'use client' 
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { CourseModule } from "@prisma/client";
import { CircleArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



const NextModuleActionBtn = ({currentCourseModuleId, nextCourseModuleId, courseId}:{currentCourseModuleId :string, nextCourseModuleId:string, courseId:string}) => {
        const router = useRouter();
        const pathname = usePathname();
        const form = useForm();
        const { isSubmitting } = form.formState;    

    const onSubmit = async () => {
        try {
            // old progress updating - PATCH
            const patchResponse = await fetch(`/api/courses/${courseId}/progress/${currentCourseModuleId}`, {   method: 'PATCH', headers: { 'Content-Type': 'application/json' }});
            if (patchResponse.ok) toast.success('You have successfully completed the module');
            
            // new progress creating - POST
            const postResponse = await fetch(`/api/courses/${courseId}/progress/${nextCourseModuleId}`, {   method: 'POST', headers: { 'Content-Type': 'application/json' }});
            if (postResponse.ok) {
                const data = await postResponse.json();
                if (data.response.courseModuleId) router.push(pathname.split('/')?.slice(0, -1).join('/')+data.response.courseModuleId);
                else router.push(pathname.split('/')?.slice(0, -2).join('/'));
            } else {
                toast.error('Failed to enrol in the course. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');

        }
    }

        return (
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-row justify-end">
                <Button disabled={isSubmitting} type='submit' role="button" aria-label="step to the next study module button" className="hover:outline-2 hover:outline-offset-2 hover:outline-slate-800">
                    {isSubmitting ? <>Updating data...</> : <>Next module <CircleArrowRight /></>}
                </Button>
            </form>
        );
}
 
export default NextModuleActionBtn;