'use client'

import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


const EnrolCourseBtn = ({ redirectHref }: { redirectHref: string }) => {
    const courseId = redirectHref.split('/').pop();
    const router = useRouter();
    const form = useForm();
    const { isSubmitting } = form.formState;

    const onSubmit = async () => {
        try {
            const response = await fetch(`/api/courses/${courseId}/progress`, {
                method: 'POST',
            });
            if (response.ok) {
            
                const data = await response.json();
             
                if (data.response.courseModuleId) router.push(redirectHref+'/module/'+data.response.courseModuleId);
                else router.refresh();
            } else {
                toast.error('Failed to enrol in the course. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');

        }
    }

        return (
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Button disabled={isSubmitting} type='submit' role="button" aria-label="start new course button" className="w-full hover:outline-2 hover:outline-offset-2 hover:outline-slate-800">
                    {isSubmitting ? <>Sending your request...</> : <>Check in new course <MousePointerClick /></>}
                </Button>
            </form>
        );
    }

    export default EnrolCourseBtn;