'use client' 
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FinilizeCourseBtnProps {
    courseId: string;
    currentCourseModuleId: string;
}

const FinilizeCourseBtn = ({courseId, currentCourseModuleId}: FinilizeCourseBtnProps) => {
    const form = useForm();
    const {isSubmitting} = form.formState;

    const onSubmit = async () => {
        try {
            // old progress updating - PATCH
            const patchResponse = await fetch(`/api/courses/${courseId}/progress/${currentCourseModuleId}`, {   method: 'PATCH', headers: { 'Content-Type': 'application/json' }});
            if (!patchResponse.ok) throw new Error(patchResponse.statusText);
            toast.success("We're done! Congrats!");
        } catch (error:any) {
            toast.error('Faild to make action');
        }
    }

    return ( <form onSubmit={form.handleSubmit(onSubmit)} >
        <Button className="w-full" variant='link' disabled={isSubmitting} role="submit" aria-label="finalize course button">Finilize course!</Button>
    </form>);
}
 
export default FinilizeCourseBtn;
